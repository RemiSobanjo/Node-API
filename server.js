const express = require('express');
const mongoose = require('mongoose');
const app = express();

//routes
app.get('/', (req, res) => {
    res.send('Hello NODE API');
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