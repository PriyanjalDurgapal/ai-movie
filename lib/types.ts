export type Sentiment = "positive" | "mixed" | "negative";

export interface Actor {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface AISummary {
  summary: string;
  sentiment: Sentiment;
}

export interface MovieResponse {
  title: string;
  poster: string | null;
  year: string;
  rating: number;
  plot: string;
  actors: Actor[];
  reviews: string[];
  aiSummary?: AISummary;
}