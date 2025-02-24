import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex flex-col justify-center items-center flex-1 w-full bg-background">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
