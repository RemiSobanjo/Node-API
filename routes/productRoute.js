const express = require('express');
const router = express.Router();
const Product = require('../models/productModel.js');
const {getProducts, getSingleProduct, createProduct, updateProduct, deleteProdcut} = 
require('../controllers/productControllers.js');

//retrieve all products from DB
router.get('/', getProducts);

//retrieve specific product from DB by ID
router.get('/:id', getSingleProduct);

//send data to the DB
router.post('/', createProduct);

//update product
router.put('/:id', updateProduct);

//delete a product
router.delete('/:id', deleteProdcut);

module.exports = router;