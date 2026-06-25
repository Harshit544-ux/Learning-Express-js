const connectDB = require("../authentication/db/db")
const app = require("./src/app")

connectDB()

app.listen(3000,()=>{
    console.log("server is running port at 3000")
})