const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

mongoose
  .connect(mongodbURI)
  .then(() => {
    console.log("Connected to database!");

    app.listen(5000, () => {
      console.log("Server is running at http://localhost:5000...");
    });
  })
  .catch(() => {
    console.log("Connection failed!");
  });
