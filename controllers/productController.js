const productModel = require("../models/product")
const multer = require("multer")
const path = require("path")
const fs = require("fs")
//File Upload Code 
const mystorage = multer.diskStorage(
    {
        destination: (req, file, cb) => {
            cb(null, "uploads/")
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname)
        }
    }
)

const upload = multer({ storage: mystorage })


//Add Data Code
async function addData(req, res) {
    try {
        const { id, name, dis, price } = req.body
        // http://localhost:4000/uploads/siva.jpg
        const img = `${req.protocol}://${req.get("host")}/uploads/${req.file.originalname}`
        const product = productModel({ id, name, dis, price, img })
        if (!product) {
            return res.status(404).send({ message: "Not Fill All Data" })
        }
        await product.save()
        res.status(200).send(product)
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ message: "Server error" })
    }
}

//Get Data Code
async function getData(req, res) {
    try {
        const allProducts = await productModel.find({})
        if (!allProducts) {
            return res.status(404).send({ message: "products not found" })
        }
        res.status(200).send(allProducts)
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ message: "Server error" })
    }

}
//Get One Data Code
async function getOneData(req, res) {
    try {
        const { id } = req.params
        const product = await productModel.findOne({ id })
        if (!product) {
            return res.status(404).send({ message: "product not found" })
        }
        res.status(200).send(product)
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ message: "Server error" })
    }
}



//Update Data Code
async function updateData(req, res) {
    try {
        const { id, name, dis, price } = req.body
        // http://localhost:4000/uploads/siva.jpg
        const img = `${req.protocol}://${req.get("host")}/uploads/${req.file.originalname}`

        //Delete File 
        const oldproduct = await productModel.findOne({ id })
        const deletePath = path.join(__dirname, "..", oldproduct.img.replace(`${req.protocol}://${req.get("host")}`, ""))
        fs.unlinkSync(deletePath)

        await productModel.updateOne({ id }, { $set: { name, dis, price, img } })
        const product = { id, name, dis, price, img }
        res.status(200).send(product)
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ message: "Server error" })
    }
}



//Delete One Data

async function deleteOneData(req, res) {
    try {
        const { id } = req.params
        const product = await productModel.findOne({ id })

        //Delete File 
        const deletePath = path.join(__dirname, "..", product.img.replace(`${req.protocol}://${req.get("host")}`, ""))
        if (fs.existsSync(deletePath)) {
            fs.unlinkSync(deletePath)
        }
        await productModel.deleteOne({ id })
        if (!product) {
            return res.status(404).send({ message: "product not found" })
        }
        res.status(200).send(product)
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ message: "Server error" })
    }
}

module.exports = { addData, getData, getOneData, updateData, deleteOneData, upload }