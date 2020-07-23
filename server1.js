const express = require('express');
//const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config;
const app= express();
app.use(express.json());
const port ="9090";
mongoDB="mongodb://localhost/product";
mongoose.connect(mongoDB, { useNewUrlParser: true });

//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const productGetRouter= require('./routers/Productget');
app.use('/product/get', productGetRouter);

app.listen(port, ()=>{
 console.log(`Running on the port ${port}`);
})