import { notFound } from "next/navigation";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { categoryLabel, statusLabel } from "@/lib/labels";
import { IssueActions } from "@/components/issue-actions";
import { MiniMap } from "@/components/mini-map";
import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { IssueStatus } from "@prisma/client";

export const dynamic = "force-dynamic";

export default async function IssueDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const issue = await prisma.issue.findUnique({
    where: { id },
    include: {
      author: { select: { id: true, name: true, image: true } },
    },
  });
  if (!issue) notFound();

  const onMap = issue.status !== IssueStatus.RESOLVED;

  return (
    <article className="space-y-4 pb-8">
      <div className="flex items-center justify-between gap-3 border-b border-border/80 pb-4">
        <Link
          href="/issues"
          className="text-sm font-semibold text-primary hover:text-primary-hover"
        >
          ← Lista prijava
        </Link>
        <BrandLogo size="sm" />
      </div>
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-secondary">
          {issue.category === "OSTALO" && issue.customCategory
            ? issue.customCategory
            : categoryLabel[issue.category]}
        </p>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          {issue.title}
        </h1>
        <p className="text-sm text-muted-foreground">
          {statusLabel[issue.status]} ·{" "}
          {new Date(issue.createdAt).toLocaleString("hr-HR")}
        </p>
      </div>
      {issue.imageUrl && (
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-muted ring-1 ring-border">
          <Image
            src={issue.imageUrl}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
      )}
      <p className="whitespace-pre-wrap text-foreground">{issue.description}</p>
      {issue.addressText && (
        <p className="text-sm text-muted-foreground">📍 {issue.addressText}</p>
      )}
      {onMap && (
        <div className="h-40 overflow-hidden rounded-2xl ring-1 ring-border ring-primary/15">
          <MiniMap lat={issue.lat} lng={issue.lng} />
        </div>
      )}
      <IssueActions issueId={issue.id} status={issue.status} />
      <footer className="border-t border-border pt-4 text-sm text-muted-foreground">
        Prijavio: {issue.author.name ?? "Korisnik"}
      </footer>
    </article>
  );
}
