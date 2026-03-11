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

    // villager must be approved
    if (user.role === "villager" && user.status !== "approved") {
      return res.status(403).json({
        message: "Your account is pending admin approval"
      });
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

    // check if email already exists
    const emailUser = await User.findOne({ email });

    if (emailUser) {

      if (emailUser.status === "pending") {
        return res.status(400).json({
          message: "Your request is already pending. Please wait for admin approval."
        });
      }

      return res.status(400).json({
        message: "Email already registered"
      });

    }


    // check if aadhaar already exists
    const aadharUser = await User.findOne({ aadhar });

    if (aadharUser) {

      if (aadharUser.status === "pending") {
        return res.status(400).json({
          message: "Your request is already pending. Please wait for admin approval."
        });
      }

      return res.status(400).json({
        message: "Aadhaar already registered"
      });

    }


    // create new user
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