import mongoose from "mongoose";

const drainageSchema = new mongoose.Schema({

userId:String,
street:String,
houseNo:String,
description:String,

photoId: mongoose.Schema.Types.ObjectId,

date:String,
time:String,

status:{
type:String,
default:"Pending"
},
deadline:{
type:String
},

reason:{
type:String
}

});

export default mongoose.model("DrainageIssue",drainageSchema);
