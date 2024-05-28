const express = require("express");
const { createRating, fetchRatings } = require("../controllers/rating");
const { authenticate } = require("../middlewares/auth");

const router = express.Router();

router.get("/:bookId", fetchRatings);
router.post("/:bookId", authenticate, createRating);

module.exports = router;
