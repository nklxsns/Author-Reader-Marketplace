const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const createToken = (user) => {
  // Create ".env" file with your JWT secret key as JWT_SECRET
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return token;
};

const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }

    user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: req.body.role || "reader",
    });
    await newUser.save();

    res.cookie("_auth", createToken(newUser), {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
    });

    res.status(200).json({
      message: `${username} has been created.`,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    
    if (!user) {
      return res
        .status(400)
        .json({ message: "User does not exist. Please sign up" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    res.cookie("_auth", createToken(user), {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
    });

    res.status(200).json({ message: "Logged in successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const logout = async (req, res) => {
  res.clearCookie("_auth");
  res.status(200).json({ message: "Logged out successfully!" });
};

module.exports = {
  register,
  login,
  logout,
};
