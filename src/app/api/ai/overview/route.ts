import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { prisma } from "@/lib/prisma";
import { IssueStatus, IssueCategory } from "@prisma/client";

let cached: { text: string; at: number } | null = null;
const CACHE_MS = 5 * 60 * 1000;

export async function GET(req: Request) {
  const force = new URL(req.url).searchParams.get("force") === "1";
  if (!force && cached && Date.now() - cached.at < CACHE_MS) {
    return NextResponse.json({ summary: cached.text, cached: true });
  }

  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    return NextResponse.json(
      { summary: "GEMINI_API_KEY nije postavljen — statistika dolazi uskoro.", cached: false },
      { status: 200 },
    );
  }

  const [total, resolved, byCat, top, userCount] = await Promise.all([
    prisma.issue.count(),
    prisma.issue.count({ where: { status: IssueStatus.RESOLVED } }),
    prisma.issue.groupBy({
      by: ["category"],
      _count: { category: true },
    }),
    prisma.issue.findFirst({
      orderBy: { upvoteCount: "desc" },
      select: { title: true, upvoteCount: true, category: true },
    }),
    prisma.user.count(),
  ]);

  const catLabels: Record<IssueCategory, string> = {
    PROMET: "Promet",
    KOMUNALNI: "Komunalni problemi",
    OKOLIS: "Okoliš",
    OSTALO: "Ostalo",
  };
  const distribution = byCat
    .map((c) => `${catLabels[c.category]}: ${c._count.category}`)
    .join("; ");

  const payload = {
    total_issues: total,
    resolved_issues: resolved,
    user_count: userCount,
    category_distribution: distribution,
    top_issue: top
      ? { title: top.title, upvotes: top.upvoteCount, category: catLabels[top.category] }
      : null,
  };

  try {
    const genAI = new GoogleGenerativeAI(key);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Ti si asistent aplikacije Fikseraj (Zagreb). Na hrvatskom, u 3-5 kratkih odlomaka, sažmi sljedeće JSON podatke za građane i sudionike hackathona. Budi pozitivan i jasan. Podaci:
${JSON.stringify(payload, null, 2)}`;
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    cached = { text, at: Date.now() };
    return NextResponse.json({ summary: text, cached: false });
  } catch (e) {
    console.error(e);
    const fallback = `Ukupno prijava: ${total}. Riješeno: ${resolved}. Korisnika: ${userCount}. Kategorije: ${distribution}.`;
    return NextResponse.json({ summary: fallback, cached: false });
  }
}
