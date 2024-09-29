import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useRouter, useSearchParams } from "next/navigation";
import MovieSearch from "@/components/movie-search"; // Adjust this path
import { useGetMovie } from "@/use-cases/use-get-movie";

// Mock useRouter
// jest.mock("next/navigation", () => ({
//   useRouter: jest.fn(() => ({
//     replace: jest.fn(),
//     query: {}, // You can mock other properties if needed
//   })),
//   useSearchParams: jest.fn(),
// }));
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

// Mock the `useGetMovie` hook
jest.mock("@/use-cases/use-get-movie", () => ({
  useGetMovie: jest.fn(),
}));

describe("MovieSearch Component", () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();

    // Mock `useSearchParams`
    const mockSearchParams = new URLSearchParams();
    jest.spyOn(require("next/navigation"), "useSearchParams").mockReturnValue({
      get: (key: string) => mockSearchParams.get(key),
    });

    // Mock useRouter with a replace function
    (useRouter as jest.Mock).mockReturnValue({
      replace: jest.fn(), // Mock the `replace` function properly here
      query: {},
    });
  });

  it("renders the search input and initial UI elements correctly", () => {
    // Mock the useGetMovie hook to return default values
    (useGetMovie as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
    });

    render(<MovieSearch />);

    // Check if the input field is rendered
    const inputElement = screen.getByPlaceholderText("Enter a movie title");
    expect(inputElement).toBeInTheDocument();

    // Check if the heading is rendered
    const headingElement = screen.getByText("Movie Search");
    expect(headingElement).toBeInTheDocument();
  });

  it("updates search term on input change and clears it when clear button is clicked", async () => {
    (useGetMovie as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    render(<MovieSearch />);

    const inputElement = screen.getByPlaceholderText("Enter a movie title");

    // Simulate typing in the search field
    fireEvent.change(inputElement, { target: { value: "Inception" } });

    // Wait for debounce to trigger
    await waitFor(() => {
      expect(inputElement).toHaveValue("Inception");
    });

    // Check if the clear button shows up
    await waitFor(() => {
      const clearIcon = screen.getByTestId("clear-button");
      expect(clearIcon).toBeInTheDocument();
    });

    // Simulate clicking the clear button
    const clearIcon = screen.getByTestId("clear-button");
    fireEvent.click(clearIcon);
    await waitFor(() => {
      expect(inputElement).toHaveValue("");
    });
  });

  it("shows a loading spinner when searching", async () => {
    (useGetMovie as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    render(<MovieSearch />);

    // Simulate typing in the search field
    const inputElement = screen.getByPlaceholderText("Enter a movie title");
    fireEvent.change(inputElement, { target: { value: "Avatar" } });

    // Wait for the debounce and loading state
    await waitFor(() => {
      const spinner = screen.getByTestId("loader-spinner");
      expect(spinner).toBeInTheDocument();
    });
  });

  it("displays an error message when the search fails", async () => {
    const mockError = new Error("Something went wrong");

    (useGetMovie as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: mockError,
    });

    render(<MovieSearch />);

    // Wait for the error message to appear
    await waitFor(() => {
      setTimeout(() => {
        expect(screen.getByText("Something went wrong")).toBeInTheDocument();
      }, 1000);
    });
  });

  it("displays movie search results when found", async () => {
    // Mock the router object
    const mockRouter = {
      replace: jest.fn(), // Ensure `replace` is mocked here as well
      query: {},
    };
    useRouter.mockReturnValue(mockRouter);

    const mockMovieDetails = {
      Search: [
        {
          Title: "Beta Test",
          Year: "2016",
          imdbID: "tt4244162",
          Type: "movie",
          Poster:
            "https://m.media-amazon.com/images/M/MV5BMjcwYmExZTEtNzNmZS00OGQ5LThiMjctOGMzYzVkZjY5ODA0XkEyXkFqcGdeQXVyMTU2NTcxNDg@._V1_SX300.jpg",
        },
      ],
      totalResults: "1001",
      Response: "True",
    };

    (useGetMovie as jest.Mock).mockReturnValue({
      data: mockMovieDetails,
      isLoading: false,
      error: null,
    });

    render(<MovieSearch />);

    // Simulate typing in the search field
    const inputElement = screen.getByPlaceholderText("Enter a movie title");
    fireEvent.change(inputElement, { target: { value: "Beta Test" } });

    // Wait for results to be displayed
    await waitFor(() => {
      expect(screen.getByText("Beta Test")).toBeInTheDocument();
      expect(screen.getByText("2016")).toBeInTheDocument();
      expect(screen.getByText("movie")).toBeInTheDocument();
    });
  });
});
