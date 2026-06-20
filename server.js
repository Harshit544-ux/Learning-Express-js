//import the app instance from app.js
const app = require("./src/app")

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


//start the server
app.listen(3000,()=>{
    console.log("server is running on port 3000")
})