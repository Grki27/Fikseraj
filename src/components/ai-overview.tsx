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
    <section className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="mb-2 flex items-center justify-between gap-2">
        <h2 className="text-lg font-semibold">AI pregled</h2>
        <button
          type="button"
          onClick={() => load(true)}
          disabled={loading}
          className="inline-flex items-center gap-1 rounded-lg border border-border px-2 py-1 text-sm font-medium text-foreground hover:bg-muted disabled:opacity-50"
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
