import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/Navbar.css";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll_to_section = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="container">
        <div className="navbar-content">
          <a href="#" className="navbar-logo" onClick={(e) => handleScroll_to_section(e, "hero")}>
            🏘️ FixMyVillage
          </a>
          <div className="navbar-links">
            <a href="#" onClick={(e) => handleScroll_to_section(e, "how-it-works")}>How It Works</a>
            <a href="#" onClick={(e) => handleScroll_to_section(e, "features")}>Features</a>
            <div className="navbar-auth-buttons">
              <Link to="/login">
                <button className="navbar-login-btn">Login</button>
              </Link>
              <Link to="/signup">
                <button className="navbar-login-btn">Signup</button>
              </Link>
              
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}