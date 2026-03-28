import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  ctx: { params: Promise<{ id: string }> },
) {
  const { id } = await ctx.params;
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ upvoted: false, resolveVoted: false });
  }
  const [u, r] = await Promise.all([
    prisma.upvote.findUnique({
      where: {
        userId_issueId: { userId: session.user.id, issueId: id },
      },
    }),
    prisma.resolveVote.findUnique({
      where: {
        userId_issueId: { userId: session.user.id, issueId: id },
      },
    }),
  ]);
  return NextResponse.json({
    upvoted: !!u,
    resolveVoted: !!r,
  });
}
