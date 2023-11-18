require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const productRoute = require('./routes/productRoute.js');

const app = express();

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;

app.use(express.json());
app.use(express.urlencoded({extended : false}));

//routes

app.use('/api/products', productRoute);

app.get('/', (req, res) => {
    res.send('Hello NODE API');
});

app.get('/blog', (req, res) => {
    res.send('Hello Blog, My name is Remi');
});

mongoose.
connect(MONGO_URL)
.then(() => {
    console.log("DB Connection Successful");
    app.listen(PORT, () => {
        console.log(`Node API is running on port ${PORT}`);
    });
}).catch((error) => {
    console.log(error);
});