require("dotenv").config();  
const express = require("express");
const cookie = require("cookie-parser");

//routes
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");

// DB connect import
require("./database/config");

const app = express();

//middlewares
app.use(express.json());
app.use(cookie());

//routes
app.use("/auth",authRouter);
app.use("/user",userRouter);


// server is listen
app.listen(4000, () => {
    console.log("App is listening at port 4000");
});
