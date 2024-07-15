const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  genre: { type: String, required: true },
  publish_date: { type: Date, required: true },
  price: { type: Number, required: true },
  tags: { type: [String] },
  author_id: { type: Schema.Types.ObjectId, ref: "Author", required: true },
  isPublished: { type: Boolean, default: false },
});

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;
