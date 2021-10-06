import { Container } from "@mui/material";
import Header from "components/Layout/Header";
import Head from "next/head";
import Footer from "./Footer";

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Head>
        <title>Movify - Challenge</title>
      </Head>
      <Header />
      <Container>{children}</Container>
      <Footer />
    </>
  );
};

export default Layout;
