import { useQuery } from "@tanstack/react-query";
// import { toast } from "sonner";

import { getMovie } from "@/actions/get-movie";
import { MovieParams } from "@/domain/movie";

export function getQueryKey({ title, type, page }: MovieParams) {
  let key = ["getMovie", title, page];
  if (type) key.push(type);
  return key;
}

export function useGetMovie(params: MovieParams) {
  const result = useQuery({
    queryKey: getQueryKey(params),
    queryFn: () => getMovie(params),
    enabled: !!params.title,
  });
  // if (result?.error?.message) {
  //   console.log("he", result.error.message);
  //   toast.error(result.error.message);
  // }
  return result;
}
