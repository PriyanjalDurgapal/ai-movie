import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const imdbId = searchParams.get('imdbId');

    if (!imdbId || !/^tt\d{7,8}$/.test(imdbId)) {
      return NextResponse.json({ error: 'Invalid IMDb ID' }, { status: 400 });
    }

    const OMDB_API_KEY = process.env.OMDB_API_KEY;
    if (!OMDB_API_KEY) {
      return NextResponse.json({ error: 'OMDb API key missing' }, { status: 500 });
    }

    // Fetch movie details from OMDb
    const omdbRes = await axios.get('http://www.omdbapi.com/', {
      params: {
        apikey: OMDB_API_KEY,
        i: imdbId,
      },
    });

    if (omdbRes.data.Response === 'False') {
      return NextResponse.json({ error: omdbRes.data.Error }, { status: 404 });
    }

    const movieData = {
      title: omdbRes.data.Title,
      poster: omdbRes.data.Poster,
      year: omdbRes.data.Year,
      rating: omdbRes.data.imdbRating,
      plot: omdbRes.data.Plot,
      actors: omdbRes.data.Actors,
    };

    // For now, stub reviews (we will fetch real reviews next)
    movieData['reviews'] = [
      "Amazing movie, loved it!",
      "Good effects but plot was slow.",
      "A classic, highly recommend!",
    ];

    return NextResponse.json(movieData);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Something went wrong' }, { status: 500 });
  }
}