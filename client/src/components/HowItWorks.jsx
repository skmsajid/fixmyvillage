import { motion } from "framer-motion";
import "../styles/HowItWorks.css";

const steps = [
  {
    number: 1,
    title: "Citizen Reports Issue",
    description: "Users submit detailed reports with photos and location data of civic issues",
    icon: "📱",
  },
  {
    number: 2,
    title: "Admin Assigns Worker",
    description: "Municipal administrators verify and assign tasks to field workers",
    icon: "👨‍💼",
  },
  {
    number: 3,
    title: "Worker Resolves & Uploads Proof",
    description: "Workers fix the issue and submit completion proof with documentation",
    icon: "✅",
  },
];

export default function HowItWorks() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <section className="how-it-works-section">
      <div className="container">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>How It Works</h2>
          <p style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 60px", color: "#475569" }}>
            A seamless three-step process to deliver solutions to your community
          </p>
        </motion.div>

        <motion.div
          className="timeline-container"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {steps.map((step, index) => (
            <motion.div key={index} className="timeline-item" variants={itemVariants}>
              <div className="timeline-step">
                <span>{step.icon}</span>
              </div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Animated Counter Stats */}
        <motion.div
          className="stats-container"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="stat-item"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="stat-value">48 Hrs</h3>
            <p className="stat-label">Average Time to Resolution</p>
          </motion.div>
          <motion.div
            className="stat-item"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="stat-value">100%</h3>
            <p className="stat-label">Transparency Guaranteed</p>
          </motion.div>
          <motion.div
            className="stat-item"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="stat-value">Zero Cost</h3>
            <p className="stat-label">Free for All Citizens</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}