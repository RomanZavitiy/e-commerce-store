var express = require('express');
    router = express.Router(),
    //models imported
    Product = require('../models/product'),
    Cart    = require('../models/cart')
    

// HOME PAGE WITH PRODUCTS
router.get('/', function(req, res) {
  // Get all campgrounds from DB
  var successMsg = req.flash('success')[0];
  Product.find({}, function(err, allProducts){
    if(err){
        console.log(err);
    } else {
        res.render("index", {products: allProducts, successMsg: successMsg, noMessages: !successMsg});
    }
    });
});

// ADD TO CART FUNCTION
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

// SHOW SHOPPING CART
router.get('/shopping-cart', function(req, res, next){
    if(!req.session.cart) {
        return res.render('shop/shopping-cart', {products: null});
    }
    var cart = new Cart(req.session.cart);
        res.render('shop/shopping-cart', {products: cart.generateArray(), totalQty: cart.totalQty, totalPrice: cart.totalPrice});
});

// SHOW CHECKOUT PAGE
router.get('/checkout', function(req, res, next){
    if(!req.session.cart) {
        return res.redirect('/shopping-cart');
    }
    var errMsg = req.flash('error')[0];
    var cart = new Cart(req.session.cart);
    res.render('shop/checkout', {total: cart.totalPrice, errMsg: errMsg, noError: !errMsg});
});

// CHARGING A CLIENT
router.post('/checkout', function(req, res, next){
    if(!req.session.cart) {
        return res.redirect('/shopping-cart');
    }
    
    var cart = new Cart(req.session.cart);

    var stripe = require('stripe')(
        'sk_test_TT9pzsGcMtTBzBlr7bCVTOEh001FX82p1O'
    );

    stripe.charges.create(
    {
        amount: cart.totalPrice * 100, // amount in grosz
        currency: 'pln',
        source: req.body.stripeToken,
        description: 'Test charge.', //obtained with Stripe.js
    },
    function(err, charge) {
        if(err){
            req.flash('error', err.message);
            return res.redirect('/checkout');
        }
        req.flash('success', 'Test purchase made with success');
        req.session.cart = null;
        res.redirect('/');
    });
});

module.exports = router;
