'use client';

import { useState } from 'react';
import MovieCard from '@/components/MovieCard';
import CastList from '@/components/CastList';
import ReviewSummary from '@/components/ReviewSummary';
import ErrorMessage from '@/components/ErrorMessage';
import { MovieResponse } from '@/lib/types';
import { validateImdbId } from '@/lib/validation';

export default function HomePage() {
  const [imdbId, setImdbId] = useState('');
  const [error, setError] = useState('');
  const [movieData, setMovieData] = useState<MovieResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError('');

    if (!validateImdbId(imdbId)) {
      setError('Please enter a valid IMDb ID (e.g., tt0133093)');
      return;
    }

    try {
      setLoading(true);
      setMovieData(null);

      // Fetch Movie Data
      const res = await fetch(`/api/fetchMovie?imdbId=${imdbId}`);
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to fetch movie data');
      }

      const data: MovieResponse = await res.json();

      // Fetch AI Summary (only if reviews exist)
      let aiSummary = undefined;

      if (data.reviews?.length > 0) {
        const aiRes = await fetch('/api/summarize', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ reviews: data.reviews }),
        });

        if (aiRes.ok) {
          aiSummary = await aiRes.json();
        }
      }

      setMovieData({
        ...data,
        aiSummary,
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1120] via-[#0f172a] to-[#111827] text-gray-200 flex flex-col items-center px-4 sm:px-6 md:px-8 py-10 sm:py-14 md:py-16">

      {/* Hero Section */}
      <div className="text-center max-w-3xl mb-10 sm:mb-12 md:mb-14 px-2">
        <p className="text-yellow-400 font-semibold tracking-wide mb-3 text-sm sm:text-base">
          AI-POWERED ANALYSIS
        </p>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-snug sm:leading-tight mb-4 sm:mb-6">
          Decode Any Film with{' '}
          <span className="text-yellow-400">
            Artificial Intelligence
          </span>
        </h1>

        <p className="text-gray-400 text-sm sm:text-base md:text-lg px-2 sm:px-0">
          Enter an IMDb ID to unlock deep audience insights, cultural analysis,
          and predictive intelligence for any movie.
        </p>
      </div>

      {/* Search Card */}
      <div className="bg-[#111827] border border-gray-800 shadow-2xl rounded-2xl p-4 sm:p-6 w-full max-w-2xl flex flex-col sm:flex-row gap-3 sm:gap-4">
        <input
          type="text"
          placeholder="Enter IMDb ID (tt0133093)"
          value={imdbId}
          onChange={(e) => setImdbId(e.target.value)}
          className="bg-[#0f172a] border border-gray-700 text-gray-200 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400 transition text-sm sm:text-base"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition disabled:opacity-60 w-full sm:w-auto text-sm sm:text-base"
        >
          {loading ? 'Analyzing...' : 'Analyze'}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="mt-6 w-full max-w-2xl">
          <ErrorMessage message={error} />
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="mt-6 sm:mt-8 text-yellow-400 font-medium animate-pulse text-sm sm:text-base text-center">
          Generating AI-powered insights...
        </div>
      )}

      {/* Results */}
      {movieData && !loading && (
        <div className="mt-12 sm:mt-14 md:mt-16 w-full max-w-6xl flex flex-col gap-8 sm:gap-10 animate-fadeIn">
          <MovieCard data={movieData} />
          <CastList cast={movieData.actors} />
          <ReviewSummary reviewData={movieData} />
        </div>
      )}
    </div>
  );
}