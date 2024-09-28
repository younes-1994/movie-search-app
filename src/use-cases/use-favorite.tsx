import { MovieDetails } from "@/domain/movie";
import { useLocalStorageState } from "ahooks";
import { useCallback, useMemo } from "react";

const defaultArray: MovieDetails[] | [] = [];

export default function useFavorite() {
  const [favorites, setFavorites] = useLocalStorageState("favorites", {
    defaultValue: defaultArray,
    listenStorageChange: true,
  });

  const toggleFavorite = useCallback(
    (movie: MovieDetails) => {
      setFavorites((prev) => {
        if (prev?.some((item) => item.imdbID === movie.imdbID)) {
          //remove
          return prev.filter((item) => item.imdbID !== movie.imdbID);
        } else {
          //add
          return prev ? [...prev, movie] : [movie];
        }
      });
    },
    [setFavorites],
  );

  const isFavorite = useCallback(
    (id: string) => {
      return favorites?.some((item) => item.imdbID === id);
    },
    [favorites],
  );

  const favoriteCount = useMemo(() => favorites?.length || 0, [favorites]);

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    favoriteCount,
  };
}
