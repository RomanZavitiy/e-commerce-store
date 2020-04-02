var express = require('express');
    router = express.Router(),
    Product = require('../models/product'),
    User     = require('../models/user');

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
