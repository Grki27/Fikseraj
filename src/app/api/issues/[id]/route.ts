import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  ctx: { params: Promise<{ id: string }> },
) {
  const { id } = await ctx.params;
  const issue = await prisma.issue.findUnique({
    where: { id },
    include: {
      author: { select: { id: true, name: true, image: true } },
    },
  });
  if (!issue) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(issue);
}
