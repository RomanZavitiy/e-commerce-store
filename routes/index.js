const express = require('express');
    router = express.Router(),
    Product = require('../models/product'),
    Cart    = require('../models/cart'),
    Order   = require('../models/order'),
    stripe = require('stripe')('sk_test_TT9pzsGcMtTBzBlr7bCVTOEh001FX82p1O');
    

// HOME PAGE WITH PRODUCTS
router.get('/', async (req, res) => {
    try {
        const successMsg = req.flash('success')[0];
        const allProducts = await Product.find();
        res.render("index", {
            products: allProducts, 
            successMsg: successMsg, 
            noMessages: !successMsg
        });
    } catch (err) {
        console.error(err);
        req.flash('error', 'Error fetching products');
        res.redirect('/');
    }
});

// ADD TO CART FUNCTION
router.get('/add-to-card/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const cart = new Cart(req.session.cart ? req.session.cart : {});
        const product = await Product.findById(productId);
        
        cart.add(product, product.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        req.flash('error', 'Error adding product to cart');
        res.redirect('/');
    }
});

// REDUCE BY ONE FUNCTION
router.get('/reduce/:id', function(req, res, next){
    const productId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {} );

    cart.reduceByOne(productId);
    req.session.cart = cart;
    res.redirect('/shopping-cart');
});

// REMOVE ITEM
router.get('/remove/:id', function(req, res, next){
    const productId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {} );

    cart.removeItem(productId);
    req.session.cart = cart;
    res.redirect('/shopping-cart');
});

// SHOW SHOPPING CART
router.get('/shopping-cart', (req, res) => {
    if (!req.session.cart) {
        return res.render('shop/shopping-cart', {products: null});
    }
    const cart = new Cart(req.session.cart);
    res.render('shop/shopping-cart', {
        products: cart.generateArray(), 
        totalQty: cart.totalQty, 
        totalPrice: cart.totalPrice
    });
});

// SHOW CHECKOUT PAGE
router.get('/checkout', isLoggedIn, (req, res) => {
    if (!req.session.cart) {
        return res.redirect('/shopping-cart');
    }
    const errMsg = req.flash('error')[0];
    const cart = new Cart(req.session.cart);
    res.render('shop/checkout', {
        total: cart.totalPrice, 
        errMsg: errMsg, 
        noError: !errMsg
    });
});

// CHARGING A CLIENT
router.post('/checkout', isLoggedIn, async (req, res) => {
    if (!req.session.cart) {
        return res.redirect('/shopping-cart');
    }
    
    const cart = new Cart(req.session.cart);

    try {
        const charge = await stripe.charges.create({
            amount: cart.totalPrice * 100, // amount in grosz
            currency: 'pln',
            source: req.body.stripeToken,
            description: 'Test charge.'
        });

        const order = new Order({
            user: req.user,
            cart: cart,
            address: req.body.address,
            name: req.body.name,
            paymentId: charge.id
        });

        await order.save();
        req.flash('success', 'Test purchase made with success');
        req.session.cart = null;
        res.redirect('/');
    } catch (err) {
        console.error(err);
        req.flash('error', err.message);
        res.redirect('/checkout');
    }
});

function isLoggedIn (req, res, next) {
    if(req.isAuthenticated()){
      return next();
    } else {
        req.session.oldUrl = req.url;
        res.redirect('user/signin');
    }
}

module.exports = router; 