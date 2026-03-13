import express from "express";
import upload from "../middleware/upload.js";

import {
createIssue,
getElectricityIssues,
getWaterIssues,
getGarbageIssues,
getDrainageIssues,
updateIssueStatus
} from "../controllers/issueController.js";

const router = express.Router();

/* CREATE ISSUE */

router.post("/:type", upload.single("photo"), createIssue);

/* GET ISSUES */

router.get("/electricity", getElectricityIssues);
router.get("/water", getWaterIssues);
router.get("/garbage", getGarbageIssues);
router.get("/drainage", getDrainageIssues);
router.put("/status/:type/:id", updateIssueStatus);

export default router;