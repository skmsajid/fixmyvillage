import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import issueRoutes from "./routes/issueRoutes.js";
import fileRoutes from "./routes/fileRoutes.js";

const app = express();

// Connect to database
connectDB().catch((error) => {
  console.error("Failed to connect to database:", error.message);
  process.exit(1);
});

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/issues", issueRoutes);
app.use("/api/files", fileRoutes);

app.get("/", (req, res) => {
  res.send("FixMyVillage API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});