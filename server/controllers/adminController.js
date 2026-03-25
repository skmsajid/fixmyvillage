import User from "../models/User.js";
import { sendMail } from "../utils/sendMail.js";


export const getRequests = async (req,res)=>{

  const requests = await User.find({
    role:"villager",
    status:"pending"
  });

  res.json(requests);

};



export const approveUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, emailSent: false });
    }

    // ✅ update status
    user.status = "approved";
    await user.save();

    // 📧 EMAIL CONTENT
    const html = `
      <h2>✅ Registration Approved</h2>
      <p>Hello <b>${user.name}</b>,</p>
      <p>Your FixMyVillage account has been approved.</p>
    `;

    let emailSent = false;

    try {
      await sendMail({
        to: user.email,
        subject: "FixMyVillage - Approval",
        html
      });
      emailSent = true;
    } catch (err) {
      console.error("Mail error:", err);
      emailSent = false;
    }

    // ✅ ALWAYS SEND RESPONSE
    res.json({
      success: true,
      emailSent
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, emailSent: false });
  }
};

export const rejectUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, emailSent: false });
    }

    const html = `
      <h2>❌ Registration Rejected</h2>
      <p>Hello <b>${user.name}</b>,</p>
      <p>Your FixMyVillage registration request has been rejected.</p>
    `;

    let emailSent = false;

    try {
      await sendMail({
        to: user.email,
        subject: "FixMyVillage - Rejected",
        html
      });
      emailSent = true;
    } catch (err) {
      console.error("Mail error:", err);
      emailSent = false;
    }

    // delete user anyway ✅
    await User.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      emailSent
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, emailSent: false });
  }
};