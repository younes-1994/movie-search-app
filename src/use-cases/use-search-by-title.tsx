import { useQuery } from "@tanstack/react-query";
// import { toast } from "sonner";

import { searchByTitle } from "@/actions/movie";

export function getQueryKey(title: string) {
  return ["searchByTitle", title];
}

export function useSearchByTitle(title: string) {
  const result = useQuery({
    queryKey: getQueryKey(title),
    queryFn: () => searchByTitle(title),
    enabled: !!title,
  });
  // if (result?.error?.message) {
  //   console.log("he", result.error.message);
  //   toast.error(result.error.message);
  // }
  return result;
}
