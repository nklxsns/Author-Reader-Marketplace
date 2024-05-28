const Rating = require("../models/rating.model");

const createRating = async (req, res) => {
  if (req.user.role != "reader") {
    return res
      .status(403)
      .json({ message: "Access denied. User is not a reader." });
  }

  try {
    const data = {
      ...req.body,
      user: req.user._id,
      book: req.params.bookId,
    };
    const newRating = new Rating(data);
    await newRating.save();

    res.status(201).json({ message: "Rating created successfully!" });
  } catch (err) {
    res.status(500).json({ messsage: err.messsage });
  }
};

const fetchRatings = async (req, res) => {
  try {
    const ratings = await Rating.find({ book: req.params.bookId });
    res.json(ratings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createRating, fetchRatings };
