import Header from "components/Layout/Header";
import Footer from "./Footer";

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
