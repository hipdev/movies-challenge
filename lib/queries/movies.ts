import { supabase } from "lib/supabase-client";
import { Movie } from "types/movie";

export async function addNewMovie(data: Movie) {
  let { error } = await supabase
    .from("movies")
    .insert(data, { returning: "minimal" }); // Avoid a select call after creation

  if (error) {
    throw new Error(error.message);
  }

  return true;
}
