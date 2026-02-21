import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import "../styles/Hero.css";
import { Link } from "react-router-dom";


export default function Hero() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const floatingIcons = [
    { icon: "💡", label: "Street Light" },
    { icon: "💧", label: "Water Supply" },
    { icon: "🚗", label: "Roads" },
    { icon: "🏗️", label: "Drainage" },
    { icon: "🧹", label: "Sanitation" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="hero-section">
      <div className="hero-background">
        <div className="gradient-element gradient-1"></div>
        <div className="gradient-element gradient-2"></div>
        <div className="gradient-element gradient-3"></div>
      </div>

      {/* Floating Icons */}
      {/* Floating Icons */}
      {floatingIcons.map((item, index) => {
        // Position icons on left and right sides to avoid center content overlap
        const isLeftSide = index < 3;
        const positionIndex = isLeftSide ? index : index - 3;
        
        return (
          <motion.div
            key={index}
            className="floating-icon"
            animate={{
              y: [0, -25, 0],
              rotate: [0, 3, -3, 0],
            }}
            transition={{
              duration: 5 + index,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              top: `${20 + positionIndex * 18}%`,
              [isLeftSide ? 'left' : 'right']: '2%',
              animationDelay: `${index * 0.3}s`,
            }}
          >
            <div className="icon-container">
              <span className="icon-emoji">{item.icon}</span>
              <span className="icon-label">{item.label}</span>
            </div>
          </motion.div>
        );
      })}

      <div className="container">
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.h1 variants={itemVariants} className="hero-title">
            Turning Village Complaints Into{" "}
            <span className="text-gradient">Real Solutions</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="hero-subtitle">
            Report. Track. Resolve.
          </motion.p>

          <motion.p variants={itemVariants} className="hero-description">
            A modern civic-tech platform that empowers citizens to report issues,
            and ensures transparent accountability from your local government.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="hero-buttons"
          >
            <Link to="/signup">
              <button className="btn-primary">
                Get Started
                <span className="button-glow"></span>
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}