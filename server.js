const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/productModel.js');
const app = express();

app.use(express.json());

//routes
app.get('/', (req, res) => {
    res.send('Hello NODE API');
});

app.get('/blog', (req, res) => {
    res.send('Hello Blog, My name is Remi');
});

app.post('/product', async(req, res) => {
    try{
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
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