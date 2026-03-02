'use client';

import { useState } from 'react';
import MovieCard from '@/components/MovieCard';
import CastList from '@/components/CastList';
import ReviewSummary from '@/components/ReviewSummary';
import ErrorMessage from '@/components/ErrorMessage';

export default function HomePage() {
  const [imdbId, setImdbId] = useState('');
  const [error, setError] = useState('');
  const [movieData, setMovieData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const validateId = (id: string) => /^tt\d{7,8}$/.test(id);

  const handleSubmit = async () => {
    setError('');
    if (!validateId(imdbId)) {
      setError('Please enter a valid IMDb ID (e.g., tt0133093)');
      return;
    }

    try {
      setLoading(true);
      setMovieData(null);

      // Call our API route (we will implement next)
      const res = await fetch(`/api/fetchMovie?imdbId=${imdbId}`);
      if (!res.ok) throw new Error('Failed to fetch movie data');
      const data = await res.json();
      setMovieData(data);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold mb-6">AI Movie Insight Builder</h1>

      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter IMDb ID (tt1234567)"
          value={imdbId}
          onChange={(e) => setImdbId(e.target.value)}
          className="border rounded px-4 py-2 w-full sm:w-64"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? 'Loading...' : 'Fetch Movie'}
        </button>
      </div>

      {error && <ErrorMessage message={error} />}

      {movieData && (
        <div className="mt-6 w-full max-w-4xl flex flex-col gap-4">
          <MovieCard data={movieData} />
          <CastList cast={movieData.actors} />
          <ReviewSummary reviewData={movieData.aiSummary} />
        </div>
      )}
    </div>
  );
}