import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-secondary text-white py-6 text-center">
      <div className="container mx-auto">
        <p className="text-gray-100">
          Made with ❤️ by{" "}
          <Link to="/" className="font-semibold">
            <span className="text-white">Link</span>
            <span className="text-accent">Bite</span>
          </Link>
        </p>
        <p className="mt-2 text-sm text-gray-200">
          Simple, fast, and reliable URL shortening.
        </p>
        <p className="mt-4 text-gray-300 text-xs">
          © {new Date().getFullYear()} LinkBite. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
