var express = require('express');
    router = express.Router(),
    Product = require('../models/product'),
    csrf    = require('csurf'),
    passport = require('passport'),
    User     = require('../models/user');
 
// var csrfProtection = csrf();
// router.use(csrfProtection);

/* GET home page. */
router.get('/', function(req, res) {
  // Get all campgrounds from DB
  Product.find({}, function(err, allProducts){
    if(err){
        console.log(err);
    } else {
        res.render("index",{products: allProducts});
    }
    });
});

module.exports = router;
