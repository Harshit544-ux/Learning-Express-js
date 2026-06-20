//import the app instance from app.js
const app = require("./src/app")

//Task : Notes Api

notes = [] //create the notes array

// title , description 
// POST  /notes
app.post("/notes",(req,res)=>{
    console.log(req.body)
    notes.push(req.body)

    res.status(201).send({
        message : "notes created "
    })
})


//start the server
app.listen(3000,()=>{
    console.log("server is running on port 3000")
})