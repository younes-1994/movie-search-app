import { CalendarIcon, StarIcon } from "lucide-react";

import { MovieDetailsWithId } from "@/domain/movie";
import { Card } from "@/components/ui/card";
import { Empty } from "@/components/ui/empty";
import { CustomImage } from "@/components/next/custom-image";
import AddToFavorite from "./add-to-favorite";

export default function MovieDetails({ movie }: { movie: MovieDetailsWithId }) {
  if (movie)
    return (
      <Card className="grid grid-cols-1 md:grid-cols-2 !max-w-3xl">
        <div className="w-full">
          <CustomImage
            src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.svg"}
            alt={movie.Title}
            width={200}
            height={300}
            className="rounded-md shadow-md mx-auto"
          />
        </div>
        <div className="w-full">
          <div className="mb-2 flex items-center">
            <h2 className="text-2xl font-bold">{movie.Title}</h2>
            <div className="grow"></div>
            <AddToFavorite movie={movie} />
          </div>
          <p className="text-gray-600 mb-4 italic">{movie.Plot}</p>
          <div className="flex justify-start items-center text-gray-500 mb-2">
            <CalendarIcon className="w-4 h-4 mr-1" />
            <span className="mr-4">{movie.Year}</span>
            <StarIcon className="w-4 h-4 mr-1 fill-yellow-500" />
            <span>{movie.imdbRating}</span>
          </div>
          <div className="flex justify-start items-center text-gray-500 mb-2">
            <strong>Genre:</strong> {movie.Genre}
          </div>
          <div className="flex justify-start items-center text-gray-500 mb-2">
            <strong>Director:</strong> {movie.Director}
          </div>
          <div className="flex justify-start items-center text-gray-500 mb-2">
            <strong>Actors:</strong> {movie.Actors}
          </div>
          <div className="flex justify-start items-center text-gray-500 mb-2">
            <strong>Runtime:</strong> {movie.Runtime}
          </div>
          <div className="flex justify-start items-center text-gray-500 mb-2">
            <strong>Released:</strong> {movie.Released}
          </div>
        </div>
      </Card>
    );
  else
    return (
      <Empty>
        <p className="text-neutral-500">No Movie Found</p>
      </Empty>
    );
}
