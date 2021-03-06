import Box from '@mui/material/Box'
import { Container, Grid, Skeleton, Stack, Typography } from '@mui/material'
import { Movie } from 'types/movie'
import MovieCard from './MovieCard'
import { getMovies } from 'lib/queries/movies'
import useSWR from 'swr'

const MoviesList = ({
  page,
  searchWord,
}: {
  page: number
  searchWord?: string | string[] | undefined
}) => {
  const { data: movies } = useSWR(
    ['getMovies', page, searchWord ? searchWord : null],
    getMovies,
    {
      revalidateOnFocus: false,
    }
  )

  return (
    <Container>
      <Box sx={{ flexGrow: 1 }} mt={4} mb={10}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {movies ? (
            movies.map((movie: Movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))
          ) : (
            <Grid container spacing={2} mt={3} key={1}>
              {[...Array(3)].map((_, index) => (
                <Grid
                  item
                  xs={2}
                  sm={4}
                  md={4}
                  key={index}
                  sx={{ display: 'flex' }}
                >
                  <Stack spacing={1}>
                    <Skeleton variant="rectangular" width={210} height={118} />
                    <Skeleton variant="text" />
                    <Skeleton variant="rectangular" width={210} height={50} />
                  </Stack>
                </Grid>
              ))}
            </Grid>
          )}

          {movies?.length == 0 && (
            <Container sx={{ height: '100vh' }}>
              <Typography variant="h5" gutterBottom component="div">
                No results found
              </Typography>
            </Container>
          )}
        </Grid>
      </Box>
    </Container>
  )
}
export default MoviesList
