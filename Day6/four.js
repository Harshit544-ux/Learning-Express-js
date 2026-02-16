const express = require("express");
require("./database/config");
const User = require("./model/userModal");
const bcrypt=require("bcrypt");
const validateUser = require("./utils/validateUser");
 // DB connect ho raha hai

const app = express();

app.use(express.json());

// Feed the user data in Db
app.post("/register",async (req,res)=>{
     const {username,email,password}=req.body;
     console.log(username,email,password)

    try{
         //call the validateUser function to check for mandatory fields
    validateUser(req.body);
     
    //Hashing the password before saving to Db
    req.body.password= await bcrypt.hash(req.body.password,10)
        await User.create(req.body);
        res.send("User Regstered Successfully")

    }catch(err){
        res.send("Error in user registetaion :" + err.message);
    }
     
 })


app.post("/login",async(req,res)=>{
    //take email and password from request body
    const {email,password }= req.body;
    console.log(email,password)
      
    try{
        //Find user by email in DB
        const userEmail =await User.findOne({email});
        console.log(userEmail);

        //if user not found 
        if(!userEmail){
            throw new Error("User not found with this email");
        }

        //compare the password
        const isPasswordMatch= bcrypt.compare(password,userEmail.password);
      
        //password match nahi hua 
        if(!isPasswordMatch){
            throw new Error("Invalid password");
        }

        res.send("User logged in Successfully")
     

    }catch(err){
        res.send("Error in user login :" + err.message);
    }
  

})




app.listen(4000, () => {
  console.log("App is listening at port 4000");
});
