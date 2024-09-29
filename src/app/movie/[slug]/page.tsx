import { getMovieById } from "@/actions/get-movie-by-id";
import MovieDetails from "@/components/movie-details";

export default async function Movie({ params }: { params: { slug: string } }) {
  const movie = await getMovieById(params.slug);
  return <MovieDetails movie={movie} />;
}
