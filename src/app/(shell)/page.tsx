import { prisma } from "@/lib/prisma";
import { IssueMap } from "@/components/issue-map";
import { ShellHeader } from "@/components/shell-header";
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
      <ShellHeader
        title="Karta"
        subtitle="Pregled prijava na karti — riješeno je skriveno s karte."
      />
      <IssueMap issues={issues} />
    </div>
  );
}
