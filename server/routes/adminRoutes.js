import express from "express";
import { getRequests, approveUser, rejectUser } from "../controllers/adminController.js";

const router = express.Router();

router.get("/requests", getRequests);

router.put("/approve/:id", approveUser);

router.put("/reject/:id", rejectUser);

export default router;