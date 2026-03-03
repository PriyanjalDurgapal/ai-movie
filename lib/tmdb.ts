import { Actor } from "./types";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";

const apiKey = process.env.TMDB_API_KEY;

if (!apiKey) {
  throw new Error("TMDB_API_KEY is missing");
}

export async function fetchMovieFromTMDB(imdbId: string) {
  // Convert IMDb → TMDb
  const findRes = await fetch(
    `${TMDB_BASE_URL}/find/${imdbId}?api_key=${apiKey}&external_source=imdb_id`
  );
  const findData = await findRes.json();

  if (!findData.movie_results?.length) {
    throw new Error("Movie not found");
  }

  const movieId = findData.movie_results[0].id;

  const [detailsRes, creditsRes, reviewsRes] = await Promise.all([
    fetch(`${TMDB_BASE_URL}/movie/${movieId}?api_key=${apiKey}`),
    fetch(`${TMDB_BASE_URL}/movie/${movieId}/credits?api_key=${apiKey}`),
    fetch(`${TMDB_BASE_URL}/movie/${movieId}/reviews?api_key=${apiKey}`),
  ]);

  const details = await detailsRes.json();
  const credits = await creditsRes.json();
  const reviewsData = await reviewsRes.json();

  return {
    title: details.title,
    poster: details.poster_path
      ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
      : null,
    year: details.release_date?.split("-")[0] ?? "N/A",
    rating: details.vote_average,
    plot: details.overview,
    actors: (credits.cast as Actor[]).slice(0, 8),
    reviews: reviewsData.results.map((r: any) => r.content).slice(0, 5),
  };
}