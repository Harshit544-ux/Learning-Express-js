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

     // Check if product already in cart
     const existingItem = cart.find(p => p.id === productId);
     
     if(existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
     } else {
        //cart mein add kro with quantity
        cart.push({...product, quantity: 1});
     }

     res.json({
        message:"Product added to cart",
        cart
     })
})


// Route: GET /cart
app.get("/cart",(req,res)=>{
    res.json({
        message:"Your Cart",
        cart
    })
})


// Route: PUT /cart/:id
app.put("/cart/:id", (req, res) => {
  const id = Number(req.params.id);

  // safety check
  if (!req.body || req.body.quantity === undefined) {
    return res.status(400).json({
      message: "Quantity is required"
    });
  }

  const { quantity } = req.body;

  const item = cart.find(p => p.id === id);

  if (!item) {
    return res.status(404).json({ message: "Item not in cart" });
  }

  if (quantity <= 0) {
    cart = cart.filter(p => p.id !== id);
  } else {
    item.quantity = quantity;
  }

  res.json({
    message: "Quantity updated",
    cart
  });
});


//Route: DELETE /cart/:id
app.delete("/cart/:id",(req,res)=>{
    const id =Number(req.params.id);

    cart = cart.filter(p=>p.id !==id)

    res.json({
        message:"Item removed from cart",
        cart
    })
})




//Port
const PORT=4000;

app.listen(PORT,()=>{
    console.log(`app is listening on port ${PORT}`)
})