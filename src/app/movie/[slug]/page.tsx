import { MovieDetails } from "@/domain/movie";
import { searchByTitle } from "@/actions/movie";
import MovieDetail from "@/components/movie-detail";

export default async function Movie({ params }: { params: { slug: string } }) {
  const movie: MovieDetails = await searchByTitle(params.slug);
  return <MovieDetail movie={movie} />;
}
