import { CalendarIcon } from "lucide-react";

import { MovieDetails } from "@/domain/movie";
import { CustomLink } from "@/components/next/custom-link";
import { CustomImage } from "@/components/next/custom-image";
import AddToFavorite from "./add-to-favorite";

type Props = {
  movie: MovieDetails;
};

const MovieSearchItem: React.FC<Props> = ({ movie }) => {
  if (movie)
    return (
      <CustomLink
        href={`/movie/${movie.imdbID}`}
        className="w-full flex justify-around my-2 hover:bg-border rounded-md transition-all ease-in-out"
      >
        <div className="w-5/12 self-center">
          <CustomImage
            key={movie.imdbID || movie.Title}
            src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.svg"}
            alt={movie.Title}
            width={100}
            height={150}
            className="rounded-md shadow-md mx-auto"
          />
        </div>
        <div className="w-6/12 self-start mt-5">
          <h2 className="text-2xl font-bold mb-2">{movie.Title}</h2>
          <div className="flex justify-start items-center text-gray-500 mb-2">
            <CalendarIcon className="w-4 h-4 mr-1" />
            <span className="mr-4">{movie.Year}</span>
          </div>
          <div className="flex justify-start items-center text-gray-500">
            <CalendarIcon className="w-4 h-4 mr-1" />
            <span className="mr-4">{movie.Type}</span>
          </div>
        </div>
        <div className="w-1/12 self-start mt-6">
          <AddToFavorite movie={movie} />
        </div>
      </CustomLink>
    );
  else return <div></div>;
};
MovieSearchItem.displayName = "MovieSearchItem";
export default MovieSearchItem;
