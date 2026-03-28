"use client";

import { useCallback, useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
} from "@vis.gl/react-google-maps";
import { ZAGREB_CENTER } from "@/lib/constants";

type LatLng = google.maps.LatLngLiteral;

export function LocationPickerMap({
  initialCenter,
  initialPosition,
  onConfirm,
}: {
  initialCenter: LatLng;
  initialPosition: LatLng | null;
  onConfirm: (pos: LatLng) => void;
}) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";
  const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAP_ID;
  const [pos, setPos] = useState<LatLng>(
    initialPosition ?? initialCenter,
  );

  const onMapClick = useCallback(
    (e: { detail: { latLng: google.maps.LatLngLiteral | null } }) => {
      const ll = e.detail.latLng;
      if (ll) setPos(ll);
    },
    [],
  );

  if (!apiKey) {
    return <p className="text-sm text-muted-foreground">Nema Maps API ključa.</p>;
  }

  return (
    <div className="space-y-2">
      <div className="h-56 w-full overflow-hidden rounded-xl ring-1 ring-border">
        <APIProvider apiKey={apiKey}>
          <Map
            defaultCenter={initialCenter}
            defaultZoom={13}
            gestureHandling="greedy"
            onClick={onMapClick}
            {...(mapId ? { mapId } : {})}
          >
            <AdvancedMarker position={pos} />
          </Map>
        </APIProvider>
      </div>
      <button
        type="button"
        className="w-full rounded-xl bg-primary py-2 font-semibold text-primary-foreground"
        onClick={() => onConfirm(pos)}
      >
        Potvrdi točku
      </button>
    </div>
  );
}
