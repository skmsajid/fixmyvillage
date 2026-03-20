import { Link } from "react-router-dom";
import { useState } from "react";
import "../styles/Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClose = () => setMenuOpen(false);

  // 🔥 Scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    handleClose();
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">

        {/* Logo */}
        <div className="navbar-logo" onClick={scrollToTop}>
          🏘️ FixMyVillage
        </div>

        {/* Hamburger */}
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span className={menuOpen ? "line open" : "line"}></span>
          <span className={menuOpen ? "line open" : "line"}></span>
          <span className={menuOpen ? "line open" : "line"}></span>
        </div>

        {/* Links */}
        <div className={`navbar-links ${menuOpen ? "active" : ""}`}>
          <a href="#how-it-works" onClick={handleClose}>How It Works</a>
          <a href="#features" onClick={handleClose}>Features</a>
          <Link to="/login" onClick={handleClose}>Login</Link>
          <Link to="/signup" onClick={handleClose}>Signup</Link>
        </div>

      </div>
    </nav>
  );
}