const express = require('express');
    router = express.Router(),
    passport = require('passport'),
    csrf    = require('csurf');
    User = require('../models/user'),
    Cart    = require('../models/cart'),
    Order   = require('../models/order');

const csrfProtection = csrf();
router.use(csrfProtection);

//Show User Profile
router.get('/profile', isLoggedIn, async (req, res) => {
  try {
      const orders = await Order.find({user: req.user});
      orders.forEach(order => {
          const cart = new Cart(order.cart);
          order.items = cart.generateArray();
      });
      res.render('user/profile', { orders: orders });
  } catch (err) {
      console.error(err);
      req.flash('error', 'Error fetching orders');
      res.redirect('/');
  }
});

//Logout
router.get("/logout", function(req, res){
  req.logout();
  req.flash("success", "Logged you out!");
  res.redirect("/");
});

router.use('/', notLoggedIn, (req, res, next) => {
  next();
});

// Show Signup Page
router.get('/signup', (req, res) => {
  res.render('user/signup', {csrfToken: req.csrfToken()});
});

//Handle Sign Up Logic
router.post("/signup", async (req, res) => {
  try {
      const newUser = new User({
          username: req.body.username,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          avatar: req.body.avatar
      });

      if (req.body.isAdmin === "LovesWeed123") {
          newUser.isAdmin = true;
      }

      const user = await User.register(newUser, req.body.password);
      await new Promise((resolve, reject) => {
          passport.authenticate('local')(req, res, function(err) {
              if (err) reject(err);
              else resolve();
          });
      });

      if (req.session.oldUrl) {
          const oldUrl = req.session.oldUrl;
          req.session.oldUrl = null;
          res.redirect(oldUrl);
      } else {
          res.redirect('user/profile');
      }
  } catch (err) {
      console.error(err);
      req.flash("error", err.message);
      res.render('user/signup');
  }
});

//Show Signin Page
router.get('/signin', (req, res) => {
  res.render('user/signin', {csrfToken: req.csrfToken()});
});

//Handle Signin Logic
router.post('/signin', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
      if (err) { return next(err); }
      if (!user) { 
          req.flash('error', info.message);
          return res.redirect('/user/signin'); 
      }
      req.logIn(user, (err) => {
          if (err) { return next(err); }
          if (req.session.oldUrl) {
              const oldUrl = req.session.oldUrl;
              req.session.oldUrl = null;
              return res.redirect(oldUrl);
          } else {
              return res.redirect('user/profile');
          }
      });
  })(req, res, next);
});

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

module.exports = router;