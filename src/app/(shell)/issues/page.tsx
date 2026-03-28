import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { IssueCategory, IssueStatus, Prisma } from "@prisma/client";
import { categoryLabel, statusLabel } from "@/lib/labels";
import { IssuesFilterBar } from "@/components/issues-filter-bar";
import { ShellHeader } from "@/components/shell-header";
import { ThumbsUp, MapPin } from "lucide-react";

export const dynamic = "force-dynamic";

type Search = {
  category?: string;
  status?: string;
  sort?: string;
};

export default async function IssuesPage({
  searchParams,
}: {
  searchParams: Promise<Search>;
}) {
  const sp = await searchParams;
  const sort = sp.sort === "newest" ? "newest" : "popular";
  const category =
    sp.category && Object.values(IssueCategory).includes(sp.category as IssueCategory)
      ? (sp.category as IssueCategory)
      : undefined;
  const statusParam = sp.status;

  const where: Prisma.IssueWhereInput = {};
  if (category) where.category = category;
  if (statusParam === "ACTIVE") {
    where.status = { not: IssueStatus.RESOLVED };
  } else if (
    statusParam &&
    Object.values(IssueStatus).includes(statusParam as IssueStatus)
  ) {
    where.status = statusParam as IssueStatus;
  }

  const orderBy: Prisma.IssueOrderByWithRelationInput[] =
    sort === "newest"
      ? [{ createdAt: "desc" }]
      : [{ upvoteCount: "desc" }, { createdAt: "desc" }];

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    take: 100,
    select: {
      id: true,
      title: true,
      description: true,
      category: true,
      customCategory: true,
      addressText: true,
      upvoteCount: true,
      imageUrl: true,
      status: true,
      createdAt: true,
    },
  });

  return (
    <div className="space-y-4">
      <ShellHeader
        title="Lista prijava"
        subtitle="Zadano: najpopularnije. Filtri uključuju riješene."
      />
      <IssuesFilterBar
        category={sp.category}
        status={sp.status}
        sort={sort}
      />
      <ul className="space-y-3">
        {issues.map((issue) => (
          <li key={issue.id}>
            <Link
              href={`/issues/${issue.id}`}
              className="flex gap-3 rounded-2xl border border-border bg-card p-3 shadow-sm transition hover:border-primary/30 hover:shadow-md"
            >
              <div className="relative size-24 shrink-0 overflow-hidden rounded-lg bg-muted">
                {issue.imageUrl ? (
                  <Image
                    src={issue.imageUrl}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center text-3xl text-muted-foreground">
                    📍
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="line-clamp-1 font-semibold text-foreground">
                  {issue.title}
                </p>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                  {issue.description}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 font-medium text-foreground">
                    <ThumbsUp className="size-3.5" />
                    {issue.upvoteCount}
                  </span>
                  <span>
                    {issue.category === "OSTALO" && issue.customCategory
                      ? issue.customCategory
                      : categoryLabel[issue.category]}
                  </span>
                  <span
                    className="rounded-full bg-accent px-2 py-0.5 text-accent-foreground"
                    title={statusLabel[issue.status]}
                  >
                    {statusLabel[issue.status]}
                  </span>
                </div>
                {issue.addressText && (
                  <p className="mt-1 inline-flex items-start gap-1 text-xs text-muted-foreground">
                    <MapPin className="mt-0.5 size-3.5 shrink-0" />
                    <span className="line-clamp-2">{issue.addressText}</span>
                  </p>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>
      {issues.length === 0 && (
        <p className="text-center text-muted-foreground">Nema prijava.</p>
      )}
    </div>
  );
}
