const express = require("express");
require("./database/config");
const User = require("./model/userModal");
const bcrypt = require("bcrypt");
const validateUser = require("./utils/validateUser");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
const auth = require("./middlewares/auth");
const { JWT_SECRET, SALT_ROUNDS } = require("./utils/constants");
const userRouter = require("./routes/user");

const app = express();

//middlewares
app.use(express.json());
app.use(cookie());

//routes

app.use("/auth",userRouter)







// server is listen
app.listen(4000, () => {
    console.log("App is listening at port 4000");
});
