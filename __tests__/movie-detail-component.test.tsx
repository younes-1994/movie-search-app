import React from "react";
import { render, screen } from "@testing-library/react";
import MovieDetails from "@/components/movie-details";

describe("Movie Detail Page", () => {
  it("renders movie details correctly when movie data is found", async () => {
    // Mock the movie data
    const mockMovie = {
      Title: "The Shawshank Redemption",
      Year: "1994",
      Poster: "https://example.com/poster.jpg",
      Plot: "Two imprisoned men bond over a number of years...",
      imdbRating: "9.3",
      Genre: "Drama",
      Director: "Frank Darabont",
      Actors: "Tim Robbins, Morgan Freeman, Bob Gunton",
      Runtime: "142 min",
      Released: "14 Oct 1994",
    };

    render(<MovieDetails movie={mockMovie} />);

    expect(screen.getByText("The Shawshank Redemption")).toBeInTheDocument();
    expect(screen.getByText("Two imprisoned men bond over a number of years...")).toBeInTheDocument();
    expect(screen.getByText("1994")).toBeInTheDocument();
    expect(screen.getByText("9.3")).toBeInTheDocument();
    expect(screen.getByText("Drama")).toBeInTheDocument();
    expect(screen.getByText("Frank Darabont")).toBeInTheDocument();
    expect(screen.getByText("Tim Robbins, Morgan Freeman, Bob Gunton")).toBeInTheDocument();
    expect(screen.getByText("142 min")).toBeInTheDocument();
    expect(screen.getByText("14 Oct 1994")).toBeInTheDocument();
  });

  it("renders an empty state when no movie is found", async () => {
    render(<MovieDetails movie={null} />);

    expect(screen.getByText("No Movie Found")).toBeInTheDocument();
  });
});
