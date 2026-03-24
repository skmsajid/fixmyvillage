import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import path from "path";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import issueRoutes from "./routes/issueRoutes.js";
import fileRoutes from "./routes/fileRoutes.js";

const app = express();

// ✅ Connect DB
connectDB().catch((error) => {
  console.error("Failed to connect to database:", error.message);
  process.exit(1);
});

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/issues", issueRoutes);
app.use("/api/files", fileRoutes);

// ===============================
// ✅ SERVE REACT BUILD (IMPORTANT)
// ===============================
const __dirname = path.resolve();

// serve static files
app.use(express.static(path.join(__dirname, "../client/dist")));

// fallback for React routing
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

// ===============================

// ✅ PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});