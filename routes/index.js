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

router.post('/user/signup', passport.authenticate('local.signup', {
    seccessRedirect: '/profile',
    failureRedirect: '/signup',
    failureRedirect: true

}));

router.get('/user/profile', function(req, res){
    res.render('user/profile');
});

module.exports = router;
