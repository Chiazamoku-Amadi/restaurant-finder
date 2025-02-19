// Creates an API route in Next.js that fetches restaurant details from Google Places API based on query parameters (category, radius, latitude, and longitude).
import { NextResponse } from "next/server";

const BASE_URL = "https://maps.googleapis.com/maps/api/place"; // Google Places API base URL
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY; // API key used to authenticate requests

// API Handler Function
export async function GET(req) {
  // Extracting query params from the url
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const radius = searchParams.get("radius");
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const res = await fetch(
    `${BASE_URL}/textsearch/json?query=${category}&location=${lat},${lng}&radius=${radius}&key=${GOOGLE_MAPS_API_KEY}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const product = await res.json();

  return NextResponse.json({ product });
}
