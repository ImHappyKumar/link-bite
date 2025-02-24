import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <nav className="bg-dark text-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center px-6 py-3">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold tracking-wide">
            <span className="text-white">Link</span>
            <span className="text-accent">Bite</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex text-lg">
            <NavItem to="/" label="Home" />
            <NavItem to="/about" label="About" />
            <NavItem to="/analytics" label="Analytics" />
            <NavItem to="/contact" label="Contact" />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-3xl focus:outline-none"
            onClick={() => setMenuOpen(true)}
          >
            <FiMenu />
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-dark text-white transform ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out shadow-lg md:hidden z-50`}
      >
        {/* Close Button */}
        <div className="p-5 flex justify-end">
          <button
            className="text-3xl focus:outline-none"
            onClick={() => setMenuOpen(false)}
          >
            <FiX />
          </button>
        </div>

        {/* Mobile Links */}
        <div className="flex flex-col items-start text-lg mt-6 px-6">
          <NavItem to="/" label="Home" onClick={() => setMenuOpen(false)} />
          <NavItem
            to="/about"
            label="About"
            onClick={() => setMenuOpen(false)}
          />
          <NavItem
            to="/analytics"
            label="Analytics"
            onClick={() => setMenuOpen(false)}
          />
          <NavItem
            to="/contact"
            label="Contact"
            onClick={() => setMenuOpen(false)}
          />
        </div>
      </div>

      {/* Overlay (Click outside to close) */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-tranparent bg-opacity-40 md:hidden z-40"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}
    </>
  );
};

// Reusable Navigation Item Component
const NavItem = ({ to, label, onClick }) => (
  <Link
    to={to}
    className="hover:text-gray-300 transition duration-300 font-medium block px-4 py-2"
    onClick={onClick}
  >
    {label}
  </Link>
);

export default Navbar;
