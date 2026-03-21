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

export const createIssue = async (req,res)=>{

try{

const bucket = new mongoose.mongo.GridFSBucket(
mongoose.connection.db,
{ bucketName:"uploads" }
);

let photoId = null;

if(req.file){

const uploadStream = bucket.openUploadStream(req.file.originalname);

uploadStream.end(req.file.buffer);

photoId = uploadStream.id;

}

const type = req.params.type;

const data = {

userId:req.body.userId,
street:req.body.street,
pipeline:req.body.pipeline,
pole:req.body.pole,
houseNo:req.body.houseNo,
description:req.body.description,

photoId,

date:req.body.date,
time:req.body.time,
status:"Pending"

};

let issue;

if(type==="electricity"){
issue = new Electricity(data);
}

if(type==="water"){
issue = new Water(data);
}

if(type==="garbage"){
issue = new Garbage(data);
}

if(type==="drainage"){
issue = new Drainage(data);
}

await issue.save();

res.json({message:"Issue submitted successfully"});

}catch(error){

console.log(error);
res.status(500).json({message:"Server error"});

}

};


/* ========================
GET ELECTRICITY ISSUES
======================== */

export const getElectricityIssues = async (req,res)=>{

try{

const issues = await Electricity.find().sort({date:-1});

const result = await Promise.all(

issues.map(async(issue)=>{

const user = await User.findById(issue.userId);

return {

...issue._doc,
villagerName: user ? user.name : "Unknown",
aadhar: user ? user.aadhar : "N/A"

};

})

);

res.json(result);

}catch(err){

console.log(err);
res.status(500).json({message:"Server error"});

}

};


/* ========================
GET WATER ISSUES
======================== */

export const getWaterIssues = async (req,res)=>{

try{

const issues = await Water.find().sort({date:-1});

const result = await Promise.all(

issues.map(async(issue)=>{

const user = await User.findById(issue.userId);

return {

...issue._doc,
villagerName: user ? user.name : "Unknown",
aadhar: user ? user.aadhar : "N/A"

};

})

);

res.json(result);

}catch(err){

console.log(err);
res.status(500).json({message:"Server error"});

}

};


/* ========================
GET GARBAGE ISSUES
======================== */

export const getGarbageIssues = async (req,res)=>{

try{

const issues = await Garbage.find().sort({date:-1});

const result = await Promise.all(

issues.map(async(issue)=>{

const user = await User.findById(issue.userId);

return {

...issue._doc,
villagerName: user ? user.name : "Unknown",
aadhar: user ? user.aadhar : "N/A"

};

})

);

res.json(result);

}catch(err){

console.log(err);
res.status(500).json({message:"Server error"});

}

};


/* ========================
GET DRAINAGE ISSUES
======================== */

export const getDrainageIssues = async (req,res)=>{

try{

const issues = await Drainage.find().sort({date:-1});

const result = await Promise.all(

issues.map(async(issue)=>{

const user = await User.findById(issue.userId);

return {

...issue._doc,
villagerName: user ? user.name : "Unknown",
aadhar: user ? user.aadhar : "N/A"

};

})

);

res.json(result);

}catch(err){

console.log(err);
res.status(500).json({message:"Server error"});

}

};


/* ========================
UPDATE ISSUE STATUS
======================== */

export const updateIssueStatus = async (req,res)=>{

try{

const {type,id} = req.params;

const {status,reason,deadline} = req.body;

let Model;

if(type==="electricity") Model = Electricity;
if(type==="water") Model = Water;
if(type==="garbage") Model = Garbage;
if(type==="drainage") Model = Drainage;

let updateData = { status };

if(deadline){
updateData.deadline = deadline;
}

if(status === "Rejected"){
updateData.reason = reason;
}

await Model.findByIdAndUpdate(id,updateData);

// Send email if status is Assigned, Rejected, or Resolved
let emailSent = false;
if (status === "Assigned" || status === "Rejected" || status === "Resolved") {
  const issue = await Model.findById(id);
  const user = await User.findById(issue.userId);
  if (user && user.email) {
    let subject, body;
    if (status === "Assigned") {
      subject = "Your Issue Has Been Accepted";
      body = `
Dear ${user.name},

Your issue has been accepted.

Issue Details:
- Category: ${type}
- Street: ${issue.street}
- House No: ${issue.houseNo || 'N/A'}
- Description: ${issue.description}
- Date: ${issue.date}
- Time: ${issue.time}
- Deadline: ${deadline}

Thank you for using FixMyVillage.

Best regards,
Admin Team
      `;
    } else if (status === "Rejected") {
      subject = "Your Issue Has Been Rejected";
      body = `
Dear ${user.name},

Your issue has been rejected.

Issue Details:
- Category: ${type}
- Street: ${issue.street}
- House No: ${issue.houseNo || 'N/A'}
- Description: ${issue.description}
- Date: ${issue.date}
- Time: ${issue.time}
- Reason: ${reason}

Thank you for using FixMyVillage.

Best regards,
Admin Team
      `;
    } else if (status === "Resolved") {
      subject = "Your Issue Has Been Resolved";
      body = `
Dear ${user.name},

Your issue has been resolved.

Issue Details:
- Category: ${type}
- Street: ${issue.street}
- House No: ${issue.houseNo || 'N/A'}
- Description: ${issue.description}
- Date: ${issue.date}
- Time: ${issue.time}

Thank you for using FixMyVillage.

Best regards,
Worker Team
      `;
    }

    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: subject,
        text: body
      });
      emailSent = true;
    } catch (emailError) {
      console.log('Email send error:', emailError);
    }
  }
}

res.json({message:"Status updated successfully", emailSent});

}catch(err){

console.log(err);
res.status(500).json({message:"Server error"});

}

};