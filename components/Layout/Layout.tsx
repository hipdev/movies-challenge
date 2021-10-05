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
      {children}
      <Footer />
    </>
  );
};

export default Layout;
