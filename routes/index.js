var express = require('express');
    router = express.Router(),
    Product = require('../models/product'),
    csrf    = require('csurf'),
    passport = require('passport'),
    User     = require('../models/user');
 
// var csrfProtection = csrf();
// router.use(csrfProtection);

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
    res.render('user/signup');
});


//Handle Sign Up Logic
router.post("/user/signup", function(req,res){
    var newUser = new User(
    {
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        avatar: req.body.avatar
    });
    //eval(require('locus'));
    // if(req.body.isAdmin === "LovesWeed123"){
    //     newUser.isAdmin = true;
    //}
    User.register(newUser, req.body.password, function(err,user){
        if(err){
            console.log(err);
            res.render('user/signup');
        }
        passport.authenticate('local')(req, res, function(){
            res.redirect('/user/profile');
        });
    });
});
//         if (err){
//             console.log(err);
//             req.flash("error", err.message);
//             return res.redirect("register");
//         }
//         passport.authenticate("local")(req, res, function(){
//             //req.flash("success", "Successfully Sign Up! Nice to meet you " + user.username);
//             res.redirect("/profile");
//         });
//     });
// });

//router.post('/user/signup', passport.authenticate('local.signup', {
    //seccessRedirect: '/user/profile',
    //failureRedirect: '/user/signup',
    //failureRedirect: true
//}));

router.get('/user/profile', function(req, res){
    res.render('user/profile');
});

module.exports = router;
