import { NextResponse } from "next/server";
import { fetchMovieFromTMDB } from "@/lib/tmdb";
import { validateImdbId } from "@/lib/validation";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const imdbId = searchParams.get("imdbId");

    if (!imdbId || !validateImdbId(imdbId)) {
      return NextResponse.json(
        { error: "Invalid IMDb ID" },
        { status: 400 }
      );
    }

    const data = await fetchMovieFromTMDB(imdbId);
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch movie" },
      { status: 500 }
    );
  }
}