var passport = require('passport'),
    LocalStrategy = require('passport-local'),
    User = require('../models/user');

passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        done(err, user);
    });
});

passport.use('local.signup', new LocalStrategy({
    username: 'username',
    password: 'password',
    firstName: 'firstname',
    secondName: 'secondname',
    email: 'email',
    avatar: 'avatar',
    passReqToCallback: true
}, function(req, username, password, firstname, secondname, email, avatar, done){
    User.findOne({'email': email}, function(err, user){
        if (err){
            return done(err);
        }
        if (user){
            return done(null, false, {message: 'Sry, email is already in use.'});
        }
        var newUser = new User();
        newUser.username = username;
        newUser.password = new User.encryptPassword(password);
        newUser.firstname = firstname;
        newUser.secondname = secondname;
        newUser.email = email;
        newUser.avatar = avatar;
        newUser.save(function(err,result){
            if (err) {
                return done(err);
            }
            return done(null, newUser);
        });
    });
}));