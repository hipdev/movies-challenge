import { supabase } from "lib/supabase-client";
import { Movie } from "types/movie";

export async function addNewMovie(dataForm: Movie) {
  const { data: newMovie, error } = await supabase
    .from("movies")
    .insert(dataForm);

  if (error) {
    throw new Error(error.message);
  }

  return newMovie;
}

export async function getMovies(_key: string) {
  const { data, error } = await supabase
    .from("movies")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);

  if (error) {
    throw new Error(error.message);
  }

  return data?.length == 0 ? null : data;
}
