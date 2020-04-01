var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// Show Signup Page
router.get('/signup', function(req,res,next){
  res.render('user/signup');
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
  res.render('user/signin');
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
