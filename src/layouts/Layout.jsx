import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container flex-1 bg-background">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
