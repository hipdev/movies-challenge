import { supabase } from 'lib/supabase-client'
import { getPagination } from 'lib/utils'
import { Movie } from 'types/movie'

export async function addNewMovie(dataForm: Movie) {
  const { data: newPicture, error: errorPicture } = await supabase.storage
    .from('movies')
    .upload(`public/${dataForm.title}.png`, dataForm.picture)

  if (errorPicture) {
    throw new Error(errorPicture.message)
  } else {
    const { data: newMovie, error } = await supabase
      .from('movies')
      .insert({ ...dataForm, picture: newPicture?.Key })

    if (error) {
      throw new Error(error.message)
    }
    return newMovie
  }
}

export async function getMovies(
  _key: string,
  page: number,
  searchWord?: string
) {
  const { from, to } = getPagination(page, 5)

  if (searchWord) {
    const { data, error } = await supabase
      .from('movies')
      .select('*')
      .ilike('title', `%${searchWord}%`)
      .order('created_at', { ascending: false })
      .range(from, to)

    if (error) {
      throw new Error(error.message)
    }

    return data
  } else {
    const { data, error } = await supabase
      .from('movies')
      .select('*')
      .order('created_at', { ascending: false })
      .range(from, to)

    if (error) {
      throw new Error(error.message)
    }

    return data
  }
}

export async function getTotalPagesFromMovies(
  _key: string,
  searchWord?: string
) {
  let pags

  if (searchWord) {
    const { data, error } = await supabase
      .from('movies')
      .select('id, title', { count: 'exact' })
      .ilike('title', `%${searchWord}%`)

    if (error) {
      throw new Error(error.message)
    }
    pags = Number(data?.length) > 6 ? Math.round(Number(data?.length) / 6) : 1
  } else {
    const { data, error } = await supabase
      .from('movies')
      .select('id', { count: 'exact' })

    if (error) {
      throw new Error(error.message)
    }

    pags = Number(data?.length) > 6 ? Math.round(Number(data?.length) / 6) : 1
  }

  return pags
}
