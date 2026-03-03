type Actor = {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
};

export default function CastList({ cast }: { cast: Actor[] }) {
  return (
    <div className="bg-[#0f172a] border border-gray-800 shadow-2xl rounded-2xl p-5 sm:p-8 text-gray-200">
      <h3 className="text-xl sm:text-2xl font-semibold mb-6 sm:mb-8 text-white">
        Featured Cast
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8">
        {cast.map((actor) => (
          <div
            key={actor.id}
            className="flex flex-col items-center text-center group"
          >
            {actor.profile_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                alt={actor.name}
                className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full object-cover border-2 border-gray-700 group-hover:border-yellow-400 transition duration-300 shadow-lg"
              />
            ) : (
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-gray-800 rounded-full flex items-center justify-center border border-gray-700">
                <span className="text-gray-500 text-xs">No Image</span>
              </div>
            )}

            <p className="mt-3 sm:mt-4 font-semibold text-white text-sm sm:text-base">
              {actor.name}
            </p>

            <p className="text-xs sm:text-sm text-gray-400">
              {actor.character}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}