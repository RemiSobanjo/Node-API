require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const productRoute = require('./routes/productRoute.js');
//const userRoute = require('./routes/userRoute.js');
const errorMiddleware = require('./middleware/errorMiddleware');
const cors = require('cors')

const app = express();

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;
const FRONTEND = process.env.FRONTEND;

var corsOptions = {
    origin: FRONTEND,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended : false}));

//routes

app.use('/api/products', productRoute);
//app.use('/api/users',userRoute);

app.get('/', (req, res) => {
    res.send('Hello NODE API');
});

app.get('/blog', (req, res) => {
    res.send('Hello Blog, My name is Remi');
});

app.use(errorMiddleware);

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