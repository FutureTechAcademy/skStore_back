const express = require("express")
const {addData,getData,getOneData,updateData,deleteOneData,upload}=require("../controllers/productController")
const router = express.Router()

router.post("/",upload.single("img"),addData)
router.get("/",getData)
router.get("/:id",getOneData)
router.put("/",upload.single("img"),updateData)
router.delete("/:id",deleteOneData)

module.exports=router