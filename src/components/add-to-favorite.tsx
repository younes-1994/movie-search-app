"use client";
import { Star } from "lucide-react";

import { MovieDetailsWithId, MovieDetails } from "@/domain/movie";
import useFavorite from "@/use-cases/use-favorite";
import { MouseEvent, useCallback, useMemo } from "react";

type Props = {
  movie: MovieDetailsWithId | MovieDetails;
};

const AddToFavorite: React.FC<Props> = ({ movie }) => {
  const { toggleFavorite, isFavorite } = useFavorite();
  const handleToggleFavorite = useCallback(
    (e: MouseEvent<SVGSVGElement>) => {
      e.stopPropagation();
      e.preventDefault();
      const { Poster, Title, Type, Year, imdbID } = movie;
      toggleFavorite({ Poster, Title, Type, Year, imdbID });
    },
    [movie, toggleFavorite],
  );
  const fill = useMemo(() => {
    return isFavorite(movie.imdbID) ? "orange" : "none";
  }, [movie, isFavorite]);

  return <Star onClick={handleToggleFavorite} color="orange" fill={fill} className="cursor-pointer" />;
};
AddToFavorite.displayName = "AddToFavorite";
export default AddToFavorite;
