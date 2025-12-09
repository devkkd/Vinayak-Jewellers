import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const signToken = (user) =>
  jwt.sign({ uid: user._id, email: user.email }, process.env.JWT_SECRET || "dev_secret", {
    expiresIn: "7d",
  });

export const signup = async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ success: false, message: "Email and password required" });

    // Only allow signup for the configured admin email
    if (process.env.ADMIN_EMAIL && email.toLowerCase() !== process.env.ADMIN_EMAIL.toLowerCase()) {
      return res.status(403).json({ success: false, message: "Only admin email can signup" });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) return res.status(409).json({ success: false, message: "User already exists" });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ email: email.toLowerCase(), passwordHash });
    const token = signToken(user);
    return res.status(201).json({ success: true, token, user: { email: user.email } });
  } catch (e) {
    return res.status(500).json({ success: false, message: "Signup failed" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ success: false, message: "Email and password required" });

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(401).json({ success: false, message: "Invalid credentials" });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ success: false, message: "Invalid credentials" });

    // Restrict dashboard access to ADMIN_EMAIL
    if (process.env.ADMIN_EMAIL && user.email.toLowerCase() !== process.env.ADMIN_EMAIL.toLowerCase()) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    const token = signToken(user);
    return res.json({ success: true, token, user: { email: user.email } });
  } catch (e) {
    return res.status(500).json({ success: false, message: "Login failed" });
  }
};

export const me = async (req, res) => {
  return res.json({ success: true, user: { email: req.user.email } });
};


