const express = require("express")
const noteModel = require("../models/note.model")

const app = express()
app.use(express.json())

/* 
POST /notes => Create a note
GET  /notes => Get all notes
DELETE /notes/:id => Delete a note
PATCH  /notes/:id => Update a note

*/

app.post("/notes",async(req,res)=>{
       const data = req.body // {title , description}
       console.log("data = " , data)
        
       await noteModel.create({
            title:data.title,
            description: data.description
        })

        res.status(201).json({
            message : "notes created successfully"
        })
})


app.get("/notes",async(req,res)=>{
   
   const notes = await noteModel.find() //it always return []

 /* 
    find => [{} {}] or []
    findOne => {} or null
 */

    res.status(200).json({
        "message" : "fetch notes successfully",
         notes : notes
    })

})

app.delete("/notes/:id",async(req,res)=>{
     
    const id = req.params.id
    console.log("id = ",id)

    await noteModel.findOneAndDelete({
        _id:id
    })

    res.status(200).json({
        message : "delete note successfully"
    })

})

app.patch("/notes/:id",async(req,res)=>{
    const id = req.params.id
    const description = req.body.description

    await noteModel.findOneAndUpdate(
        {_id:id},
        {description:description}
    )

    res.status(200).json({
        message:"note updated successfully"
    })
})



module.exports = app