import { render, screen } from "@testing-library/react";
import Favorites from "../src/app/favorites/page";
import useFavorite from "@/use-cases/use-favorite";
import { useRouter } from "next/navigation";

// Mock useRouter
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock useFavorite hook
jest.mock("@/use-cases/use-favorite");

describe("Favorites Component", () => {
  it("renders favorite movies when available", () => {
    // Mock the router object
    const mockRouter = {
      route: "/",
      pathname: "/",
      query: {},
      asPath: "/",
    };
    useRouter.mockReturnValue(mockRouter);

    const mockFavorites = [
      { imdbID: "tt1234567", Title: "Inception" },
      { imdbID: "tt7654321", Title: "Interstellar" },
    ];
    (useFavorite as jest.Mock).mockReturnValue({
      favorites: mockFavorites,
      toggleFavorite: jest.fn(),
      isFavorite: () => {
        return true;
      },
      favoriteCount: mockFavorites.length,
    });

    render(<Favorites />);

    expect(screen.getByText("Inception")).toBeInTheDocument();
    expect(screen.getByText("Interstellar")).toBeInTheDocument();
  });

  it("renders 'No Favorite' when no favorites exist", () => {
    (useFavorite as jest.Mock).mockReturnValue({ favorites: [] });

    render(<Favorites />);

    expect(screen.getByText("No Favorite")).toBeInTheDocument();
  });
});
