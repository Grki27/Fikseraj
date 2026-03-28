"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function ProfileForm({
  initialUsername,
  initialBio,
}: {
  initialUsername: string;
  initialBio: string;
}) {
  const router = useRouter();
  const [username, setUsername] = useState(initialUsername);
  const [bio, setBio] = useState(initialBio);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    try {
      const r = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, bio }),
      });
      if (!r.ok) throw new Error();
      setMsg("Spremljeno.");
      router.refresh();
    } catch {
      setMsg("Greška pri spremanju.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form
      onSubmit={(e) => void save(e)}
      className="space-y-3 rounded-xl border border-border bg-card p-4"
    >
      <h2 className="font-semibold">Uredi profil</h2>
      <label className="block text-sm font-medium">Korisničko ime</label>
      <input
        className="w-full rounded-lg border border-border bg-input-background px-3 py-2"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="npr. zagreb_user"
      />
      <label className="block text-sm font-medium">Bio</label>
      <textarea
        className="min-h-20 w-full rounded-lg border border-border bg-input-background px-3 py-2"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        placeholder="Kratki opis…"
      />
      {msg && <p className="text-sm text-primary">{msg}</p>}
      <button
        type="submit"
        disabled={busy}
        className="rounded-xl bg-primary px-4 py-2 font-medium text-primary-foreground disabled:opacity-50"
      >
        Spremi
      </button>
    </form>
  );
}
