const app = require("./src/app")
const connectDB = require("./db/db")

//call the connectdb function
connectDB()

app.listen(3001,()=>{
    console.log("app is listening at 3001")
})