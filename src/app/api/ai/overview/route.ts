import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { prisma } from "@/lib/prisma";
import { IssueStatus, IssueCategory } from "@prisma/client";
import { categoryLabel } from "@/lib/labels";

let cachedSummary: { text: string; at: number } | null = null;
const CACHE_MS = 5 * 60 * 1000;

const weekAgo = () => new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

export type AiOverviewCategory = {
  key: IssueCategory;
  label: string;
  count: number;
};

export type AiOverviewTopIssue = {
  id: string;
  title: string;
  description: string;
  addressText: string | null;
  upvoteCount: number;
  categoryLabel: string;
};

export type AiOverviewStats = {
  total: number;
  resolved: number;
  submitted: number;
  sentToHolding: number;
  users: number;
  newLast7Days: number;
};

async function loadDashboardData(): Promise<{
  stats: AiOverviewStats;
  categories: AiOverviewCategory[];
  topIssue: AiOverviewTopIssue | null;
}> {
  const [
    total,
    resolved,
    submitted,
    sentToHolding,
    byCat,
    top,
    users,
    newLast7Days,
  ] = await Promise.all([
    prisma.issue.count(),
    prisma.issue.count({ where: { status: IssueStatus.RESOLVED } }),
    prisma.issue.count({ where: { status: IssueStatus.SUBMITTED } }),
    prisma.issue.count({ where: { status: IssueStatus.SENT_TO_HOLDING } }),
    prisma.issue.groupBy({
      by: ["category"],
      _count: { category: true },
    }),
    prisma.issue.findFirst({
      orderBy: { upvoteCount: "desc" },
      select: {
        id: true,
        title: true,
        description: true,
        addressText: true,
        upvoteCount: true,
        category: true,
        customCategory: true,
      },
    }),
    prisma.user.count(),
    prisma.issue.count({
      where: { createdAt: { gte: weekAgo() } },
    }),
  ]);

  const categories: AiOverviewCategory[] = byCat
    .map((c) => ({
      key: c.category,
      label: categoryLabel[c.category],
      count: c._count.category,
    }))
    .sort((a, b) => b.count - a.count);

  let topIssue: AiOverviewTopIssue | null = null;
  if (top) {
    const cat =
      top.category === IssueCategory.OSTALO && top.customCategory
        ? top.customCategory
        : categoryLabel[top.category];
    topIssue = {
      id: top.id,
      title: top.title,
      description: top.description,
      addressText: top.addressText,
      upvoteCount: top.upvoteCount,
      categoryLabel: cat,
    };
  }

  return {
    stats: {
      total,
      resolved,
      submitted,
      sentToHolding,
      users,
      newLast7Days,
    },
    categories,
    topIssue,
  };
}

export async function GET(req: Request) {
  const force = new URL(req.url).searchParams.get("force") === "1";

  const { stats, categories, topIssue } = await loadDashboardData();

  const key = process.env.GEMINI_API_KEY;
  let summary: string;
  let summaryCached = false;

  const distribution = categories
    .map((c) => `${c.label}: ${c.count}`)
    .join("; ");

  if (!key) {
    summary = `Ukupno prijava: ${stats.total}. Riješeno: ${stats.resolved}. Korisnika: ${stats.users}. Kategorije: ${distribution}.`;
    return NextResponse.json({
      summary,
      summaryCached: false,
      aiConfigured: false,
      stats,
      categories,
      topIssue,
    });
  }

  if (!force && cachedSummary && Date.now() - cachedSummary.at < CACHE_MS) {
    summary = cachedSummary.text;
    summaryCached = true;
  } else {
    const payload = {
      total_issues: stats.total,
      resolved_issues: stats.resolved,
      pending_submitted: stats.submitted,
      in_progress_holding: stats.sentToHolding,
      user_count: stats.users,
      new_issues_last_7_days: stats.newLast7Days,
      category_distribution: distribution,
      top_issue: topIssue
        ? {
            title: topIssue.title,
            upvotes: topIssue.upvoteCount,
            category: topIssue.categoryLabel,
          }
        : null,
    };

    try {
      const genAI = new GoogleGenerativeAI(key);
      const modelName = process.env.GEMINI_MODEL ?? "gemini-2.0-flash";
      const model = genAI.getGenerativeModel({ model: modelName });
      const prompt = `Ti si asistent aplikacije Fikseraj (Zagreb). Na hrvatskom, u jednom ili dva kratka odlomka (bez naslova), sažmi sljedeće podatke za građane. Koristi povremeno **podebljani tekst** za ključne brojeve i kategorije (markdown **samo** oko riječi, ne cijelih rečenica). Budi pozitivan i jasan.

Podaci:
${JSON.stringify(payload, null, 2)}`;
      const result = await model.generateContent(prompt);
      summary = result.response.text();
      cachedSummary = { text: summary, at: Date.now() };
    } catch (e) {
      console.error(e);
      summary = `Ukupno prijava: ${stats.total}. Riješeno: ${stats.resolved}. Korisnika: ${stats.users}. Kategorije: ${distribution}.`;
    }
  }

  return NextResponse.json({
    summary,
    summaryCached,
    aiConfigured: true,
    stats,
    categories,
    topIssue,
  });
}
