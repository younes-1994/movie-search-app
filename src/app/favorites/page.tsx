"use client";
import useFavorite from "@/use-cases/use-favorite";
import { Card } from "@/components/ui/card";
import { Empty } from "@/components/ui/empty";
import MovieSearchItem from "@/components/movie-search-item";

export default function Favorites() {
  const { favorites } = useFavorite();

  if (favorites?.length)
    return (
      <Card className="flex flex-col items-center">
        {favorites?.map((movie) => <MovieSearchItem key={movie.imdbID} movie={movie} title={movie.Title} />)}
      </Card>
    );
  else
    return (
      <Card className="flex flex-col items-center">
        <Empty>
          <p className="text-neutral-500">No Favorite</p>
        </Empty>
      </Card>
    );
}
