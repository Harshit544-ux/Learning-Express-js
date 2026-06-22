require("dotenv").config();
const express = require("express")
const multer = require("multer")
const uploadFile = require("../services/storage.service");
const postModel = require("../models/post.model");
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json())

const upload = multer({storage:multer.memoryStorage()})

app.post("/create-post",upload.single("image") , async(req,res)=>{
    
    console.log(req.body)
    console.log(req.file)

   const result = await uploadFile(req.file.buffer,req.file.originalname);
   console.log(result)
  
   const post = await postModel.create({
    image:result.url,
    caption:req.body.caption
   })

    res.status(201).json({
        message:"Post created successfully",
        post
    })

})

app.get("/posts",async(req,res)=>{
    const post = await postModel.find()

    res.status(200).json({
        message :"Post fetch successfully",
        post
    })
})

module.exports = app