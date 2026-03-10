import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();

// Connect to database
connectDB().catch((error) => {
  console.error("Failed to connect to database:", error.message);
  process.exit(1);
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("FixMyVillage API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});