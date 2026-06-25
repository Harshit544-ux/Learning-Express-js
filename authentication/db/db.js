const mongoose = require("mongoose")

const connectDB = async()=>{
   try{
    await mongoose.connect(process.env.MONGO_URL)
    console.log("database is connected")

   }catch (error){
     console.error("data is not connected")
     console.error(error)

   }
}

module.exports = connectDB