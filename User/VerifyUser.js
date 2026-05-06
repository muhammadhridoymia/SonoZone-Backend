import User from '../models/User.js';
import jwt from "jsonwebtoken";

export const verifyUser = async (req, res) => {
  const { code } = req.params;
  console.log("Verification code received:", code);
  
  if (!code) {
    return res.status(201).json({
      success: false,
      message: "Verification code is required"
    });
  }

  // Find user by verification token

  const user = await User.findOne({ verificationToken: code });

  if (!user) {
    return res.status(201).json({
      success: false,
      message: "Invalid token"
    });
  }

  //1. verify user
  user.isVerified = true;
  user.verificationToken = undefined;
  await user.save();

  // 2. create JWT
  const jwtToken = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  // 3. send response with token and user info
  res.status(200).json({
    success: true,
    token: jwtToken,
    user: { name: user.name }
    });
};