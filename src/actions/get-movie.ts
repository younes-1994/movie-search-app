//TODO: ERROR MIDDLEWARE AND FACTORY METHOD
"use server";
import { MovieParams } from "@/domain/movie";

export async function getMovie({ title, type, page }: MovieParams) {
  try {
    let url = `https://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}&s=${title}&page=${page}`;
    const config = { next: { tags: ["getMovie", title, page.toString()], revalidate: 1 * 60 * 60 } };

    if (type) {
      url += `&page=${type}`;
      config.next.tags.push(type);
    }

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
