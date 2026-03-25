import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,           // ✅ FIXED
  secure: false,       // ✅ FIXED
  family: 4,           // ✅ FORCE IPv4 (VERY IMPORTANT)
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export default transporter;