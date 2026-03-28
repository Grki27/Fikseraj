"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  RefreshCw,
  Sparkles,
  LineChart,
  Info,
  MapPin,
  ThumbsUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

type CategoryRow = {
  key: string;
  label: string;
  count: number;
};

type TopIssue = {
  id: string;
  title: string;
  description: string;
  addressText: string | null;
  upvoteCount: number;
  categoryLabel: string;
};

type OverviewPayload = {
  summary: string;
  summaryCached?: boolean;
  aiConfigured?: boolean;
  stats: {
    total: number;
    resolved: number;
    submitted: number;
    sentToHolding: number;
    users: number;
    newLast7Days: number;
  };
  categories: CategoryRow[];
  topIssue: TopIssue | null;
};

function formatSummaryParagraph(para: string) {
  const parts = para.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-primary">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

function FormattedSummary({ text }: { text: string }) {
  const paragraphs = text
    .trim()
    .split(/\n\n+/)
    .filter(Boolean);
  if (paragraphs.length === 0) return null;
  return (
    <div className="space-y-3">
      {paragraphs.map((para, pi) => (
        <p
          key={pi}
          className="text-[15px] leading-relaxed text-foreground/85 [&_strong]:text-primary"
        >
          {formatSummaryParagraph(para)}
        </p>
      ))}
    </div>
  );
}

export function AiOverviewDashboard() {
  const [data, setData] = useState<OverviewPayload | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async (force?: boolean) => {
    setLoading(true);
    setLoadError(false);
    try {
      const r = await fetch("/api/ai/overview" + (force ? "?force=1" : ""));
      if (!r.ok) throw new Error("bad");
      const d = (await r.json()) as OverviewPayload;
      setData(d);
    } catch {
      setLoadError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load(false);
  }, [load]);

  const maxCat =
    data?.categories?.length && data.categories.length > 0
      ? Math.max(...data.categories.map((c) => c.count), 1)
      : 1;

  return (
    <div className="space-y-4">
      {/* Hero — Figma gradient + naslov */}
      <header className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600 via-[#5b4ddb] to-primary px-5 py-8 text-primary-foreground shadow-lg shadow-primary/20">
        <div className="pointer-events-none absolute -right-8 -top-8 size-40 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-10 left-1/4 size-32 rounded-full bg-cyan-400/20 blur-2xl" />
        <div className="relative flex items-start gap-3">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
            <Sparkles className="size-7 text-white" strokeWidth={2} />
          </span>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">AI pregled</h1>
            <p className="mt-1 text-sm text-white/85">
              Analiza problema u Zagrebu pomoću umjetne inteligencije
            </p>
          </div>
        </div>
      </header>

      {/* Glavna kartica */}
      <section className="rounded-2xl border border-border bg-card p-1 shadow-[0_8px_40px_rgba(26,29,46,0.08)]">
        <div className="rounded-[14px] bg-card p-4 sm:p-5">
          {/* Sažetak */}
          <div className="mb-6 flex items-start justify-between gap-3 border-b border-border/80 pb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="size-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">Sažetak</h2>
            </div>
            <button
              type="button"
              onClick={() => void load(true)}
              disabled={loading}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-border bg-background px-3 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground disabled:opacity-50"
            >
              <RefreshCw
                className={cn("size-3.5", loading && "animate-spin")}
              />
              Osvježi
            </button>
          </div>

          {loadError && (
            <p className="text-sm text-destructive">
              Ne mogu učitati pregled. Pokušaj ponovno.
            </p>
          )}

          {!loadError && loading && !data && (
            <div className="space-y-3">
              <div className="h-24 animate-pulse rounded-xl bg-muted" />
              <div className="grid grid-cols-2 gap-3">
                <div className="h-24 animate-pulse rounded-xl bg-muted" />
                <div className="h-24 animate-pulse rounded-xl bg-muted" />
              </div>
            </div>
          )}

          {data && (
            <>
              <div className="mb-8 rounded-xl bg-accent/90 px-4 py-4 ring-1 ring-primary/10">
                <FormattedSummary text={data.summary} />
              </div>

              {/* Stat grid 2×2 */}
              <div className="mb-8 grid grid-cols-2 gap-3">
                <StatCard
                  value={data.stats.total}
                  label="Ukupno prijava"
                  valueClass="text-primary"
                />
                <StatCard
                  value={data.stats.resolved}
                  label="Riješeno"
                  valueClass="text-emerald-600"
                />
                <StatCard
                  value={data.stats.submitted}
                  label="Na čekanju"
                  valueClass="text-amber-600"
                />
                <StatCard
                  value={data.stats.sentToHolding}
                  label="U tijeku"
                  valueClass="text-sky-600"
                />
              </div>

              {/* Kategorije */}
              <div className="mb-8">
                <div className="mb-4 flex items-center gap-2">
                  <LineChart className="size-5 text-primary" />
                  <h3 className="text-base font-semibold text-foreground">
                    Kategorije problema
                  </h3>
                </div>
                <ul className="space-y-4">
                  {data.categories.map((c) => (
                    <li key={c.key}>
                      <div className="mb-1 flex items-baseline justify-between gap-2">
                        <span className="text-sm font-medium text-foreground">
                          {c.label}
                        </span>
                        <span className="text-sm tabular-nums text-muted-foreground">
                          {c.count}
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-primary to-blue-400 transition-all"
                          style={{
                            width: `${Math.max(8, (c.count / maxCat) * 100)}%`,
                          }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Najpopularnija prijava */}
              {data.topIssue && (
                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <Info className="size-5 text-primary" />
                    <h3 className="text-base font-semibold text-foreground">
                      Najpopularnija prijava
                    </h3>
                  </div>
                  <Link
                    href={`/issues/${data.topIssue.id}`}
                    className="block rounded-xl border border-border bg-background p-4 transition-colors hover:border-primary/40 hover:bg-accent/50"
                  >
                    <p className="text-lg font-bold leading-snug text-foreground">
                      {data.topIssue.title}
                    </p>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                      {data.topIssue.description}
                    </p>
                    {data.topIssue.addressText && (
                      <p className="mt-3 flex items-start gap-1.5 text-sm text-muted-foreground">
                        <MapPin className="mt-0.5 size-4 shrink-0 text-primary/70" />
                        <span>{data.topIssue.addressText}</span>
                      </p>
                    )}
                    <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-border/60 pt-3">
                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600">
                        <ThumbsUp className="size-4" />
                        {data.topIssue.upvoteCount === 1
                          ? "1 glas"
                          : `${data.topIssue.upvoteCount} glasova`}
                      </span>
                      <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                        {data.topIssue.categoryLabel}
                      </span>
                    </div>
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {data && !data.aiConfigured && (
        <p className="text-center text-xs text-muted-foreground">
          Za pametniji sažetak dodaj GEMINI_API_KEY u okruženje.
        </p>
      )}
    </div>
  );
}

function StatCard({
  value,
  label,
  valueClass,
}: {
  value: number;
  label: string;
  valueClass: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-border/80 bg-background px-3 py-5 text-center shadow-sm">
      <span className={cn("text-3xl font-bold tabular-nums", valueClass)}>
        {value}
      </span>
      <span className="mt-1 text-xs font-medium text-muted-foreground">
        {label}
      </span>
    </div>
  );
}
