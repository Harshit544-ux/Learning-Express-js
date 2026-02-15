// take the module of express js
const express=require('express');
require('./database/config');


//creating the instance of express js
const app=express();

//parsing the json to object
app.use(express.json());



// app is listening
app.listen(4000,()=>{
    console.log('app is listening at port no. 4000');
})