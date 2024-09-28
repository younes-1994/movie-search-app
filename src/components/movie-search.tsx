//TODO: autocomplete
"use client";

import { useState, ChangeEvent, useCallback, useRef } from "react";
import { useDebounceFn } from "ahooks";
import { CircleX, LoaderCircle, Search, SlidersHorizontal } from "lucide-react";

// import { MovieDetails } from "@/domain/movie";
import { useSearchByTitle } from "@/use-cases/use-search-by-title";
import { TextField } from "@/components/ui/text-field";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import MovieSearchItem from "./movie-search-item";

export default function MovieSearch() {
  const input = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { run: handleChange } = useDebounceFn(
    (e: ChangeEvent<HTMLInputElement>): void => {
      setSearchTerm(e.target.value);
    },
    {
      wait: 500,
    },
  );
  const clearSearchTerm = useCallback(() => {
    if (input.current) input.current.value = "";
    setSearchTerm("");
  }, [setSearchTerm]);

  const { data: movieDetails, isLoading, error } = useSearchByTitle(searchTerm);

  return (
    <Card>
      <h1 className="text-3xl font-bold mb-2 text-center">Movie Search</h1>
      <TextField
        ref={input}
        type="text"
        placeholder="Enter a movie title"
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
      />

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
