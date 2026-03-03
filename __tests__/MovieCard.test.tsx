import { render, screen } from "@testing-library/react";
import MovieCard from "@/components/MovieCard";

const mockMovie = {
  title: "The Matrix",
  poster: null,
  year: "1999",
  rating: 8.7,
  plot: "A hacker discovers reality.",
  actors: [],
  reviews: [],
};

describe("MovieCard Component", () => {
  it("renders movie title", () => {
    render(<MovieCard data={mockMovie} />);
    expect(screen.getByText("The Matrix")).toBeInTheDocument();
  });

  it("renders release year", () => {
    render(<MovieCard data={mockMovie} />);
    expect(screen.getByText(/1999/)).toBeInTheDocument();
  });
});