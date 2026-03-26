import mongoose from "mongoose";

import Electricity from "../models/issues/ElectricityIssue.js";
import Water from "../models/issues/WaterIssue.js";
import Garbage from "../models/issues/GarbageIssue.js";
import Drainage from "../models/issues/DrainageIssue.js";
import User from "../models/User.js";
import transporter from "../config/email.js";

/* ========================
CREATE ISSUE
======================== */

export const createIssue = async (req, res) => {

  try {

    const bucket = new mongoose.mongo.GridFSBucket(
      mongoose.connection.db,
      { bucketName: "uploads" }
    );

    let photoId = null;

    if (req.file) {

      const uploadStream = bucket.openUploadStream(req.file.originalname);

      uploadStream.end(req.file.buffer);

      photoId = uploadStream.id;

    }

    const type = req.params.type;

    const data = {

      userId: req.body.userId,
      street: req.body.street,
      pipeline: req.body.pipeline,
      pole: req.body.pole,
      houseNo: req.body.houseNo,
      description: req.body.description,

      photoId,

      date: req.body.date,
      time: req.body.time,
      status: "Pending"

    };

    let issue;

    if (type === "electricity") {
      issue = new Electricity(data);
    }

    if (type === "water") {
      issue = new Water(data);
    }

    if (type === "garbage") {
      issue = new Garbage(data);
    }

    if (type === "drainage") {
      issue = new Drainage(data);
    }

    await issue.save();

    res.json({ message: "Issue submitted successfully" });

  } catch (error) {

    console.log(error);
    res.status(500).json({ message: "Server error" });

  }

};


/* ========================
GET ELECTRICITY ISSUES
======================== */

export const getElectricityIssues = async (req, res) => {

  try {

    const issues = await Electricity.find().sort({ date: -1 });

    const result = await Promise.all(

      issues.map(async (issue) => {

        const user = await User.findById(issue.userId);

        return {

          ...issue._doc,
          villagerName: user ? user.name : "Unknown",
          aadhar: user ? user.aadhar : "N/A"

        };

      })

    );

    res.json(result);

  } catch (err) {

    console.log(err);
    res.status(500).json({ message: "Server error" });

  }

};


/* ========================
GET WATER ISSUES
======================== */

export const getWaterIssues = async (req, res) => {

  try {

    const issues = await Water.find().sort({ date: -1 });

    const result = await Promise.all(

      issues.map(async (issue) => {

        const user = await User.findById(issue.userId);

        return {

          ...issue._doc,
          villagerName: user ? user.name : "Unknown",
          aadhar: user ? user.aadhar : "N/A"

        };

      })

    );

    res.json(result);

  } catch (err) {

    console.log(err);
    res.status(500).json({ message: "Server error" });

  }

};


/* ========================
GET GARBAGE ISSUES
======================== */

export const getGarbageIssues = async (req, res) => {

  try {

    const issues = await Garbage.find().sort({ date: -1 });

    const result = await Promise.all(

      issues.map(async (issue) => {

        const user = await User.findById(issue.userId);

        return {

          ...issue._doc,
          villagerName: user ? user.name : "Unknown",
          aadhar: user ? user.aadhar : "N/A"

        };

      })

    );

    res.json(result);

  } catch (err) {

    console.log(err);
    res.status(500).json({ message: "Server error" });

  }

};


/* ========================
GET DRAINAGE ISSUES
======================== */

export const getDrainageIssues = async (req, res) => {

  try {

    const issues = await Drainage.find().sort({ date: -1 });

    const result = await Promise.all(

      issues.map(async (issue) => {

        const user = await User.findById(issue.userId);

        return {

          ...issue._doc,
          villagerName: user ? user.name : "Unknown",
          aadhar: user ? user.aadhar : "N/A"

        };

      })

    );

    res.json(result);

  } catch (err) {

    console.log(err);
    res.status(500).json({ message: "Server error" });

  }

};


/* ========================
UPDATE ISSUE STATUS
======================== */

export const updateIssueStatus = async (req, res) => {
  try {
    const { type, id } = req.params;
    const { status, reason, deadline } = req.body;

    let Model;
    if (type === "electricity") Model = Electricity;
    if (type === "water") Model = Water;
    if (type === "garbage") Model = Garbage;
    if (type === "drainage") Model = Drainage;

    let updateData = { status };
    if (deadline) updateData.deadline = deadline;
    if (status === "Rejected") updateData.reason = reason;

    // ✅ Update DB
    await Model.findByIdAndUpdate(id, updateData);

    // ⚡ Respond INSTANTLY — no email wait
    res.json({ success: true, message: "Status updated" });

    // 📧 Send email in background (non-blocking)
    setImmediate(async () => {
      try {
        const issue = await Model.findById(id);
        const user = await User.findById(issue?.userId);

        if (!user?.email) return;

        let subject = "";
        let body = "";
        const name = user?.name || "User";

        if (status === "Assigned") {
          subject = "Issue Accepted";
          body = `Dear ${name},

Your reported issue has been successfully accepted by our team.

We have started working on it and assigned it to the concerned authority. The expected deadline to resolve this issue is: ${deadline}.

We appreciate your patience and cooperation. You will be notified once there are further updates.

Thank you for helping us improve your village.

Regards,  
FixMyVillage Team`;
        }

        else if (status === "Rejected") {
          subject = "Issue Rejected";
          body = `Dear ${name},

We regret to inform you that your reported issue has been reviewed and could not be approved.

Reason for rejection:
${reason}

If you believe this was a mistake or have additional details, you may raise the issue again with more information.

Thank you for your understanding.

Regards,  
FixMyVillage Team`;
        }

        else if (status === "Resolved") {
          subject = "Issue Resolved";
          body = `Dear ${name},

Good news! Your reported issue has been successfully resolved.

Our team has completed the necessary work. Please check and confirm if everything is satisfactory.

If the issue still persists, feel free to report it again.

Thank you for contributing to improving your village.

Regards,  
FixMyVillage Team`;
        }

        if (subject) {
          await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: user.email,
            subject,
            text: body
          });
        }
      } catch (err) {
        console.log("Issue mail error:", err);
      }
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};