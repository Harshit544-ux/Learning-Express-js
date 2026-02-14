const express = require('express');
const app = express();

//Middleware (to read Json data from request body)
app.use(express.json());



//CRUD operations in Product

// Mock Product Data
const products =[
  { id: 1, name: "Laptop", price: 50000 },
  { id: 2, name: "Mobile", price: 20000 },
  { id: 3, name: "Headphones", price: 2000 }

]


//Empty Cart (User ka cart)
let cart =[];


//Route: POST /cart
app.post("/cart",(req,res)=>{
     const {productId} =req.body;

     //product dhundho
     const product = products.find(p=>p.id === productId);

     if(!product){
        return res.status(404).json({message:"Product not found"})
     }

     //cart mein add kro
     cart.push(product);

     res.json({
        message:"Product added to cart",
        cart
     })
})






//Port
const PORT=4000;

app.listen(PORT,()=>{
    console.log(`app is listening on port ${PORT}`)
})