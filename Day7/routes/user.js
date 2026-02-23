const express = require("express");
const User = require("../model/userModal");
const auth = require("../middlewares/auth");

//userRouter
const userRouter=express.Router();

//fetch the users from  DB
 userRouter.get("/", auth, async (req, res) => {
    try {
        const user = await User.find();
        res.send(user);
    } catch (err) {
        res.send("Error in getting info : " + err.message);
    }
});


//Update user data in DB
 userRouter.put("/", auth, async (req, res) => {
    const { id, ...update } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, update);
        res.send(updatedUser);
    } catch (err) {
        res.send("Error in updating user : " + err.message);
    }
});


//Delete user from DB
 userRouter.delete("/:id", auth, async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        res.send(deletedUser);
    } catch (err) {
        res.send("Error in deleting user : " + err.message);
    }
});


module.exports = userRouter;