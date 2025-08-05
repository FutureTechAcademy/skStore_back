const express = require("express")
const mongoose =require("mongoose")
const cors = require("cors")
const router = require("./routers/productRouter")
const app = express()


//Middleware 
app.use(express.json())
app.use(cors())
app.use("/uploads",express.static("uploads"))
app.use("/api/product",router)

mongoose.connect("mongodb+srv://admin:admin@app1.oy5gwwo.mongodb.net/app1?retryWrites=true&w=majority&appName=App1")
.then(()=>
{
    app.listen(4000,()=>
    {
        console.log("Server Started Port Number "+4000)
    })
})
.catch(err=>console.log(err))