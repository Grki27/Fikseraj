"use client";

import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";

export function AiOverview() {
  const [text, setText] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async (force?: boolean) => {
    setLoading(true);
    try {
      const r = await fetch("/api/ai/overview" + (force ? "?force=1" : ""));
      const d = await r.json();
      setText(d.summary ?? "");
    } catch {
      setText("Ne mogu učitati sažetak.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(false);
  }, []);

  return (
    <section className="relative overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-sm">
      <div
        className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-primary to-secondary"
        aria-hidden
      />
      <div className="mb-2 flex items-center justify-between gap-2 pl-2">
        <h2 className="text-lg font-semibold text-foreground">AI pregled</h2>
        <button
          type="button"
          onClick={() => load(true)}
          disabled={loading}
          className="inline-flex items-center gap-1 rounded-xl border border-border bg-background px-2.5 py-1.5 text-sm font-semibold text-foreground hover:border-primary/30 hover:bg-accent disabled:opacity-50"
        >
          <RefreshCw className={`size-4 ${loading ? "animate-spin" : ""}`} />
          Osvježi
        </button>
      </div>
      {loading && !text ? (
        <p className="text-sm text-muted-foreground">Generiram sažetak…</p>
      ) : (
        <div className="prose prose-sm max-w-none whitespace-pre-wrap text-card-foreground">
          {text}
        </div>
      )}
    </section>
  );
}
