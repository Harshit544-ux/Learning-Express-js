const connectDBs = require("./db/db")
const app = require("./src/app")


connectDBs()

app.listen(3000,()=>{
    console.log("server is running at 3000")
})