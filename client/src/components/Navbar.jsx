import { Link } from "react-router-dom";
import { useState } from "react";
import "../styles/Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-content">

        <div className="navbar-logo">
          🏘️ FixMyVillage
        </div>

        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>

        <div className={`navbar-links ${menuOpen ? "active" : ""}`}>
          <a href="#how-it-works" className="nav-btn">How It Works</a>
          <a href="#features" className="nav-btn">Features</a>
          <Link to="/login" className="nav-btn">Login</Link>
          <Link to="/signup" className="nav-btn">Signup</Link>
        </div>

      </div>
    </nav>
  );
}