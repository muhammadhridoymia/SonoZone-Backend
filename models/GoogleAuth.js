// routes/auth.js
const express = require("express");
const passport = require("passport");
require("../Google/passport"); // import Google strategy

const router = express.Router();

// 1. Redirect user to Google login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

// 2 Google callback
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/login-failed" }),
  (req, res) => {
    // redirect to frontend with token and user name and email and avatar
    const userData = {
      name: req.user.user.name,
      email: req.user.user.email,
      avatar: req.user.user.avatar,
    };
    res.redirect(`http://localhost:3000/login-success?token=${req.user.token}&user=${JSON.stringify(userData)}`);
  },
);

module.exports = router;
