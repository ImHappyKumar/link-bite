import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
  useMatch,
} from "react-router-dom";
import Home from "./pages/Home";
import Analytics from "./pages/Analytics";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Redirect from "./pages/Redirect";

function App() {
  const ScrollToTop = () => {
    const { pathname, key } = useLocation();
    const navigate = useNavigate();
    const match = useMatch(pathname);

    useEffect(() => {
      if (!match) {
        navigate(pathname);
      } else {
        window.scrollTo({ top: 0, behavior: "instant" });
      }
    }, [pathname, key, match, navigate]);

    return null;
  };

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/:shortCode" element={<Redirect />} />
      </Routes>
    </Router>
  );
}

export default App;
