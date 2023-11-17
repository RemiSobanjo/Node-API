const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/productModel.js');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : false}));

//routes
app.get('/', (req, res) => {
    res.send('Hello NODE API');
});

app.get('/products', async(req, res) => {
    try{
        const products = await Product.find({});
        res.status(200).json(products);
    }catch( error ) {
        res.status(500).json({message: error.message});
    }
});

app.get('/products/:id', async(req, res) => {
    try{
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch( error ) {
        res.status(500).json({message: error.message});
    }
});

app.get('/blog', (req, res) => {
    res.send('Hello Blog, My name is Remi');
});

app.post('/products', async(req, res) => {
    try{
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});

//update product
app.put('/products/:id', async(req, res) => {
    try{
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
app.delete('/products/:id', async(req, res) => {
    try{
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

mongoose.
connect('mongodb+srv://admin:JhmLOqC8iVqxmtfb@fsaapi.zucf0dn.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(() => {
    console.log("DB Connection Successful");
    app.listen(3000, () => {
        console.log('Node API is running on port 3000');
    });
}).catch((error) => {
    console.log(error);
})