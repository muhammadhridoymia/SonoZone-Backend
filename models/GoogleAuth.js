// routes/auth.js
const express = require("express");
const passport = require("passport");
require("../Google/passport"); // import Google strategy

const router = express.Router();

// 1. Redirect user to Google login
router.get("/google",passport.authenticate("google", { scope: ["profile", "email"] }));

// 2 Google callback
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    // Send JWT and user info to frontend
    res.json({ token: req.user.token, user: req.user.user });
  }
);

module.exports = router;