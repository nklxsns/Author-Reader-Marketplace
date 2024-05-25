const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const UserSchema = Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  isAuthor: { type: Boolean, required: true },
});

UserSchema.pre("save", async (next) => {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
