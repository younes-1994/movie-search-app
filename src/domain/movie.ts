type Ratings = {
  Source: string;
  Value: string;
};

export type MovieDetailsWithId = {
  Title: string;
  Year: string;
  Actors: string;
  Awards: string;
  BoxOffice: string;
  Country: string;
  DVD: string;
  Director: string;
  Genre: string;
  Language: string;
  Metascore: string;
  Plot: string;
  Poster: string;
  Production: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Type: string;
  Website: string;
  Writer: string;
  imdbID: string;
  imdbRating: string;
  imdbVotes: string;
  Ratings: Ratings[];
};

export type MovieDetails = {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
};

export type MovieParams = { title: string; page: number; type?: string | null };
