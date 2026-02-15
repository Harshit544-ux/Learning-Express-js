const express = require("express");
require("./database/config");
const User = require("./model/userModal");
 // DB connect ho raha hai

const app = express();

app.use(express.json());

// Feed the user data in Db
app.post("/register",async (req,res)=>{
     await User.create(req.body);
     res.send("User Regstered Successfully")
 })


// Get all users from DB
app.get("/users",async(req,res)=>{
    const users=await User.find()
    res.send(users)
})

//Update user data in DB
app.put("/users",async(req,res)=>{
     const {id,...update}=req.body;
      const updatedUser=await User.findByIdAndUpdate(id,update);
      res.send(updatedUser);

})


//Delete user from DB
app.delete("/users/:id",async(req,res)=>{
     const {id}=req.params;
      const deletedUser=await User.findByIdAndDelete(id);
      res.send(deletedUser);
})


app.listen(4000, () => {
  console.log("App is listening at port 4000");
});
