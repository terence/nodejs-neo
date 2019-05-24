// Import Libraries
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

// NEO4J: DB Setup
const neo4j = require('neo4j-driver').v1;
//var conn = require('./env.js').connection
const driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "password"));
const session = driver.session();


// EXPRESS: Config
var app = express();
app.set ('port', 3000);


// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Make Neo4j session accessible to routers
app.use(function(req, res, next){
  req.session = session;
  next();
});



// EXPRESS: Routers
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var graphRouter = require('./routes/graph');
var sigmaRouter = require('./routes/sigma');
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/graph', graphRouter);
app.use('/sigma', sigmaRouter);


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

console.log("Server started");

module.exports = app;
