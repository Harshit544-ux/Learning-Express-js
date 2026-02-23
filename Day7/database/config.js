const mongoose = require("mongoose");

const url = process.env.MANGODB_URL ;

mongoose
  .connect(url)
  .then(() => {
    console.log("Connected successfully to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
