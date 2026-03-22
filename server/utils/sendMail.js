import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendMail = async ({ to, subject, html }) => {
  try {
    await transporter.sendMail({
      from: `"FixMyVillage" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html
    });

    return true;
  } catch (err) {
    console.error("Mail Error:", err);
    return false;
  }
};