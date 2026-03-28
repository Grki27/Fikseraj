import { prisma } from "@/lib/prisma";
import { IssueMap } from "@/components/issue-map";
import { AiOverview } from "@/components/ai-overview";
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
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Fikseraj
        </h1>
        <p className="text-sm text-muted-foreground">
          Pregled prijava na karti — riješeno je skriveno s karte.
        </p>
      </header>
      <IssueMap issues={issues} />
      <AiOverview />
    </div>
  );
}
