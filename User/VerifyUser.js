import User from '../models/User.js';


export const verifyUser = async (req, res) => {
  const { token } = req.params;

  const user = await User.findOne({ verificationToken: token });

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Invalid or expired token"
    });
  }

  user.isVerified = true;
  user.verificationToken = undefined;

  await user.save();

  res.json({
    success: true,
    message: "Account verified successfully"
  });
};