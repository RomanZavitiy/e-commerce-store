var express = require('express');
    router = express.Router(),
    passport = require('passport'),
    csrf    = require('csurf');

    Cart    = require('../models/cart'),
    Order   = require('../models/order');

var csrfProtection = csrf();
router.use(csrfProtection);



//Show User Profile
router.get('/profile', isLoggedIn, function(req, res){
  Order.find({user: req.user}, function(err, orders) {
    if (err) {
        return res.write('Error!');
    }
    var cart;
    orders.forEach(function(order) {
        cart = new Cart(order.cart);
        order.items = cart.generateArray();
    });
    res.render('user/profile', { orders: orders });
  });
});

//Logout
router.get('/logout', isLoggedIn, function(req, res){
  req.logout();
  //req.flash("success", "Logged you out!"); // problem by signing in and going to / appears this flash, why? 
  res.redirect('/');
});

router.use('/', notLoggedIn, function(req, res, next){
  next();
});

// Show Signup Page
router.get('/signup', function(req,res,next){
  res.render('user/signup', {csrfToken: req.csrfToken()});
});

//Handle Sign Up Logic
router.post("/signup", function(req,res){
  var newUser = new User(
  {
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      avatar: req.body.avatar
  });
  //eval(require('locus'));
   if(req.body.isAdmin === "LovesWeed123"){
      newUser.isAdmin = true;
  }
  User.register(newUser, req.body.password, function(err,user){
      if(err){
          console.log(err);
          //req.flash("error", err.message);
          res.render('user/signup');
      }
      passport.authenticate('local')(req, res, function(){
        if (req.session.oldUrl) {
          var oldUrl = req.session.oldUrl;
          req.session.oldUrl = null;
          res.redirect(oldUrl);
        } else  {
          res.redirect('user/profile');
          //req.flash("success", "Successfully Sign Up! Nice to meet you " + user.username);
        }
      });
  });
});

//Show Signin Page
router.get('/signin',function(req,res){
  res.render('user/signin', {csrfToken: req.csrfToken()});
});

//Handle Signin Logic
router.post('/signin', passport.authenticate('local', 
  {
      failureRedirect: '/user/signin',
      failureFlash: true,
  }), function(req, res, next){
    if (req.session.oldUrl) {
      var oldUrl = req.session.oldUrl;
      req.session.oldUrl = null;
      res.redirect(oldUrl);
    } else {
      res.redirect('user/profile');
    }
});

module.exports = router;

// middleware 
function isLoggedIn (req, res, next) {
  if(req.isAuthenticated()){
    return next();
  } else {
    res.redirect('/');
  }
}

function notLoggedIn (req, res, next) {
  if(!req.isAuthenticated()){
    return next();
  } else {
    res.redirect('/');
  }
}