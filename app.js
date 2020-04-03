var createError   = require('http-errors'),
    express       = require('express'),
    app           = express(),
    bodyParser    = require('body-parser');
    path          = require('path'),
    cookieParser  = require('cookie-parser'),
    logger        = require('morgan'),
    mongoose      = require('mongoose'),
    session       = require('express-session'),
    passport      = require('passport'),
    localStrategy = require("passport-local"),
    flash         = require('connect-flash'),
    MongoStore    = require('connect-mongo')(session),
    // models imported
    User          = require('./models/user');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');


// mongoose
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.connect("mongodb://localhost/OS");


// view engine setup
app.use(bodyParser.urlencoded({extended: true}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

// Passport Config
app.use(require("express-session")({
  secret: "secret, i mean it.",
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({mongooseConnection: mongoose.connection }),
  cookie: {maxAge: 180 * 60 * 1000} // 3 hours
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
  res.locals.login = req.isAuthenticated();
  req.locals.session = req.session;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

app.use('/', indexRouter);
app.use('/user', userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


