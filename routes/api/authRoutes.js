const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const authenticateToken = require("../../middleware/authenticateToken");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");
const { sendVerificationEmail } = require("../../config/emailService");

const {
  userSchema,
  subscriptionUpdateSchema,
} = require("../../validation/userSchemas");

require("dotenv").config();

router.post("/register", async (req, res) => {
  const { error, value } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const existingUser = await User.findOne({ email: value.email });
    if (existingUser) {
      return res.status(409).json({ message: "Email in use" });
    }
  } catch (error) {
    console.error("Error checking user existence:", error);
    return res.status(500).json({ message: "Error checking user existence" });
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(value.password, 10);
  } catch (error) {
    console.error("Error hashing password:", error);
    return res.status(500).json({ message: "Error hashing password" });
  }

  try {
    const avatarURL = gravatar.url(value.email, {
      protocol: "https",
      s: "250",
      r: "pg",
      d: "identicon",
    });

    const newUser = new User({
      email: value.email,
      password: hashedPassword,
      subscription: "starter",
      avatarURL: avatarURL,
      verificationToken: uuidv4(),
    });

    await sendVerificationEmail(newUser.email, newUser.verificationToken);

    await newUser.save();

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res
      .status(500)
      .json({ message: "Internal server error during user registration" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { error, value } = userSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const user = await User.findOne({ email: value.email });
    if (!user) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    if (!user.verify) {
      return res.status(401).json({ message: "Email is not verified" });
    }

    const passwordMatch = await bcrypt.compare(value.password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    user.token = token;
    await user.save();

    res.status(200).json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/logout", authenticateToken, async (req, res) => {
  try {
    const userId = req.user._id;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { token: null } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(401).json({ message: "Not authorized" });
    }

    res.status(204).send();
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/current", authenticateToken, async (req, res) => {
  try {
    const { email, subscription } = req.user;

    res.status(200).json({
      email: email,
      subscription: subscription,
    });
  } catch (error) {
    console.error("Error getting current user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.patch("/subscription", authenticateToken, async (req, res) => {
  try {
    const userId = req.user._id;

    const { error } = subscriptionUpdateSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { subscription } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    user.subscription = subscription;
    await user.save();

    res.status(200).json({
      email: user.email,
      subscription: user.subscription,
    });
  } catch (error) {
    console.error("Error updating subscription:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/verify/:verificationToken", async (req, res) => {
  try {
    const { verificationToken } = req.params;

    const user = await User.findOne({ verificationToken });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.findByIdAndUpdate(user._id, {
      verify: true,
      verificationToken: null,
    });

    res.status(200).json({ message: "Email verification successful" });
  } catch (error) {
    console.error("Email verification error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
