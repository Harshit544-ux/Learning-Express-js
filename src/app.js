//require dependencies
const express = require("express")

const app = express() //create an instance of express

app.use(express.json()) //middleware express.json()



module.exports = app //export the app instance to be used in other files