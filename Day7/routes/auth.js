const express = require("express");
const User = require("../model/userModal");
const bcrypt = require("bcrypt");
const validateUser = require("../utils/validateUser");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, SALT_ROUNDS } = require("../utils/constants");

//authRouter
const authRouter=express.Router();

//Register the user
 authRouter.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    console.log(username, email, password);

    try {
        //call the validateUser function to check for mandatory fields
        validateUser(req.body);

        //Hashing the password before saving to Db
        req.body.password = await bcrypt.hash(req.body.password, SALT_ROUNDS);
        await User.create(req.body);
        res.send("User Regstered Successfully");
    } catch (err) {
        res.send("Error in user registetaion :" + err.message);
    }
});


//login the user
 authRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);

    try {
        //Find user by email in DB
        const userEmail = await User.findOne({ email });
        console.log(userEmail);

        //if user not found 
        if (!userEmail) {
            throw new Error("User not found with this email");
        }

        //compare the password
        const isPasswordMatch = await bcrypt.compare(password, userEmail.password);

        //password match nahi hua 
        if (!isPasswordMatch) {
            throw new Error("Invalid password");
        }

        //generate the token
        const token = jwt.sign(
            { id: userEmail._id, email: userEmail.email },
            JWT_SECRET, { expiresIn: "2 days" }
        );
        console.log(token);

        //send cookie
        res.cookie("token", token);
        res.send("User logged in Successfully");
    } catch (err) {
        res.send("Error in user login :" + err.message);
    }
});



module.exports = authRouter;