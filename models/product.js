const mongoose = require("mongoose")
const productSchema=new mongoose.Schema(
    {
        id:
        {
            type:Number,
            required:true
        },
         name:
        {
            
            type:String,
            required:true
        },
        dis:
        {
            type:String,
            required:true
        },
         price:
        {
            type:Number,
            required:true
        },
        img:
        {
            type:String,
            required:true
        }
    }
)
module.exports=mongoose.model("productModel",productSchema)