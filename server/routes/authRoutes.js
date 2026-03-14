import express from "express";
import { loginUser, registerUser, getUserById } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/signup", registerUser);
router.get("/users/:id", getUserById);

export default router;