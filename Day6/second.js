const express=require('express');

const app=express();

app.use(express.json());

//add logger  which return the req.method :- which identified which type of method hit the url and req.url :- same identified url 
app.use((req,res,next)=>{
    console.log(`method : ${req.method} , url :${req.url}` )
    next();
})

app.get("/",(req,res)=>{
    res.send("get the data")
})


app.get("/users",(req,res)=>{
    res.send({
        message:"Users",
        name:req.query.user,
        age:req.query.age
    })
})

app.post("/create_order",(req,res)=>{
      const {name,age}=req.body;
      res.send(
        {
            message: "post method",
            name,
            age,
        }        
      );
})



app.listen(4000,()=>{
    console.log("server is running at 4000")
})