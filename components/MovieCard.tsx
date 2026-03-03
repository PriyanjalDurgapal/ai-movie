type MovieData = {
  title: string;
  poster: string | null;
  year: string;
  rating: number;
  plot: string;
};

export default function MovieCard({ data }: { data: MovieData }) {
  return (
    <div className="bg-[#0f172a] border border-gray-800 rounded-2xl shadow-2xl p-6 flex flex-col md:flex-row gap-8 text-gray-200">
      {data.poster ? (
        <img
          src={data.poster}
          alt={data.title}
          className="w-full md:w-72 rounded-xl object-cover shadow-lg"
        />
      ) : (
        <div className="w-full md:w-72 h-96 bg-gray-800 flex items-center justify-center rounded-xl">
          <span className="text-gray-500">No Image</span>
        </div>
      )}

      <div className="flex flex-col gap-4">
        <h2 className="text-3xl font-bold text-white tracking-wide">
          {data.title}
        </h2>

        <div className="flex gap-6 text-gray-400">
          <p>
            <span className="text-gray-500">Year</span> • {data.year}
          </p>
          <p>
            <span className="text-gray-500">Rating</span> • ⭐ {data.rating}
          </p>
        </div>

        <p className="text-gray-300 leading-relaxed">{data.plot}</p>
      </div>
    </div>
  );
}