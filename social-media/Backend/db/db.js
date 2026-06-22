const mongoose = require("mongoose")

async function connectDBs(){
     await mongoose.connect(process.env.MONGO_URL )
     console.log("DB is connected")
}

module.exports = connectDBs