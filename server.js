const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const router = require("./routers/productRouter")
const app = express()
const path = require("path")
const fs = require("fs")



//Middleware 
app.use(express.json())
app.use(cors())


const uploadDir = path.join(__dirname, "uploads")

if (!fs.existsSync(uploadDir)) {
    try {
        fs.mkdirSync(uploadDir)
        console.log("Uploads directory created at startup")
    } catch (err) {
        console.error("Failed to create uploads directory at startup", err)
        process.exit(1) 
    }
}


app.use("/uploads", express.static("uploads"))
app.use("/api/product", router)

mongoose.connect("mongodb+srv://admin:admin@app1.oy5gwwo.mongodb.net/app1?retryWrites=true&w=majority&appName=App1")
    .then(() => {
        app.listen(4000, () => {
            console.log("Server Started Port Number " + 4000)
        })
    })
    .catch(err => console.log(err))