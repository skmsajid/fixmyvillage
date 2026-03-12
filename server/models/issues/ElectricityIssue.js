import mongoose from "mongoose";

const electricitySchema = new mongoose.Schema({

userId:String,
street:String,
pole:String,
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

export default mongoose.model("ElectricityIssue",electricitySchema);
