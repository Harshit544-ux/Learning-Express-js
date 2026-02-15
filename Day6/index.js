const express = require("express");
require("./database/config");
const User = require("./model/userModal");
 // DB connect ho raha hai

const app = express();

app.use(express.json());

 app.post("/register",async (req,res)=>{
     await User.create(req.body);
     res.send("User Regstered Successfully")
 })



app.listen(4000, () => {
  console.log("App is listening at port 4000");
});
