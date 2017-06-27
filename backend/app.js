'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const validator = require('indicative');
const interceptor = require('express-interceptor');
const mung = require('express-mung');
const winston = require('winston');

winston.level = 'debug'

let Sessions = require('./routes/users/sessions/session.js');

const routes = require('./routes/index');
const operations = require('./routes/operations');
const organizations = require('./routes/organizations');
const organizationalUnits = require('./routes/organizational-units');
const persons = require('./routes/persons');
const emp = require('./routes/emp');
const issues = require('./routes/issues');
const components = require('./routes/components');
const subjects = require('./routes/use-case-subjects');
const useCases = require('./routes/use-cases');
const users = require('./routes/users');
const dict = require('./routes/dict');
const slices = require('./routes/use-case-slices');
const customers = require('./routes/customers');
const projects = require('./routes/projects');
const projectTeams = require('./routes/project-teams');
const projectMembers = require('./routes/project-members');
const systems = require('./routes/systems');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

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
  winston.log('info', { requestBody: req.body });
  console.log('Request timestamp:');
  console.log(new Date());
  
  res.io = io;
  
  if (req.params.id) {
    if (!validator.is.positive(req.params.id)) return res.status(400).end('id is invalid');
  }
  
  if (!validator.is.empty(req.body)) {
    console.log('Request body:');
    console.log(req.body);
  }

  if (req.url === '/api/users/login' || req.url === '/api/users/username' || req.url === '/json') next();
  else if (!validator.is.string(req.cookies.session)) return res.status(401).end();
  else isAuthentificated(req, res, next);
  
});

const finalParagraphInterceptor = interceptor(function(req, res){
  return {
    // Only HTML responses will be intercepted 
    isInterceptable: function(){
      return true;
    },
    // Appends a paragraph at the end of the response body 
    intercept: function(body, send) {
      return body, send;
    }
  };
});

app.use(mung.json(function transform(body, req, res) {

  console.log(body);

  return body;
}));

// Add the interceptor middleware 
// app.use(finalParagraphInterceptor);

// routes
app.use('/api', routes);
app.use('/api/operations', operations);
app.use('/api/issues', issues);
app.use('/api/dict', dict);
app.use('/api/components', components);
app.use('/api/use-case-subjects', subjects);
app.use('/api/use-cases', useCases);
app.use('/api/use-case-slices', slices);
app.use('/api/users', users);
app.use('/api/persons', persons);
app.use('/api/organizations', organizations);
app.use('/api/organizational-units', organizationalUnits);
app.use('/api/emp', emp);
app.use('/api/customers', customers);
app.use('/api/projects', projects);
app.use('/api/project-teams', projectTeams);
app.use('/api/project-members', projectMembers);
app.use('/api/systems', systems);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    console.error({
      err: err
    });
    res.status(err.status || 500);
    res.end();
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
/**
 * @desc This method validates 
 * @method isAuthentificated
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */
function isAuthentificated(req, res, next) {
  let _isAuthentificated = false;
  for (let i = 0; i < Sessions.length; i++) {
    if (Sessions[i].aToken === req.cookies.session) {
      req.session = {
        sessionID: Sessions[i].id,
        aToken: req.cookies.session,
        eUserID: Sessions[i].eUserID
      }
      _isAuthentificated = true;
      next();
      break;
    }
  }
  if (_isAuthentificated === false) {
    console.error(new Error(`session ${req.cookies.session} is expired(or invalid)`));
    return res .status(401).end('session is expired (or invalid)');
  }
}

module.exports = {app: app, server: server};
