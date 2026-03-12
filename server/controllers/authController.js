import User from "../models/User.js";


/* =========================
   LOGIN USER
========================= */

export const loginUser = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found"
      });
    }

    if (user.password !== password) {
      return res.status(400).json({
        message: "Invalid password"
      });
    }

    // villager status checks
    if (user.role === "villager") {

      if (user.status === "pending") {
        return res.status(403).json({
          message: "Your account is waiting for admin approval."
        });
      }

      if (user.status === "rejected") {
        return res.status(403).json({
          message: "Your signup request was rejected by admin. Please register again."
        });
      }

    }

    res.status(200).json({
      message: "Login successful",
      role: user.role,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error"
    });

  }

};



/* =========================
   REGISTER USER (Villager)
========================= */

export const registerUser = async (req, res) => {

  try {

    const { name, email, aadhar, password } = req.body;

    // check if email exists
    const emailUser = await User.findOne({ email });

    if (emailUser) {

      // if pending
      if (emailUser.status === "pending") {
        return res.status(400).json({
          message: "Your signup request is already pending admin approval."
        });
      }

      // if approved
      if (emailUser.status === "approved") {
        return res.status(400).json({
          message: "Email already registered."
        });
      }

      // if rejected -> delete old record and allow new signup
      if (emailUser.status === "rejected") {
        await User.deleteOne({ email });
      }
    }


    // check aadhaar
    const aadharUser = await User.findOne({ aadhar });

    if (aadharUser) {

      if (aadharUser.status === "pending") {
        return res.status(400).json({
          message: "Your signup request is already pending admin approval."
        });
      }

      if (aadharUser.status === "approved") {
        return res.status(400).json({
          message: "Aadhaar already registered."
        });
      }

      if (aadharUser.status === "rejected") {
        await User.deleteOne({ aadhar });
      }
    }


    const newUser = new User({
      name,
      email,
      aadhar,
      password,
      role: "villager",
      status: "pending"
    });

    await newUser.save();

    res.status(201).json({
      message: "Signup request sent to admin for approval"
    });

  } catch (error) {

    console.error("Signup Error:", error);

    res.status(500).json({
      message: "Server error"
    });

  }

};