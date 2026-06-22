const mongoose = require("mongoose")

async function connectDB(){
   await mongoose.connect("mongodb+srv://yt:bXMDldQxXdOg8l5N@yt-complete-backend.cqehzeu.mongodb.net/harshit")
   console.log("Connect to DB")
}

module.exports = connectDB