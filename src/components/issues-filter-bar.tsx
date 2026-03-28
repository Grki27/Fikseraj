"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

export function IssuesFilterBar({
  category,
  status,
  sort,
}: {
  category?: string;
  status?: string;
  sort: string;
}) {
  const router = useRouter();
  const sp = useSearchParams();
  const [pending, start] = useTransition();

  const navigate = (next: Record<string, string | undefined>) => {
    const p = new URLSearchParams(sp.toString());
    for (const [k, v] of Object.entries(next)) {
      if (v === undefined || v === "" || v === "ALL") p.delete(k);
      else p.set(k, v);
    }
    start(() => router.push(`/issues?${p.toString()}`));
  };

  return (
    <div className="flex flex-col gap-2 rounded-xl border border-border bg-card p-3 text-sm">
      <div className="flex flex-wrap gap-2">
        <label className="text-muted-foreground">Kategorija:</label>
        <select
          className="rounded-lg border border-border bg-input-background px-2 py-1"
          value={category ?? "ALL"}
          disabled={pending}
          onChange={(e) =>
            navigate({
              category: e.target.value === "ALL" ? undefined : e.target.value,
            })
          }
        >
          <option value="ALL">Sve</option>
          <option value="PROMET">Promet</option>
          <option value="KOMUNALNI">Komunalni</option>
          <option value="OKOLIS">Okoliš</option>
          <option value="OSTALO">Ostalo</option>
        </select>
      </div>
      <div className="flex flex-wrap gap-2">
        <label className="text-muted-foreground">Status:</label>
        <select
          className="rounded-lg border border-border bg-input-background px-2 py-1"
          value={status ?? "ALL"}
          disabled={pending}
          onChange={(e) =>
            navigate({
              status: e.target.value === "ALL" ? undefined : e.target.value,
            })
          }
        >
          <option value="ALL">Svi</option>
          <option value="ACTIVE">Aktivno (nije riješeno)</option>
          <option value="SUBMITTED">Poslano</option>
          <option value="SENT_TO_HOLDING">Poslano Holding-u</option>
          <option value="RESOLVED">Riješeno</option>
        </select>
      </div>
      <div className="flex flex-wrap gap-2">
        <label className="text-muted-foreground">Poredak:</label>
        <select
          className="rounded-lg border border-border bg-input-background px-2 py-1"
          value={sort}
          disabled={pending}
          onChange={(e) => navigate({ sort: e.target.value })}
        >
          <option value="popular">Popularnost (glasovi)</option>
          <option value="newest">Najnovije</option>
        </select>
      </div>
    </div>
  );
}
