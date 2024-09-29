import MovieSearch from "@/components/movie-search";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 z-20">
          <div className="w-6 h-6 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
        </div>
      }
    >
      <MovieSearch />
    </Suspense>
  );
}
