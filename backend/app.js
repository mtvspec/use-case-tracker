'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

const routes = require('./routes/index');
const users = require('./routes/users');
const persons = require('./routes/persons');
const organizations = require('./routes/organizations');
const projects = require('./routes/projects');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  if (req.url === '/api/users/login' ||
  req.url === '/api/users/username') {
    next();
  } else {
    isAuthentificated(req, req.cookies.session, res);
    next();
  }
});

app.use('/api', routes);
app.use('/api/users', users);
app.use('/api/persons', persons);
app.use('/api/organizations', organizations);
app.use('/api/projects', projects);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    console.log({
      err: err,
      stack: err.stack
    });
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

function isAuthentificated(req, sessionID, res) {
  if (!sessionID) {
    return res.status(401).end();
  }
  let Session = {
    id: sessionID
  }
  req.Session = Session;
}

module.exports = app;
