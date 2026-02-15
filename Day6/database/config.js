const mongoose = require("mongoose");
const User = require("../model/userModal");

// connection URL and database name
const url = "mongodb+srv://harshit:dbuser@coderarmy.rgzfk1v.mongodb.net/Instagram";


// Connect to MongoDB
mongoose.connect(url)
  .then(() => {
    console.log("Connected successfully to MongoDB server");
  })
  .catch((err) => {
    console.error("Connection error:", err);
  });
