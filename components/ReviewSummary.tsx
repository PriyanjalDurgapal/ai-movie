type ReviewData = {
  reviews: string[];
  aiSummary?: {
    summary: string;
    sentiment: "positive" | "mixed" | "negative";
  };
};

export default function ReviewSummary({ reviewData }: { reviewData: ReviewData }) {
  if (!reviewData) return null;

  const sentiment = reviewData.aiSummary?.sentiment;

  const sentimentStyles =
    sentiment === "positive"
      ? "bg-green-500/20 text-green-400 border-green-500/30"
      : sentiment === "negative"
      ? "bg-red-500/20 text-red-400 border-red-500/30"
      : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";

  return (
    <div className="bg-[#0f172a] border border-gray-800 shadow-2xl rounded-2xl p-5 sm:p-8 text-gray-200">
      <h3 className="text-xl sm:text-2xl font-semibold mb-6 sm:mb-8 text-white">
        Audience Reviews & AI Insight
      </h3>

      {reviewData.aiSummary && (
        <div className="mb-8 sm:mb-10 p-5 sm:p-6 rounded-xl bg-[#111827] border border-gray-700">
          <h4 className="text-base sm:text-lg font-semibold mb-4 text-yellow-400">
            AI Summary
          </h4>

          <p className="text-gray-300 mb-5 leading-relaxed text-sm sm:text-base">
            {reviewData.aiSummary.summary}
          </p>

          <span
            className={`inline-block px-4 py-1 rounded-full text-xs sm:text-sm font-semibold capitalize border ${sentimentStyles}`}
          >
            {sentiment} Sentiment
          </span>
        </div>
      )}

      <div className="flex flex-col gap-4 sm:gap-5">
        {reviewData.reviews?.length === 0 && (
          <p className="text-gray-500 text-sm">No reviews available.</p>
        )}

        {reviewData.reviews?.map((review, index) => (
          <div
            key={index}
            className="border border-gray-800 rounded-xl p-4 sm:p-5 bg-[#111827] text-xs sm:text-sm text-gray-300 hover:border-yellow-500/30 transition"
          >
            {review.substring(0, 300)}...
          </div>
        ))}
      </div>
    </div>
  );
}