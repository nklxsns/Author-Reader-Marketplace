const express = require("express");
const { register, login, logout } = require("../controllers/auth");
const { authenticate } = require("../middlewares/auth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", authenticate, logout);

module.exports = router;
