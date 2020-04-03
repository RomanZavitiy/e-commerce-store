var express = require('express');
    router = express.Router(),
    //models imported
    Product = require('../models/product');
    

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

router.get('/add-to-card/:id', function(req, res, next){
    var productId = req.params.id;
});

module.exports = router;
