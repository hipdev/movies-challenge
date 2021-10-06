import MoviesList from "components/Home/MoviesList";
import Layout from "components/Layout/Layout";
import { getMovies } from "lib/queries/movies";
import useSWR from "swr";

export default function Index() {
  const { data } = useSWR("getMovies", getMovies, { revalidateOnFocus: false });

  return (
    <Layout>
      <MoviesList movies={data} />
    </Layout>
  );
}
