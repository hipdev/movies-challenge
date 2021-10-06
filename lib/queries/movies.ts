import { supabase } from "lib/supabase-client";
import { Movie } from "types/movie";

export async function addNewMovie(dataForm: Movie) {
  const { data: newPicture, error: errorPicture } = await supabase.storage
    .from("movies")
    .upload(`public/${dataForm.title}.png`, dataForm.picture);

  if (errorPicture) {
    throw new Error(errorPicture.message);
  } else {
    const { data: newMovie, error } = await supabase
      .from("movies")
      .insert({ ...dataForm, picture: newPicture?.Key });

    if (error) {
      throw new Error(error.message);
    }
    return newMovie;
  }
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
