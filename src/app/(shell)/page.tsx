import { prisma } from "@/lib/prisma";
import { IssueMap } from "@/components/issue-map";
import { HomeHero } from "@/components/home-hero";
import { IssueStatus } from "@prisma/client";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const issues = await prisma.issue.findMany({
    where: { status: { not: IssueStatus.RESOLVED } },
    select: {
      id: true,
      title: true,
      lat: true,
      lng: true,
      category: true,
      imageUrl: true,
      status: true,
    },
  });

  return (
    <div className="space-y-5 pb-2">
      <HomeHero />
      <div className="rounded-3xl border border-border/90 bg-card p-2.5 shadow-[0_10px_44px_-14px_rgba(0,102,204,0.12)] ring-1 ring-black/5 sm:p-3">
        <IssueMap issues={issues} tall embedded />
      </div>
    </div>
  );
}
