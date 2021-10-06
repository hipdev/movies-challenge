import { Container, Pagination } from '@mui/material'
import MoviesList from 'components/Home/MoviesList'
import Layout from 'components/Layout/Layout'
import { getTotalPagesFromMovies } from 'lib/queries/movies'
import { useRouter } from 'next/router'
import { ChangeEvent, useState } from 'react'
import useSWR from 'swr'

export default function SearchPage() {
  const router = useRouter()
  const [page, setPage] = useState(1)
  const { data: totalPags } = useSWR(
    ['getTotalPagesFromMovies', router.query.query],
    getTotalPagesFromMovies,
    {
      revalidateOnFocus: false,
    }
  )

  const handleMoviesPagination = (
    _event: ChangeEvent<unknown>,
    pageNumber: number
  ) => {
    setPage(pageNumber)
  }

  return (
    <Layout searchWord={router.query.query}>
      <MoviesList page={page} searchWord={router.query.query} />
      <Container maxWidth="sm">
        <Pagination
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '2rem',
          }}
          count={totalPags}
          color="primary"
          page={page == 0 ? 1 : page}
          onChange={handleMoviesPagination}
        />
      </Container>
    </Layout>
  )
}
