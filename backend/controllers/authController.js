import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "Missing fields" });

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing)
      return res.status(400).json({ message: "Email already registered" });

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email: email.toLowerCase(),
      passwordHash,
    });

    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRY || "7d",
    });

    res.json({
      user: { id: user._id, name: user.name, email: user.email },
      token,
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRY || "7d",
    });

    res.json({
      user: { id: user._id, name: user.name, email: user.email },
      token,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
