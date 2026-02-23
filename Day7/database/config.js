const mongoose = require("mongoose");

const url = "mongodb+srv://harshit:dbuser@coderarmy.rgzfk1v.mongodb.net/Instagram";

mongoose
  .connect(url)
  .then(() => {
    console.log("Connected successfully to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
