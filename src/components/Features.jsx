import { motion } from "framer-motion";
import { useRef, useState } from "react";
import "../styles/Features.css";

const features = [
  {
    title: "Role-Based Access",
    description: "Secure authentication with separate portals for citizens, admins, and workers",
    icon: "🔐",
  },
  {
    title: "Duplicate Prevention",
    description: "Intelligent system prevents duplicate complaints for the same issue",
    icon: "🔄",
  },
  {
    title: "Real-Time Tracking",
    description: "Track complaint status in real-time from filing to resolution",
    icon: "📍",
  },
  {
    title: "SMS & Email Alerts",
    description: "Instant notifications keep citizens updated on their issues",
    icon: "📧",
  },
  {
    title: "Transparency Dashboard",
    description: "Full visibility into municipal issue handling and performance metrics",
    icon: "📊",
  },
  {
    title: "Location Tagging",
    description: "GPS-based issue reporting ensures accurate problem identification",
    icon: "🗺️",
  },
];

export default function Features() {
  const scrollRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  return (
    <section className="features-section">
      <div className="container">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Platform Features</h2>
          <p style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 50px", color: "#475569" }}>
            Built with cutting-edge technology to deliver exceptional citizen services
          </p>
        </motion.div>

        <div
          className={`features-carousel-wrapper ${isHovering ? "paused" : ""}`}
          ref={scrollRef}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="features-carousel-track">
            {/* First Set */}
            {features.map((feature, index) => (
              <div key={`first-${index}`} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <div className="feature-content">
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
            {/* Duplicate Set for Seamless Loop */}
            {features.map((feature, index) => (
              <div key={`second-${index}`} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <div className="feature-content">
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
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