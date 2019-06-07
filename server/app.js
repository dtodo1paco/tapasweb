var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const { DatabaseError } = require('sequelize');
const db = require("./modules/setupModels");

var usersRouter = require('./routes/users');
var apiSetup = require('./routes/api');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/users', usersRouter);
//app.use('/api', apiRouter);
apiSetup(app, db);
app.get('/ping', function (req, res) {
  return res.send('pong');
});

if (process.env.NODE_ENV === 'production') {
  console.log("This is serious! You are in production mode")
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', function(req, res) {
    console.log(req.path)
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
} else {
  app.use(logger('dev'));
  console.log("... dev mode on ...");
  app.use(express.static(path.join(__dirname, 'public')));
}



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// database errors
app.use(function handleDatabaseError(error, req, res, next) {
  console.log("error type: " + JSON.stringify(Object.prototype));
  console.log("error name: " + error.constructor.name);
  console.log("error details: " + error);
  if (error instanceof DatabaseError) {
    return res.status(503).json({
      type: 'DatabaseError',
      message: error.message
    });
  }
  next(error);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({'error':err});
});

module.exports = app;
