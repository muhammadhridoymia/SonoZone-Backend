import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/SendEmail.js";
import { EmailTemplate } from "../utils/EmailTemplate.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("Registration request body:", req.body);

    // Validation
    if (!password) {
      return res.status(201).json({ verify: false, message: "Password is required" });
    }

    if (!email) {
      return res.status(201).json({
        verify: false,
        message: "Email is required",
      });
    }

    // Check if user already exists
    let existingUser;

    if (email) {
      existingUser = await User.findOne({ email: email.toLowerCase() });
      if (existingUser) {
        return res
          .status(201)
          .json({ verify: false, message: "User with this email already exists" });
      }
    }

    // Hash password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate a random 6-digit code
    const generateVerificationCode = () => {
      return Math.floor(100000 + Math.random() * 900000).toString();
    };
    const Code = generateVerificationCode();

    // Send verification email
    if (email) {
      const emailContent = EmailTemplate(Code, name || "User");
      await sendEmail(email, "Verify your account", emailContent);
    }
    // Create new user
    const newUser = new User({
      name: name || "",
      email: email ? email.toLowerCase() : null,
      password: hashedPassword,
      verificationToken: Code,
      // You can add more fields like role, isVerified, etc.
    });

    console.log("New user object before saving:", newUser);
    await newUser.save();

    // Send successful registration response
    res.status(200).json({
      verify: true,
      message:
        "Registration successful! Please check your email to verify your account.",
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      verify: false,
      message: "Server error during registration",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
