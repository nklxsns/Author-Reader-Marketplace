const express = require("express");

const router = express.Router();

router.post("/register", (req, res) => {});
router.post("/login", (req, res) => {});
router.get("/logout", authenticate, logout);
