const Book = require("../models/book.model");

const createBook = async (req, res) => {
  if (req.user.role != "author") {
    return res.status(403).send("Access denied. User is not a reader.");
  }

  try {
    const data = {
      ...req.body,
      author_id: req.user._id,
    };

    const newBook = new Book(data);
    await newBook.save();

    res.status(201).json({ message: "Book created successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const fetchBooks = async (req, res) => {
  try {
    const books = await Book.find({ isPublished: req.query.publishedOnly === "true" });
    res.json(books);
  } catch (err) {
    res.status(500).json({ messsage: err.messsage });
  }
};

module.exports = { createBook, fetchBooks };
