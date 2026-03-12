import mongoose from "mongoose";

const waterSchema = new mongoose.Schema({

userId:String,
street:String,
pipeline:String,
houseNo:String,
description:String,

photoId: mongoose.Schema.Types.ObjectId,

date:String,
time:String,

status:{
type:String,
default:"Pending"
}

});

export default mongoose.model("WaterIssue",waterSchema);
