//TODO: ERROR MIDDLEWARE AND FACTORY METHOD
"use server";

export async function getMovieById(id: string) {
  try {
    const url = `https://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}&i=${id}`;
    const config = { next: { tags: ["getMovieById", id.toString()], revalidate: 1 * 60 * 60 } };

    const response = await fetch(url, config);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    if (data.Response === "False") {
      throw new Error(data.Error);
    }
    return data;
  } catch (error) {
    throw error;
  }
}
