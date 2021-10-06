import { Container } from '@mui/material'
import Header from 'components/Layout/Header'
import Head from 'next/head'
import { ReactNode } from 'react'
import Footer from './Footer'

const Layout = ({
  children,
  searchWord,
}: {
  searchWord?: string | string[] | undefined
  children: ReactNode
}) => {
  return (
    <>
      <Head>
        <title>Movify - Challenge</title>
      </Head>
      <Header searchWord={searchWord} />
      <Container>{children}</Container>
      <Footer />
    </>
  )
}

export default Layout
