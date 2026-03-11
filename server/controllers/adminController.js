import User from "../models/User.js";


export const getRequests = async (req,res)=>{

  const requests = await User.find({
    role:"villager",
    status:"pending"
  });

  res.json(requests);

};


export const approveUser = async (req,res)=>{

  await User.findByIdAndUpdate(req.params.id,{
    status:"approved"
  });

  res.json({message:"User approved"});

};


export const rejectUser = async (req,res)=>{

  await User.findByIdAndUpdate(req.params.id,{
    status:"rejected"
  });

  res.json({message:"User rejected"});

};