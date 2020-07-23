require('dotenv').config();
const router = require('express').Router();
const Product = require('../models/product.model');
const jwt = require('jsonwebtoken');
const user={}
user.username="asif";
user.emailid="asif@gmail.com";
let refreshToken=[];
router.route('/createtoken').post((req,res)=>{
    const accessToken=generateAccessToken(user);
    refreshToken=jwt.sign(user, process.env.REFRESH_TOKEN_SECERET);
    
    res.json({accessToken:accessToken,refreshToken:refreshToken })
})

router.route('/add').post(authenticationToken,(req,res)=>{
    const productadd= new Product();
    productadd.productName=req.body.productName;
    productadd.Desc=req.body.Desc;
    productadd.productid=req.body.productid;

    productadd.save().then((data)=>{res.json(data)})
        .catch((err)=> console.log(err))
})
// .catch((err)=>{
//     console.log(`err: ${err}`);
// })

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

  function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECERET);
  }

module.exports=router;