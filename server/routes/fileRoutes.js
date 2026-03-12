import express from "express";
import mongoose from "mongoose";

const router = express.Router();

router.get("/:id", async (req,res)=>{

const bucket = new mongoose.mongo.GridFSBucket(
mongoose.connection.db,
{ bucketName:"uploads" }
);

const fileId = new mongoose.Types.ObjectId(req.params.id);

bucket.openDownloadStream(fileId).pipe(res);

});

export default router;
