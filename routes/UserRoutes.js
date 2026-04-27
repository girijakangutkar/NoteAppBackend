const express = require("express");
const UserRouter = express.Router();
const bcrypt = require("bcrypt");
const UserModel = require("../model/UserModel");
const saltRounds = 10;
require("dotenv").config();
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

// Email transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // SendGrid / SMTP
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// SIGNUP
UserRouter.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if email already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "Email already registered" });
    }

    bcrypt.hash(password, saltRounds, async function (err, hash) {
      if (err) {
        return res.status(500).json({ msg: "Something went wrong" });
      }

      // Generate verification token
      const verificationToken = crypto.randomBytes(32).toString("hex");
      const frontendURI = "https://notehere.vercel.app"
      const tokenExpiry = Date.now() + 3600000; // 1 hour

      const newUser = await UserModel.create({
        name,
        email,
        password: hash,
        role: "user",
        verificationToken,
        verificationTokenExpiry: tokenExpiry,
      });

      // Send verification email
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Verify your email",
        html: `<p>Click <a href="${frontendURI}/api/users/verify/${verificationToken}">here</a> to verify your email.</p>`,
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) console.error("Email error:", err);
        else console.log("Verification email sent:", info.response);
      });

      res
        .status(201)
        .json({ msg: "User created. Please verify your email." });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Something went wrong" });
  }
});

// LOGIN
UserRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ error: "User does not exist, please signup" });
    }

    // Check if email verified
    if (!user.isVerified) {
      return res.status(401).json({ msg: "Please verify your email first" });
    }

    bcrypt.compare(password, user.password, function (err, result) {
      if (err || !result) {
        return res.status(400).json({ msg: "Wrong password" });
      }

      const userRole = user.role || "user";
      const token = jwt.sign(
        { userId: user._id, role: userRole },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      res.status(200).json({ msg: "User logged in", token });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Something went wrong" });
  }
});

// EMAIL VERIFICATION
UserRouter.get("/verify/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const user = await UserModel.findOne({
      verificationToken: token,
      verificationTokenExpiry: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ msg: "Invalid or expired token" });

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiry = undefined;
    await user.save();

    res.status(200).json({ msg: "Email verified successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Something went wrong" });
  }
});

module.exports = UserRouter;
