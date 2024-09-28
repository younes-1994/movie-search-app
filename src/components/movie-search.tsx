"use client";

import { useState, ChangeEvent, useCallback, useRef, useEffect } from "react";
import { useDebounce } from "ahooks";
import { CircleX, LoaderCircle, Search, SlidersHorizontal } from "lucide-react";

// import { MovieDetails } from "@/domain/movie";
import { useSearchByTitle } from "@/use-cases/use-search-by-title";
import { TextField } from "@/components/ui/text-field";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import MovieSearchItem from "./movie-search-item";
import { Suggestion } from "./suggestion";

export default function MovieSearch() {
  const input = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchTerm);
  const { data: movieDetails, isLoading, error } = useSearchByTitle(debouncedSearchTerm);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      const newTerm = e.target.value;
      setSearchTerm(newTerm);
    },
    [setSearchTerm],
  );
  const clearSearchTerm = useCallback(() => {
    if (input.current) input.current.value = "";
    setSearchTerm("");
  }, [setSearchTerm]);
  const handleSuggestion = useCallback(
    (suggestion: string) => {
      if (input.current) input.current.value = suggestion;
      setSearchTerm(suggestion);
    },
    [setSearchTerm],
  );

  return (
    <Card>
      <h1 className="text-3xl font-bold mb-2 text-center">Movie Search</h1>
      <TextField
        ref={input}
        type="text"
        placeholder="Enter a movie title"
        className="peer"
        onChange={handleChange}
        startAdornment={
          isLoading ? <LoaderCircle className="animate-spin" data-testid="loader-spinner" /> : <Search />
        }
        endAdornment={
          <>
            {searchTerm && (
              <CircleX
                className="cursor-pointer hover:text-slate-500"
                onClick={clearSearchTerm}
                data-testid="clear-button"
              />
            )}
            <SlidersHorizontal />
          </>
        }
      >
        <Suggestion
          value={searchTerm}
          debouncedValue={debouncedSearchTerm}
          data={movieDetails}
          onclick={handleSuggestion}
          className="invisible peer-focus:visible transition-all duration-300 ease-in-out delay-500 absolute right-0 left-0 top-[60px] z-10"
        />
      </TextField>

      {error && (
        <Alert variant="destructive" className="mt-4">
          {/* <ExclamationTriangleIcon className="h-4 w-4" /> */}
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error.message}.</AlertDescription>
        </Alert>
      )}

      {movieDetails && <MovieSearchItem movie={movieDetails} title={searchTerm} />}
    </Card>
  );
}
