var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');

let db = require("./database/models");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var actorsRouter = require('./routes/actors');
var moviesRouter = require('./routes/movies');
var securityRouter = require('./routes/security');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret:'moviesdb', resave: false, saveUninitialized: false } ));

app.use(express.static(path.join(__dirname, 'public')));

const publicRoutes = [
  '/login', '/register'
]

app.use(function(req, res, next){
  if(req.cookies.userId != undefined && req.session.user == undefined){
    db.User.findByPk(req.cookies.userId)
    .then( user => {
      req.session.user = user;
      return next();
    })
    .catch( e => { next(createError(e.status)) })
  } else {
    next()
  }
})

app.use(function(req, res, next){
  if(req.session.user != undefined){
    res.locals.user = req.session.user;
  } else {
    if (!publicRoutes.includes(req.path)) {
      return res.redirect('/login')
    }
  }
  next();
});

app.use('/', indexRouter);
app.use('/', securityRouter);
app.use('/users', usersRouter);
app.use('/actors', actorsRouter);
app.use('/movies', moviesRouter);

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
