"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  useMap,
} from "@vis.gl/react-google-maps";
import { cn } from "@/lib/utils";
import { ZAGREB_CENTER } from "@/lib/constants";
import type { IssueCategory, IssueStatus } from "@prisma/client";

export type MapIssue = {
  id: string;
  title: string;
  lat: number;
  lng: number;
  category: IssueCategory;
  imageUrl: string | null;
  status: IssueStatus;
};

const categoryGlyph: Record<IssueCategory, string> = {
  PROMET: "🚗",
  KOMUNALNI: "🔧",
  OKOLIS: "🌿",
  OSTALO: "📌",
};

function StatusDot({ status }: { status: IssueStatus }) {
  if (status === "RESOLVED") return null;
  const cls =
    status === "SENT_TO_HOLDING" ? "bg-secondary" : "bg-primary";
  return (
    <span
      className={`absolute -right-0.5 -top-0.5 size-3 rounded-full border-2 border-white ${cls}`}
      title={status === "SENT_TO_HOLDING" ? "Poslano Holding-u" : "Poslano"}
    />
  );
}

function UserLocationMarker({
  onPosition,
}: {
  onPosition: (p: google.maps.LatLngLiteral) => void;
}) {
  const [pos, setPos] = useState<google.maps.LatLngLiteral | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (p) => {
        const loc = { lat: p.coords.latitude, lng: p.coords.longitude };
        setPos(loc);
        onPosition(loc);
      },
      () => {},
      { enableHighAccuracy: true, maximumAge: 60_000 },
    );
  }, [onPosition]);

  if (!pos) return null;
  return (
    <AdvancedMarker position={pos}>
      <div className="size-4 rounded-full border-2 border-white bg-[#4285F4] shadow-md" />
    </AdvancedMarker>
  );
}

function RecenterOnUser({ userPos }: { userPos: google.maps.LatLngLiteral | null }) {
  const map = useMap();
  return (
    <button
      type="button"
      className="absolute right-3 top-14 z-10 rounded-lg bg-card px-3 py-2 text-sm font-medium text-foreground shadow-md ring-1 ring-border transition-transform duration-200 hover:bg-accent active:scale-95"
      onClick={() => {
        if (!map || !userPos) return;
        map.panTo(userPos);
        map.setZoom(15);
      }}
    >
      📍 Moja lokacija
    </button>
  );
}

export function IssueMap({
  issues,
  tall = false,
  embedded = false,
}: {
  issues: MapIssue[];
  /** Veća karta na početnoj stranici */
  tall?: boolean;
  /** Unutar vanjske kartice (početna) — blaži rubovi */
  embedded?: boolean;
}) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";
  const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAP_ID;
  const [selected, setSelected] = useState<MapIssue | null>(null);
  const [userPos, setUserPos] = useState<google.maps.LatLngLiteral | null>(
    null,
  );

  const onCam = useCallback(() => {}, []);

  const onUserPos = useCallback((p: google.maps.LatLngLiteral) => {
    setUserPos(p);
  }, []);

  const center = useMemo(() => ZAGREB_CENTER, []);

  if (!apiKey) {
    return (
      <div
        className={cn(
          "home-map-shell flex items-center justify-center border border-dashed border-border bg-muted/60 p-6 text-center text-muted-foreground",
          embedded ? "rounded-2xl" : "rounded-3xl",
          tall ? "h-[min(78vh,720px)]" : "h-[60vh]",
        )}
      >
        Postavite{" "}
        <code className="mx-1 rounded bg-card px-1">
          NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
        </code>{" "}
        u .env.local
      </div>
    );
  }

  return (
    <div
      className={cn(
        "home-map-shell relative w-full overflow-hidden transition-[box-shadow,transform] duration-500 ease-out",
        embedded
          ? "rounded-2xl ring-1 ring-border/60 shadow-sm hover:shadow-md"
          : "rounded-3xl ring-1 shadow-lg ring-primary/15 hover:shadow-2xl hover:shadow-primary/10",
        tall
          ? "h-[min(82vh,720px)] min-h-[420px]"
          : "h-[min(70vh,560px)] shadow-md",
      )}
    >
      <APIProvider apiKey={apiKey}>
        <Map
          defaultCenter={center}
          defaultZoom={12}
          gestureHandling="greedy"
          disableDefaultUI={false}
          mapTypeControl={false}
          {...(mapId ? { mapId } : {})}
          onCameraChanged={onCam}
        >
          <UserLocationMarker onPosition={onUserPos} />
          {issues.map((issue) => (
            <AdvancedMarker
              key={issue.id}
              position={{ lat: issue.lat, lng: issue.lng }}
              onClick={() => setSelected(issue)}
            >
              <div className="map-marker-btn relative flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-card text-xl shadow-lg ring-2 ring-primary/30 hover:scale-110 hover:shadow-xl">
                {categoryGlyph[issue.category]}
                <StatusDot status={issue.status} />
              </div>
            </AdvancedMarker>
          ))}
          <RecenterOnUser userPos={userPos} />
        </Map>
      </APIProvider>

      {selected && (
        <div
          key={selected.id}
          className="map-popup-enter absolute bottom-3 left-3 right-3 z-20 rounded-xl border border-border bg-card/95 p-3 shadow-xl backdrop-blur-sm md:left-auto md:right-3 md:w-80"
        >
          <button
            type="button"
            className="absolute right-2 top-2 rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted active:scale-90"
            onClick={() => setSelected(null)}
            aria-label="Zatvori"
          >
            ✕
          </button>
          <Link
            href={`/issues/${selected.id}`}
            className="flex gap-3 pt-1 transition-[transform,opacity] duration-200 active:scale-[0.98]"
            onClick={() => setSelected(null)}
          >
            <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-muted">
              {selected.imageUrl ? (
                <Image
                  src={selected.imageUrl}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              ) : (
                <div className="flex size-full items-center justify-center text-2xl">
                  {categoryGlyph[selected.category]}
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="line-clamp-2 font-semibold text-foreground">
                {selected.title}
              </p>
              <p className="mt-1 text-sm text-primary">Otvori detalje →</p>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}
