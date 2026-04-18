import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Admin credentials — change these to whatever you want
const ADMIN_EMAIL    = "admin@saffron.com";
const ADMIN_PASSWORD = "admin123";

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check email
    if (email !== ADMIN_EMAIL) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Direct password check (simple and reliable)
    if (password !== ADMIN_PASSWORD) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create JWT token valid for 7 days
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({ token, message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};