const express = require("express");
const { authenticate } = require("../middlewares/auth");
const { fetchBooks, createBook } = require("../controllers/books");

const router = express.Router();

router.get("/all", fetchBooks);
router.post("/create", authenticate, createBook);

module.exports = router;
