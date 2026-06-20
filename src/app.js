//require dependencies
const express = require("express")

const app = express() //create an instance of express

app.use(express.json()) //middleware express.json()


//Task : Notes Api

notes = [] //create the notes array

// title , description 
// POST  /notes
app.post("/notes",(req,res)=>{
    console.log(req.body)
    //insert the data (req.body) into the array notes
    notes.push(req.body)

    //send the response
    res.status(201).json({
        message : "notes created successfully"
    })
})


// GET /notes
app.get("/notes",(req,res)=>{
    //send the response
    res.status(200).json({
        message:"notes fetch successfully",
        notes:notes
    })
})


// DELETE /notes/1
app.delete("/notes/:index",(req,res)=>{
    // extract the index from req.params
    const index = req.params.index
    console.log("index",index)

    //delete the notes in particular index
    delete notes[index]

    //send the response
    res.status(200).json({
        message : "delete successfully"
    })
})


//PATCH /notes/1
app.patch("/notes/:id",(req,res)=>{
    //extract index
    const index = req.params.id

    //take description from fronend
    const description = req.body.description

    //update the description on particular index
    notes[index].description = description

    res.status(200).json({
       message: "note updated successfullt"
    })


})

module.exports = app //export the app instance to be used in other files