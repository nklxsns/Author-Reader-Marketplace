const mongoose = require("mongoose");
const { Schema } = mongoose;

const RatingSchema = Schema({
  rating: { type: Number, required: true, min: 1, max: 5 },
  review: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
});

const Rating = mongoose.model("Rating", RatingSchema);

module.exports = Rating;
