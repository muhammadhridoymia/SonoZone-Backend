const jwt = require("jsonwebtoken");


const optionalAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
    }

    next();
  } catch {
    next(); // ignore error
  }
};

module.exports = optionalAuth