import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/Footer.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <footer className="footer">
      <div className="container">
        <motion.div
          className="footer-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.div className="footer-section" variants={itemVariants}>
            <h4>🏘️ FixMyVillage</h4>
            <p style={{ color: "#94A3B8", marginBottom: "20px" }}>
              A civic-tech platform empowering citizens and government to build better communities.
            </p>
          </motion.div>

          <motion.div className="footer-section" variants={itemVariants}>
            <h4>Quick Links</h4>
            <a href="#home">Home</a>
            <a href="#features">Features</a>
            <a href="#how-it-works">How It Works</a>
            <Link to="/login">Login</Link>
          </motion.div>

          <motion.div className="footer-section" variants={itemVariants}>
            <h4>Support</h4>
            <a href="#contact">Contact Us</a>
            <a href="#faq">FAQ</a>
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
          </motion.div>

          <motion.div className="footer-section" variants={itemVariants}>
            <h4>Follow Us</h4>
            <a href="#">Twitter</a>
            <a href="#">Facebook</a>
            <a href="#">Instagram</a>
            <a href="#">LinkedIn</a>
          </motion.div>
        </motion.div>

        <motion.div
          className="footer-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p>
            © {currentYear} FixMyVillage. All rights reserved. | Built with ❤️ for Better Villages
          </p>
        </motion.div>
      </div>
    </footer>
  );
}