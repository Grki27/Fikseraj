"use client";

import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { useCallback, useState } from "react";
import { Plus } from "lucide-react";
import { IssueCategory } from "@prisma/client";
import { DESCRIPTION_MAX_LENGTH, ZAGREB_CENTER } from "@/lib/constants";
import { LocationPickerMap } from "@/components/location-picker-map";

const categories: { value: IssueCategory; label: string }[] = [
  { value: "PROMET", label: "Promet" },
  { value: "KOMUNALNI", label: "Komunalni problemi" },
  { value: "OKOLIS", label: "Okoliš" },
  { value: "OSTALO", label: "Ostalo" },
];

export function SubmitIssueFab() {
  const router = useRouter();
  const { status } = useSession();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"form" | "map">("form");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<IssueCategory>("PROMET");
  const [customCategory, setCustomCategory] = useState("");
  const [address, setAddress] = useState("");
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [addressText, setAddressText] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const reset = () => {
    setStep("form");
    setTitle("");
    setDescription("");
    setCategory("PROMET");
    setCustomCategory("");
    setAddress("");
    setLat(null);
    setLng(null);
    setAddressText(null);
    setImageUrl(null);
    setErr(null);
  };

  const openFab = () => {
    if (status !== "authenticated") {
      signIn("google", { callbackUrl: "/" });
      return;
    }
    reset();
    setOpen(true);
  };

  const useGps = () => {
    if (!navigator.geolocation) {
      setErr("Geolokacija nije dostupna");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (p) => {
        const la = p.coords.latitude;
        const ln = p.coords.longitude;
        setLat(la);
        setLng(ln);
        try {
          const key =
            process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ||
            process.env.GOOGLE_GEOCODING_API_KEY;
          if (key) {
            const u = new URL("https://maps.googleapis.com/maps/api/geocode/json");
            u.searchParams.set("latlng", `${la},${ln}`);
            u.searchParams.set("key", key);
            const r = await fetch(u.toString());
            const d = (await r.json()) as {
              results?: { formatted_address: string }[];
            };
            setAddressText(d.results?.[0]?.formatted_address ?? null);
          }
        } catch {
          setAddressText(null);
        }
      },
      () => setErr("Dozvola za lokaciju je potrebna"),
    );
  };

  const geocodeAddress = async () => {
    if (!address.trim()) {
      setErr("Unesite adresu");
      return;
    }
    setBusy(true);
    setErr(null);
    try {
      const r = await fetch(
        `/api/geocode?address=${encodeURIComponent(address.trim())}`,
      );
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || "Geokodiranje nije uspjelo");
      setLat(d.lat);
      setLng(d.lng);
      setAddressText(d.addressText);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Greška");
    } finally {
      setBusy(false);
    }
  };

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setBusy(true);
    setErr(null);
    try {
      const fd = new FormData();
      fd.set("file", f);
      const r = await fetch("/api/upload", { method: "POST", body: fd });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || "Upload");
      setImageUrl(d.url);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Upload greška");
    } finally {
      setBusy(false);
    }
  };

  const submit = useCallback(async () => {
    if (!title.trim() || !description.trim()) {
      setErr("Naslov i opis su obavezni");
      return;
    }
    if (description.length > DESCRIPTION_MAX_LENGTH) {
      setErr(`Opis max ${DESCRIPTION_MAX_LENGTH} znakova`);
      return;
    }
    if (lat == null || lng == null) {
      setErr("Odaberite lokaciju");
      return;
    }
    if (category === "OSTALO" && !customCategory.trim()) {
      setErr("Upišite kategoriju za Ostalo");
      return;
    }
    setBusy(true);
    setErr(null);
    try {
      const r = await fetch("/api/issues", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          category,
          customCategory:
            category === "OSTALO" ? customCategory.trim() : undefined,
          lat,
          lng,
          addressText: addressText || address.trim() || null,
          imageUrl,
        }),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || "Spremanje");
      setOpen(false);
      reset();
      router.push(`/issues/${d.id}`);
      router.refresh();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Greška");
    } finally {
      setBusy(false);
    }
  }, [
    title,
    description,
    lat,
    lng,
    category,
    customCategory,
    address,
    addressText,
    imageUrl,
    router,
  ]);

  return (
    <>
      <button
        type="button"
        onClick={openFab}
        className="fixed bottom-24 right-5 z-30 flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_4px_14px_rgba(0,102,204,0.4)] ring-4 ring-background transition hover:bg-primary-hover hover:shadow-[0_6px_18px_rgba(0,102,204,0.45)]"
        aria-label="Nova prijava"
      >
        <Plus className="size-8" strokeWidth={2.5} />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-4">
          <div className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-2xl border border-border bg-card p-4 shadow-xl sm:rounded-2xl">
            <div className="mb-4 flex items-center justify-between border-b border-border/60 pb-3">
              <h2 className="text-lg font-bold text-foreground">Nova prijava</h2>
              <button
                type="button"
                className="rounded-lg p-2 text-muted-foreground hover:bg-muted"
                onClick={() => setOpen(false)}
              >
                ✕
              </button>
            </div>

            {step === "map" ? (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Dodirnite kartu da postavite točku.
                </p>
                <LocationPickerMap
                  initialCenter={
                    lat != null && lng != null
                      ? { lat, lng }
                      : ZAGREB_CENTER
                  }
                  initialPosition={
                    lat != null && lng != null ? { lat, lng } : null
                  }
                  onConfirm={(pos) => {
                    setLat(pos.lat);
                    setLng(pos.lng);
                    setStep("form");
                  }}
                />
                <button
                  type="button"
                  className="w-full rounded-lg border border-border py-2 text-sm font-medium"
                  onClick={() => setStep("form")}
                >
                  Natrag
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {err && (
                  <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
                    {err}
                  </p>
                )}
                <label className="block text-sm font-medium">Naslov *</label>
                <input
                  className="w-full rounded-lg border border-border bg-input-background px-3 py-2"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <label className="block text-sm font-medium">
                  Opis * (max {DESCRIPTION_MAX_LENGTH} znakova)
                </label>
                <textarea
                  className="min-h-24 w-full rounded-lg border border-border bg-input-background px-3 py-2"
                  value={description}
                  maxLength={DESCRIPTION_MAX_LENGTH}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  {description.length}/{DESCRIPTION_MAX_LENGTH}
                </p>
                <label className="block text-sm font-medium">Kategorija *</label>
                <select
                  className="w-full rounded-lg border border-border bg-input-background px-3 py-2"
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value as IssueCategory)
                  }
                >
                  {categories.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
                {category === "OSTALO" && (
                  <>
                    <label className="text-sm font-medium">Vaša kategorija *</label>
                    <input
                      className="w-full rounded-lg border border-border bg-input-background px-3 py-2"
                      value={customCategory}
                      onChange={(e) => setCustomCategory(e.target.value)}
                      placeholder="Npr. buka, pristup…"
                    />
                  </>
                )}
                <label className="block text-sm font-medium">
                  Fotografija (opcionalno)
                </label>
                <input type="file" accept="image/*" capture="environment" onChange={onFile} />
                {imageUrl && (
                  <p className="text-xs text-success">✓ Učitano</p>
                )}

                <label className="block text-sm font-medium">Lokacija *</label>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground"
                    onClick={useGps}
                  >
                    GPS
                  </button>
                  <button
                    type="button"
                    className="rounded-lg border border-border px-3 py-2 text-sm font-medium"
                    onClick={() => setStep("map")}
                  >
                    Odaberi na karti
                  </button>
                </div>
                <div className="flex gap-2">
                  <input
                    className="flex-1 rounded-lg border border-border bg-input-background px-3 py-2"
                    placeholder="Adresa u Zagrebu"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <button
                    type="button"
                    className="rounded-lg border border-border px-3 py-2 text-sm"
                    onClick={geocodeAddress}
                    disabled={busy}
                  >
                    Geokodiraj
                  </button>
                </div>
                {(lat != null && lng != null) || addressText ? (
                  <p className="text-xs text-muted-foreground">
                    📍 {addressText || `${lat?.toFixed(5)}, ${lng?.toFixed(5)}`}
                  </p>
                ) : null}

                <button
                  type="button"
                  disabled={busy}
                  onClick={() => void submit()}
                  className="w-full rounded-xl bg-primary py-3 font-semibold text-primary-foreground disabled:opacity-50"
                >
                  Pošalji prijavu
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
