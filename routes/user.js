var express = require('express');
    router = express.Router(),
    passport = require('passport'),
    csrf    = require('csurf');


var csrfProtection = csrf();
router.use(csrfProtection);

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
          //req.flash("success", "Successfully Sign Up! Nice to meet you " + user.username);
          res.redirect('/user/profile');
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
      successRedirect: '/user/profile',
      failureRedirect: '/user/signin',
       failureFlash: true,
      successFlash: "Welcome to noNameShop !"
  }), function(req, res){        
});

//Show User Profile
router.get('/profile', function(req, res){
  res.render('user/profile');
});

module.exports = router;
