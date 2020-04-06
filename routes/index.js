var express = require('express');
    router = express.Router(),
    //models imported
    Product = require('../models/product'),
    Cart    = require('../models/cart')
    

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
    var cart = new Cart(req.session.cart ? req.session.cart : {} );

    Product.findById(productId, function(err, product){
        if (err) {
            return res.redirect('/');
        }
        cart.add(product, product.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/');
    });
});

router.get('/shopping-cart', function(req, res, next){
    if(!req.session.cart) {
        return res.render('shop/shopping-cart', {products: null});
    }
    var cart = new Cart(req.session.cart);
        res.render('shop/shopping-cart', {products: cart.generateArray(), totalQty: cart.totalQty, totalPrice: cart.totalPrice});
});

router.get('/checkout', function(req, res, next){
    if(!req.session.cart) {
        return res.redirect('/shopping-cart');
    }
    var cart = new Cart(req.session.cart);
    res.render('shop/checkout', {total: cart.totalPrice});
});

module.exports = router;
