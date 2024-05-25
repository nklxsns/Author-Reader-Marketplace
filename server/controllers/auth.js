const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // validate email and username to be unique
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }

    user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashed,
    });
    await newUser.save();
    res.status(200).json({
      message: `${username} has been created. Please login to continue`,
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
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .cookie("access_token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60,
      })
      .status(200)
      .json({ message: "Logged in successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const logout = (req, res) => {
  return res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Logged out successfully!" });
};

module.exports = {
  signup,
  login,
  logout,
};
