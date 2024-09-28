//TODO: ERROR MIDDLEWARE
"use server";

export async function searchByTitle(title: string) {
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?t=${title}&apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}`,
      { next: { tags: ["searchByTitle", title], revalidate: 1 * 60 * 60 } },
    );
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
