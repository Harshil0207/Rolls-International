import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import nodemailer from "nodemailer";
import crypto from "crypto";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Route for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User doesn't exists" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = createToken(user._id);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Route for user register
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // checking user already exists or not
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    // validating email format & strong password
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }
  
    // hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    const token = createToken(user._id);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Route for admin login
// const adminLogin = async (req, res) => {
//     try {

//         const {email,password} = req.body

//         if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
//             const token = jwt.sign(email+password,process.env.JWT_SECRET);
//             res.json({success:true,token})
//         } else {
//             res.json({success:false,message:"Invalid credentials"})
//         }

//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message })
//     }
// }

//////////////////////////////////

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const subscribe = async (req, res) => {
  const { email } = req.body;

  // Validate email format
  if (!validator.isEmail(email)) {
    return res.status(400).send("Please enter a valid email.");
  }

  try {
    // Check if the email exists in the user database
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).send("Email not associated with any registered user.");
    }

    // Save the email to the subscription database
    const newEmail = new emailModel({ email }); // Assuming emailModel is the subscription model
    await newEmail.save();

    res.status(201).send("Subscribed successfully!");
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).send("Email already subscribed.");
    } else {
      res.status(500).send("An error occurred. Please try again.");
    }
  }
};

const sendEmail = async ({ to, subject, html }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: /*process.env.EMAIL*/"harshilgohil2703@gmail.com",
        pass: /*process.env.PASSWORD*/"ncrk sksz fiwq eqck",
      },
    });

    const mailOptions = {
      from: /*process.env.EMAIL*/ "harshilgohil2703@gmail.com",
      to,
      subject,
      html,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error in sendEmail:", error.message);
    throw new Error("Failed to send email");
  }
}; 
// const forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;

//     // Validate email format
//     if (!validator.isEmail(email)) {
//       return res.status(400).json({ message: "Invalid email format" });
//     }

//     // Check if the user exists
//     const user = await userModel.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "User not found" });
//     }

//     // Generate a password reset token
//     const resetToken = crypto.randomBytes(32).toString("hex");
//     user.resetPasswordToken = resetToken;
//     user.resetPasswordExpires = Date.now() + 3600000; // Token valid for 1 hour
//     await user.save();

//     // Email content
//     const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
//     const subject = "Password Reset Request";
//     const html = `
//       <p>You requested a password reset.</p>
//       <p>Click the link below to reset your password:</p>
//       <a href="${resetUrl}">${resetUrl}</a>
//       <p>If you did not request this, please ignore this email.</p>
//     `;

//     // Send email
//     await sendEmail({
//       to: email,
//       subject: subject,
//       html: html,
//     });

//     res.status(200).json({ message: "Password reset email sent successfully" });
//   } catch (error) {
//     console.error("Error in forgotPassword:", error.message);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate email format
    if (!email || !validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email format" });
    }

    // Check if the user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Generate OTP and set expiration
    const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
    user.resetPasswordToken = otp.toString();
    user.resetPasswordExpires = Date.now() + 5 * 60 * 1000; // 5 minutes
    await user.save();

    // Send OTP via email
    const subject = "Password Reset OTP";
    const html = `
      <p>You requested a password reset.</p>
      <p>Your OTP is: <strong>${otp}</strong></p>
      <p>This OTP is valid for 5 minutes.</p>
    `;

    await sendEmail({
      to: email,
      subject,
      html,
    });

    res.status(200).json({ success: true, message: "OTP sent to email successfully" });
  } catch (error) {
    console.error("Error in forgotPassword:", error.message);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    // Validate inputs
    if (!email || !otp || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Email, OTP, and new password are required",
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }

    // Find the user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Check if OTP is valid and not expired
    if (
      !user.resetPasswordToken ||
      user.resetPasswordToken !== otp ||
      user.resetPasswordExpires < Date.now()
    ) {
      return res.status(401).json({ success: false, message: "Invalid or expired OTP" });
    }

    // Hash the new password and save it
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    // Clear OTP fields
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password has been reset successfully",
    });
  } catch (error) {
    console.error("Reset password error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export { loginUser, registerUser, adminLogin, subscribe ,resetPassword,forgotPassword};
