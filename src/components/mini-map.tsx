"use client";

import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";

export function MiniMap({ lat, lng }: { lat: number; lng: number }) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";
  const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAP_ID;
  if (!apiKey) {
    return (
      <div className="flex h-full items-center justify-center bg-muted text-xs text-muted-foreground">
        Karta nije konfigurirana
      </div>
    );
  }
  return (
    <APIProvider apiKey={apiKey}>
      <Map
        defaultCenter={{ lat, lng }}
        defaultZoom={15}
        gestureHandling="cooperative"
        {...(mapId ? { mapId } : {})}
        style={{ width: "100%", height: "100%" }}
      >
        <AdvancedMarker position={{ lat, lng }} />
      </Map>
    </APIProvider>
  );
}
