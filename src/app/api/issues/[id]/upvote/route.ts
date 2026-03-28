import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getUpvoteEmailThreshold } from "@/lib/constants";
import { IssueStatus } from "@prisma/client";
import { sendHoldingAlertEmail } from "@/lib/gmail";

export async function POST(
  _req: NextRequest,
  ctx: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await ctx.params;
  const threshold = getUpvoteEmailThreshold();
  const userId = session.user.id;

  try {
    const result = await prisma.$transaction(async (tx) => {
      const issue = await tx.issue.findUnique({ where: { id } });
      if (!issue) return { kind: "notfound" as const };
      if (issue.status === IssueStatus.RESOLVED) {
        return { kind: "resolved" as const };
      }

      try {
        await tx.upvote.create({
          data: { userId, issueId: id },
        });
      } catch {
        const current = await tx.issue.findUnique({ where: { id } });
        if (!current) return { kind: "notfound" as const };
        return {
          kind: "ok" as const,
          duplicate: true,
          upvoteCount: current.upvoteCount,
          status: current.status,
          sentToHoldingEmail: current.sentToHoldingEmail,
        };
      }

      const updated = await tx.issue.update({
        where: { id },
        data: { upvoteCount: { increment: 1 } },
      });

      let status = updated.status;
      let sentToHoldingEmail = updated.sentToHoldingEmail;

      if (
        updated.upvoteCount >= threshold &&
        !updated.sentToHoldingEmail &&
        process.env.GMAIL_REFRESH_TOKEN
      ) {
        try {
          await sendHoldingAlertEmail({
            issueId: updated.id,
            title: updated.title,
            description: updated.description,
            addressText: updated.addressText,
            upvoteCount: updated.upvoteCount,
          });
          const afterMail = await tx.issue.update({
            where: { id },
            data: {
              sentToHoldingEmail: true,
              sentToHoldingAt: new Date(),
              status:
                updated.status === IssueStatus.SUBMITTED
                  ? IssueStatus.SENT_TO_HOLDING
                  : updated.status,
            },
          });
          status = afterMail.status;
          sentToHoldingEmail = true;
        } catch (e) {
          console.error("Gmail send failed", e);
        }
      }

      return {
        kind: "ok" as const,
        duplicate: false,
        upvoteCount: updated.upvoteCount,
        status,
        sentToHoldingEmail,
      };
    });

    if (result.kind === "notfound") {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    if (result.kind === "resolved") {
      return NextResponse.json({ error: "Issue resolved" }, { status: 400 });
    }
    return NextResponse.json({
      duplicate: result.duplicate,
      upvoteCount: result.upvoteCount,
      status: result.status,
      sentToHoldingEmail: result.sentToHoldingEmail,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
