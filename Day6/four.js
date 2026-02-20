const express = require("express");
require("./database/config");
const User = require("./model/userModal");
const bcrypt = require("bcrypt");
const validateUser = require("./utils/validateUser");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
const auth = require("./middlewares/auth");
const { JWT_SECRET, SALT_ROUNDS } = require("./utils/constants");

const app = express();

//middlewares
app.use(express.json());
app.use(cookie());

// Feed the user data in Db
app.post("/register", async (req, res) => {
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

app.post("/login", async (req, res) => {
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

app.get("/users", auth, async (req, res) => {
    try {
        const user = await User.find();
        res.send(user);
    } catch (err) {
        res.send("Error in getting info : " + err.message);
    }
});

//Update user data in DB
app.put("/users", auth, async (req, res) => {
    const { id, ...update } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, update);
        res.send(updatedUser);
    } catch (err) {
        res.send("Error in updating user : " + err.message);
    }
});

//Delete user from DB
app.delete("/users/:id", auth, async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        res.send(deletedUser);
    } catch (err) {
        res.send("Error in deleting user : " + err.message);
    }
});

// server is listen
app.listen(4000, () => {
    console.log("App is listening at port 4000");
});
