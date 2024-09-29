//TODO: PAGINATION
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, ChangeEvent, useCallback, useEffect } from "react";
import { useDebounce } from "ahooks";
import { CircleX, LoaderCircle, Search } from "lucide-react";

import { MovieDetails } from "@/domain/movie";
import { useGetMovie } from "@/use-cases/use-get-movie";
import { TextField } from "@/components/ui/text-field";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import MovieSearchItem from "./movie-search-item";
import { SearchSuggestion } from "./search-suggestion";
import { OnChangeType, RadioItemType, SearchFilter } from "./search-filter";

export default function MovieSearch() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState<string>(searchParams.get("searchTerm") || "");
  const debouncedSearchTerm = useDebounce(searchTerm);
  const [page, setPage] = useState<number>(parseInt(searchParams.get("page") || "1"));
  const [type, setType] = useState<string | null>(searchParams.get("type") || null);
  const { data: movieDetails, isLoading, error } = useGetMovie({ title: debouncedSearchTerm, page, type });
  console.log("data", movieDetails);

  // Sync URL with searchTerm, page, and type
  useEffect(() => {
    const queryParams = new URLSearchParams();

    if (debouncedSearchTerm) queryParams.set("searchTerm", debouncedSearchTerm);
    // if (page) queryParams.set("page", page.toString());
    if (type) queryParams.set("type", type);

    router.replace(`?${queryParams.toString()}`);
  }, [debouncedSearchTerm, page, type, router]);

  const handleSearchTerm = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      const newTerm = e.target.value;
      setSearchTerm(newTerm);
      setPage(1);
    },
    [setSearchTerm],
  );
  const clearSearchTerm = useCallback(() => {
    setSearchTerm("");
    setPage(1);
    setType(null);
  }, [setSearchTerm, setPage, setType]);

  const handleSuggestion = useCallback(
    (suggestion: string) => {
      setSearchTerm(suggestion);
      setPage(1);
      setType(null);
    },
    [setSearchTerm, setPage, setType],
  );

  const typesList: RadioItemType[] = [
    { label: "Movie", value: "movie" },
    { label: "Series", value: "series" },
    { label: "Episode", value: "episode" },
  ];
  const onTypeChange = useCallback(
    ({ value }: OnChangeType) => {
      setType(value);
    },
    [setType],
  );

  return (
    <>
      <Card className="mb-3">
        <h1 className="text-3xl font-bold mb-2 text-center">Movie Search</h1>
        <TextField
          type="text"
          placeholder="Enter a movie title"
          className="peer"
          value={searchTerm}
          onChange={handleSearchTerm}
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
              <SearchFilter name="type" value={type} list={typesList} onChange={onTypeChange} />
            </>
          }
        >
          <SearchSuggestion
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
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
        {movieDetails?.Search?.length > 0 &&
          movieDetails?.Search?.map((item: MovieDetails, key: string) => (
            <Card key={key}>
              <MovieSearchItem movie={item} />
            </Card>
          ))}
      </div>
    </>
  );
}
