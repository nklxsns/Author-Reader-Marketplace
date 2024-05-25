const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const authenticate = async (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return res.status(401).send("Access denied. No token provided");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(404).send("No user found");
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
};

module.exports = { authenticate };
