const express = require('express');
//const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config;
const app= express();
app.use(express.json());
const port ="9091";
mongoDB="mongodb://localhost/productArray";
mongoose.connect(mongoDB, { useNewUrlParser: true });

//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const productPostRouter= require('./routers/Productpost');
app.use('/product/post', productPostRouter);

app.listen(port, ()=>{
 console.log(`Running on the port ${port}`);
})