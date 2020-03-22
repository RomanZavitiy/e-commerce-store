var express = require('express');
    router = express.Router(),
    Product = require('../models/product'),
    csrf    = require('csurf'),
    csrfProtection = csrf();

router.use(csrfProtection);

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

router.get('/user/signup', function(req,res,next){
    res.render('user/signup', {csrfToken: req.csrfToken()});
});

router.post('/user/signup', function(req, res, next){
    res.redirect('/');
});

module.exports = router;
