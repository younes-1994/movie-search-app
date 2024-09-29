"use client";
import useFavorite from "@/use-cases/use-favorite";
import { Card } from "@/components/ui/card";
import { Empty } from "@/components/ui/empty";
import MovieSearchItem from "@/components/movie-search-item";

export default function Favorites() {
  const { favorites } = useFavorite();

  if (favorites?.length)
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
        {favorites?.map((movie) => (
          <Card key={movie.imdbID}>
            <MovieSearchItem movie={movie} />
          </Card>
        ))}
      </div>
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
