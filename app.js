var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


//var index = require('./public/');
var rutas = require('./routes/routes.js');


var app = express();

app.use('/', express.static(__dirname + '/public/'))

app.use('/angular', express.static(__dirname + '/node_modules/angular'))
app.use('/angular-material', express.static(__dirname + '/node_modules/angular-material'))
app.use('/angular-messages', express.static(__dirname + '/node_modules/angular-messages'))
app.use('/angular-animate', express.static(__dirname + '/node_modules/angular-animate'))
app.use('/angular-aria', express.static(__dirname + '/node_modules/angular-aria'))
app.use('/angular-ui-router', express.static(__dirname + '/node_modules/angular-ui-router/release'))
app.use('/assets', express.static(__dirname + '/public/creador-de-logos/assets'))
app.use('/angular-color-picker', express.static(__dirname + '/node_modules/angular-color-picker'))





app.use('/app',rutas);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

app.listen(8080);
