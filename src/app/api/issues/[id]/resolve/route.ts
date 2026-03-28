import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getResolveVoteThreshold } from "@/lib/constants";
import { IssueStatus } from "@prisma/client";

export async function POST(
  _req: NextRequest,
  ctx: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await ctx.params;
  const threshold = getResolveVoteThreshold();

  const result = await prisma.$transaction(async (tx) => {
    const issue = await tx.issue.findUnique({ where: { id } });
    if (!issue) return null;
    if (issue.status === IssueStatus.RESOLVED) {
      return {
        resolveCount: issue.resolveCount,
        status: issue.status as IssueStatus,
      };
    }
    try {
      await tx.resolveVote.create({
        data: { userId: session.user!.id!, issueId: id },
      });
    } catch {
      const existing = await tx.issue.findUnique({ where: { id } });
      return existing
        ? {
            duplicate: true as const,
            resolveCount: existing.resolveCount,
            status: existing.status,
          }
        : null;
    }
    const updated = await tx.issue.update({
      where: { id },
      data: { resolveCount: { increment: 1 } },
    });
    if (updated.resolveCount >= threshold) {
      await tx.issue.update({
        where: { id },
        data: { status: IssueStatus.RESOLVED },
      });
      const final = await tx.issue.findUnique({ where: { id } });
      return {
        resolveCount: final!.resolveCount,
        status: final!.status,
      };
    }
    return { resolveCount: updated.resolveCount, status: updated.status };
  });

  if (result === null) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(result);
}
