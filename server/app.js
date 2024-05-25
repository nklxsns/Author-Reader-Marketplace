const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);

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
