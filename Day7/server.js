require("dotenv").config();  
console.log(process.env.MANGODB_URL);
const express = require("express");
const cookie = require("cookie-parser");
const auth = require("./middlewares/auth");

const userRouter = require("./routes/user");

// DB connect import
require("./database/config");

const app = express();

//middlewares
app.use(express.json());
app.use(cookie());

//routes

app.use("/auth",userRouter);







// server is listen
app.listen(4000, () => {
    console.log("App is listening at port 4000");
});
