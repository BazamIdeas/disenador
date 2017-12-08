var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var configuracion = require('./configuracion.js');
var compression = require('compression');
//var index = require('./public/');

var rutas = require('./routes/routes.js');


var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(compression());

app.use('/fuentes', express.static(__dirname + '/fuentes'))


app.use('/angular', express.static(__dirname + '/node_modules/angular'))
app.use('/angular-material', express.static(__dirname + '/node_modules/angular-material'))
app.use('/angular-messages', express.static(__dirname + '/node_modules/angular-messages'))
app.use('/angular-animate', express.static(__dirname + '/node_modules/angular-animate'))
app.use('/angular-aria', express.static(__dirname + '/node_modules/angular-aria'))
//app.use('/angularfire', express.static(__dirname + '/node_modules/angularfire/dist'))
//app.use('/firebase', express.static(__dirname + '/node_modules/firebase'))
app.use('/angular-ui-router', express.static(__dirname + '/node_modules/angular-ui-router/release'))
app.use('/assets', express.static(__dirname + '/public/creador-de-logos/assets'))
app.use('/angular-color-picker', express.static(__dirname + '/node_modules/angular-color-picker'))
app.use('/angular-colorpicker-directive', express.static(__dirname + '/node_modules/angular-colorpicker-directive'))
app.use('/angular-base64', express.static(__dirname + '/node_modules/angular-base64'))
app.use('/angular-social', express.static(__dirname + '/node_modules/angular-socialshare/dist'))
app.use('/angular-sweetalert', express.static(__dirname + '/node_modules/angular-sweetalert'))
app.use('/sweetalert', express.static(__dirname + '/node_modules/sweetalert/lib'))
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'))
app.use('/save-svg-as-png', express.static(__dirname + '/node_modules/save-svg-as-png'))
app.use('/ng-file-upload', express.static(__dirname + '/node_modules/ng-file-upload/dist'))



app.use('/app',rutas);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.disable('x-powered-by');

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({ error: err.message });
});

app.listen(configuracion.puerto, function () {
  console.log('Servidor corriendo en : '+configuracion.servidor);
});
module.exports = app;