const express = require('express');
const router = express.Router();
const Product = require('../models/productModel.js');

//retrieve all products from DB
router.get('/', async(req, res) => {
    try{
        const products = await Product.find({});
        res.status(200).json(products);
    }catch( error ) {
        res.status(500).json({message: error.message});
    }
});

//retrieve specific product from DB by ID
router.get('/:id', async(req, res) => {
    try{
        //get id parameter from query string
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch( error ) {
        res.status(500).json({message: error.message});
    }
});

//send data to the DB
router.post('/', async(req, res) => {
    try{
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});

//update product
router.put('/:id', async(req, res) => {
    try{
        //get id parameter from query string
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        //product doesn't exist in db
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`});
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);

    }catch( error ){
        res.status(500).json({message: error.message});
    }
});

//delete a product
router.delete('/:id', async(req, res) => {
    try{
        //get id parameter from query string
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`});
        }
        res.status(200).json({message: `product with ID : ${id} has been deleted successfully `});
    } catch( error ){
        res.status(500).json({messsdsdsage: error.message});
    }
});

module.exports = router;