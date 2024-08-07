const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth");
const bookRoutes = require("./routes/book");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    allowedHeaders: "Content-Type,Authorization", 
    credentials: true, 
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).send("Welcome to Author and Reader Marketplace API.");
});
app.use("/auth", authRoutes);
app.use("/book", bookRoutes);

// Create ".env" file with your mongo database uri as MONGODB_URI
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to database!");

    app.listen(5000, () => {
      console.log("Server is running at http://localhost:5000...");
    });
  })
  .catch(() => {
    console.log("Connection failed!");
  });
