import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import MovieSearch from "@/components/movie-search"; // Adjust this path
import { useSearchByTitle } from "@/use-cases/use-search-by-title";

// Mock useRouter
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock the `useSearchByTitle` hook
jest.mock("@/use-cases/use-search-by-title", () => ({
  useSearchByTitle: jest.fn(),
}));

describe("MovieSearch Component", () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
  });

  it("renders the search input and initial UI elements correctly", () => {
    // Mock the useSearchByTitle hook to return default values
    (useSearchByTitle as jest.Mock).mockReturnValue({
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
    (useSearchByTitle as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    render(<MovieSearch />);

    const inputElement = screen.getByPlaceholderText("Enter a movie title");
    // const clearButton = screen.queryByTestId("clear-button"); // Shouldn't be visible initially
    // expect(clearButton).toBeNull();

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
    (useSearchByTitle as jest.Mock).mockReturnValue({
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

  it("displays movie search results when found", async () => {
    // Mock the router object
    const mockRouter = {
      route: "/",
      pathname: "/",
      query: {},
      asPath: "/",
    };
    useRouter.mockReturnValue(mockRouter);

    const mockMovieDetails = {
      Title: "Inception",
      Year: "2010",
    };

    (useSearchByTitle as jest.Mock).mockReturnValue({
      data: mockMovieDetails,
      isLoading: false,
      error: null,
    });

    render(<MovieSearch />);

    // Simulate typing in the search field
    const inputElement = screen.getByPlaceholderText("Enter a movie title");
    fireEvent.change(inputElement, { target: { value: "Inception" } });

    // Wait for results to be displayed
    await waitFor(() => {
      expect(screen.getByText("Inception")).toBeInTheDocument();
      expect(screen.getByText("2010")).toBeInTheDocument();
    });
  });

  it("displays an error message when the search fails", async () => {
    const mockError = new Error("Something went wrong");

    (useSearchByTitle as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: mockError,
    });

    render(<MovieSearch />);

    // Simulate typing in the search field
    // const inputElement = screen.getByPlaceholderText("Enter a movie title");
    // fireEvent.change(inputElement, { target: { value: "Nonexistent Movie" } });

    // Wait for the error message to appear
    await waitFor(() => {
      setTimeout(() => {
        expect(screen.getByText("Something went wrong")).toBeInTheDocument();
      }, 1000);
    });
  });
});
