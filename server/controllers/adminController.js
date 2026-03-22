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
      return res.status(404).json({ emailSent: false });
    }

    // ✅ update status
    user.status = "approved";
    await user.save();

    // 📧 EMAIL CONTENT
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

    const emailSent = await sendMail({
      to: user.email,
      subject: "FixMyVillage - Approval",
      html
    });

    res.json({ emailSent });

  } catch (err) {
    console.error(err);
    res.status(500).json({ emailSent: false });
  }
};


export const rejectUser = async (req, res) => {

  try {

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ emailSent: false });
    }

    const html = `
      <h2>❌ Registration Rejected</h2>
      <p>Hello <b>${user.name}</b>,</p>

      <p>Your FixMyVillage registration request has been rejected.</p>

      <p>Please register again or contact admin.</p>
    `;

    const emailSent = await sendMail({
      to: user.email,
      subject: "FixMyVillage - Rejected",
      html
    });

    // delete user
    await User.findByIdAndDelete(req.params.id);

    res.json({ emailSent });

  } catch (err) {
    console.error(err);
    res.status(500).json({ emailSent: false });
  }
};