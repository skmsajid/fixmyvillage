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
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // ✅ Update DB first
    user.status = "approved";
    await user.save();

    // ⚡ Respond INSTANTLY — do not wait for email
    res.json({ success: true, message: "Request Approved" });

    // 📧 Send email in background (non-blocking)
    setImmediate(async () => {
      try {
        const html = `
  <h2>✅ Registration Approved</h2>
  <p>Hello <b>${user.name}</b>,</p>
  <p>Your FixMyVillage account has been approved.</p>
  <h3>🔐 Your Credentials:</h3>
  <ul>
    <li><b>Name:</b> ${user.name}</li>
    <li><b>Email:</b> ${user.email}</li>
    <li><b>Aadhar:</b> ${user.aadhar}</li>
    <li><b>Password:</b> ${user.password}</li>
  </ul>
  <p>You can now login to the system.</p>
`;
        await sendMail({ to: user.email, subject: "FixMyVillage - Approval", html });
      } catch (err) {
        console.error("Approve mail error:", err);
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const rejectUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Store name/email before delete
    const { name, email } = user;

    // ✅ Delete user first
    await User.findByIdAndDelete(req.params.id);

    // ⚡ Respond INSTANTLY
    res.json({ success: true, message: "Request Rejected" });

    // 📧 Send email in background (non-blocking)
    setImmediate(async () => {
      try {
        const html = `
  <h2>❌ Registration Rejected</h2>
  <p>Hello <b>${name}</b>,</p>
  <p>Your FixMyVillage registration request has been rejected.</p>
  <p><b>Reason:</b> Verification failed / invalid details.</p>
  <p>Please register again or contact admin.</p>
`;
        await sendMail({ to: email, subject: "FixMyVillage - Rejected", html });
      } catch (err) {
        console.error("Reject mail error:", err);
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};