"use client";

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ThumbsUp, CheckCircle } from "lucide-react";
import { IssueStatus } from "@prisma/client";

export function IssueActions({
  issueId,
  status,
}: {
  issueId: string;
  status: IssueStatus;
}) {
  const { data: session, status: authStatus } = useSession();
  const router = useRouter();
  const [upvotes, setUpvotes] = useState<number | null>(null);
  const [resolves, setResolves] = useState<number | null>(null);
  const [upvoted, setUpvoted] = useState(false);
  const [resolveVoted, setResolveVoted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [localStatus, setLocalStatus] = useState(status);

  useEffect(() => {
    let cancel = false;
    (async () => {
      const [i, m] = await Promise.all([
        fetch(`/api/issues/${issueId}`).then((r) => r.json()),
        session
          ? fetch(`/api/issues/${issueId}/me`).then((r) => r.json())
          : Promise.resolve({ upvoted: false, resolveVoted: false }),
      ]);
      if (cancel) return;
      if (i.upvoteCount != null) setUpvotes(i.upvoteCount);
      if (i.resolveCount != null) setResolves(i.resolveCount);
      setLocalStatus(i.status ?? status);
      setUpvoted(m.upvoted);
      setResolveVoted(m.resolveVoted);
    })();
    return () => {
      cancel = true;
    };
  }, [issueId, session, status]);

  const requireLogin = () => {
    void signIn("google", { callbackUrl: `/issues/${issueId}` });
  };

  const onUpvote = async () => {
    if (authStatus !== "authenticated") {
      requireLogin();
      return;
    }
    setBusy(true);
    try {
      const r = await fetch(`/api/issues/${issueId}/upvote`, { method: "POST" });
      const d = await r.json();
      if (!r.ok) {
        if (d.error === "Issue resolved") {
          setLocalStatus("RESOLVED");
        }
        return;
      }
      setUpvotes(d.upvoteCount);
      setUpvoted(true);
      if (d.status) setLocalStatus(d.status);
      router.refresh();
    } finally {
      setBusy(false);
    }
  };

  const onResolve = async () => {
    if (authStatus !== "authenticated") {
      requireLogin();
      return;
    }
    setBusy(true);
    try {
      const r = await fetch(`/api/issues/${issueId}/resolve`, { method: "POST" });
      const d = await r.json();
      if (!r.ok) return;
      setResolves(d.resolveCount);
      setResolveVoted(true);
      setLocalStatus(d.status);
      router.refresh();
    } finally {
      setBusy(false);
    }
  };

  if (localStatus === "RESOLVED") {
    return (
      <div className="rounded-2xl border border-border bg-muted/50 p-4 text-center text-muted-foreground">
        Ova prijava je označena kao riješena (uklonjeno s karte).
        {upvotes != null && (
          <p className="mt-2 text-sm text-foreground">Glasovi: {upvotes}</p>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-3">
      <button
        type="button"
        disabled={busy || upvoted}
        onClick={() => void onUpvote()}
        className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 font-semibold text-primary-foreground shadow-sm transition hover:bg-primary-hover disabled:opacity-60 min-[400px]:flex-initial"
      >
        <ThumbsUp className="size-5" />
        Sviđa mi se
        {upvotes != null && <span className="opacity-90">({upvotes})</span>}
      </button>
      <button
        type="button"
        disabled={busy || resolveVoted}
        onClick={() => void onResolve()}
        className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-secondary bg-card px-4 py-3 font-semibold text-secondary disabled:opacity-60 min-[400px]:flex-initial"
      >
        <CheckCircle className="size-5" />
        Riješeno
        {resolves != null && <span>({resolves})</span>}
      </button>
    </div>
  );
}
