const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();
const route = require('./routes');
const session = require("express-session");
const passport = require('passport');
const flash = require('connect-flash');
// view engine setup
app.set('views', path.join(__dirname, 'views'));





app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


//session setup
app.use(session({ secret: process.env.SESSION_SECRET_STRING, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// setup flash msg
app.use(flash());

app.use('/public', express.static('public'))

//Config template engine
app.set('views', path.join(__dirname, 'resources', 'views'));

//routes init
route(app);

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
