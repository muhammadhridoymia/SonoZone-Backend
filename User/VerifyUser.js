import User from '../models/User.js';
import jwt from "jsonwebtoken";

export const verifyUser = async (req, res) => {
  const { code } = req.params;

  const user = await User.findOne({ verificationToken: code });

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Invalid or expired token"
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