const express = require("express");
const Book = require("../models/book.model");
const { authenticate } = require("../middlewares/auth");
const { fetchBooks, createBook } = require("../controllers/books");

const router = express.Router();

router.post("/create", authenticate, createBook);

router.get("/all/:publishedOnly", fetchBooks);

module.exports = router;
