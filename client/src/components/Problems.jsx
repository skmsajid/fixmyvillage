import { motion } from "framer-motion";
import { useRef, useState } from "react";
import "../styles/Problems.css";

const problems = [
  {
    title: "Street Light Failure",
    description: "Track and resolve non-functional street lights affecting safety",
    icon: "💡",
  },
  {
    title: "Drainage Overflow",
    description: "Monitor drainage systems and prevent waterlogging issues",
    icon: "💧",
  },
  {
    title: "Water Supply Issues",
    description: "Report irregular water supply and get reliable service",
    icon: "🚰",
  },
  {
    title: "Sanitation Concerns",
    description: "Ensure clean public spaces with waste management tracking",
    icon: "🧹",
  },
  {
    title: "Road Damage",
    description: "Report potholes and road maintenance needs immediately",
    icon: "🛣️",
  },
];

export default function Problems() {
  const scrollRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  return (
    <section className="problems-section">
      <div className="container">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
            Common Village Issues
          </h2>
          <p style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 50px", color: "#475569" }}>
            We address the most pressing civic issues affecting communities daily
          </p>
        </motion.div>

        <div
          className={`problems-carousel-wrapper ${isHovering ? "paused" : ""}`}
          ref={scrollRef}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="problems-carousel-track">
            {/* First Set */}
            {problems.map((item, index) => (
              <div key={`first-${index}`} className="problem-card">
                <div className="problem-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
            {/* Duplicate Set for Seamless Loop */}
            {problems.map((item, index) => (
              <div key={`second-${index}`} className="problem-card">
                <div className="problem-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
          {/* Gradient Masks */}
          <div className="carousel-fade-left"></div>
          <div className="carousel-fade-right"></div>
        </div>
      </div>
    </section>
  );
}