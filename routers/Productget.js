require('dotenv').config();
const router = require('express').Router();
const Product = require('../models/product.model');
const jwt= require('jsonwebtoken');
let refreshToken=[];


router.route('/').get(authenticationToken,(req,res)=>{
    Product.find().then((products)=>{
        res.json(products)})
        .catch((err)=> console.log(err))
});
router.route('/addfromserver').post((req,res)=>{
    const productadd= new Product();
    productadd.productName=req.body.productName;
    productadd.Desc=req.body.Desc;
    productadd.productid=req.body.productid;

    productadd.save().then((data)=>{res.json(data)})
        .catch((err)=> console.log(err))
});

function authenticationToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401);
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECERET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  }

module.exports=router;