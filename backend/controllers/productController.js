const productController = require("express").Router()
const Product = require("../models/Product")
const {verifyToken, verifyTokenAdmin} = require('../middllewares/verifyToken')

//get all
productController.get('/', async(req, res) => {
    try {
        // req.query = {category: 'pizza'}
        const products = await Product.find(req.query)
        return res.status(200).json(products)
    }catch (error) {
        console.error(error)
    }
})

//get one
productController.get('/find/:id', async(req, res) => {
    try {
        const productId = req.params.id
        const product = await Product.findById(productId)
        if(!product){
            return res.status(500).json({msg: "No product with such id!"})
        }
        return res.status(200).json(product)

     }catch (error) {

    }
})

//create product
productController.post('/', verifyToken, async(req, res) => {
    try {
        const newProduct = await Product.create({...req.body})
        return res.status(201).json(newProduct)

    }catch (error) {
        console.error(error)
    }
})

//update product
productController.put('/update/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const { title, description, price, category } = req.body;
        const updateProduct = {
            title,
            description,
            price,
            category
        };

        const updatedProduct = await Product.findByIdAndUpdate(id, updateProduct, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ msg: "Product not found" });
        }
        return res.status(200).json(updatedProduct);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
})

//delete product
productController.delete('/delete/:id', async (req, res) => {
    try {
        const productId = req.params.id;

        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({ msg: "Product not found" });
        }

        return res.status(200).json({ msg: "Product deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
})

module.exports = productController