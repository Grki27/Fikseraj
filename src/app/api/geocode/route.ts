import { NextRequest, NextResponse } from "next/server";

/** Server-side geocode; uses GOOGLE_GEOCODING_API_KEY or NEXT_PUBLIC_GOOGLE_MAPS_API_KEY */
export async function GET(req: NextRequest) {
  const address = req.nextUrl.searchParams.get("address");
  if (!address?.trim()) {
    return NextResponse.json({ error: "address required" }, { status: 400 });
  }
  const key =
    process.env.GOOGLE_GEOCODING_API_KEY ||
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!key) {
    return NextResponse.json({ error: "Geocoding API key not configured" }, { status: 500 });
  }
  const url = new URL("https://maps.googleapis.com/maps/api/geocode/json");
  url.searchParams.set("address", address);
  url.searchParams.set("key", key);
  const res = await fetch(url.toString());
  const data = (await res.json()) as {
    results?: { geometry: { location: { lat: number; lng: number } }; formatted_address: string }[];
    status: string;
  };
  if (data.status !== "OK" || !data.results?.[0]) {
    return NextResponse.json(
      { error: "Geocode failed", status: data.status },
      { status: 422 },
    );
  }
  const r = data.results[0];
  return NextResponse.json({
    lat: r.geometry.location.lat,
    lng: r.geometry.location.lng,
    addressText: r.formatted_address,
  });
}
