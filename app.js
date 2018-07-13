var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var configuracion = require('./configuracion/configuracion.js');
var compression = require('compression');
var middleware = require("./routes/middleware.js");
var rutas = require('./routes/routes.js');
var views = require('./routes/views.js');
const expressNunjucks = require('express-nunjucks');

var app = express();

const njk = expressNunjucks(app, {
  watch: true,
  noCache: true
});

var startConnection = require('./modelos/mongo').startConnection;

let init = async function() {
  try {
    global.__mongoClient = await startConnection();
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(middleware.langCookie);    
    app.use(compression());
    app.use('', middleware.userAgent, express.static(path.join(__dirname, 'public')));
    app.enable('trust proxy');
    app.use(configuracion.base+'/fuentes', express.static(__dirname + '/fuentes'))
    app.use('/m/fuentes', express.static(__dirname + '/fuentes'))
    app.use('/fuentes', express.static(__dirname + '/fuentes'))
    app.use('/avatares', express.static(__dirname + '/avatares'))
    
    app.use('/angular', express.static(__dirname + '/node_modules/angular'))
    app.use('/angular-material', express.static(__dirname + '/node_modules/angular-material'))
    app.use('/angular-messages', express.static(__dirname + '/node_modules/angular-messages'))
    app.use('/angular-animate', express.static(__dirname + '/node_modules/angular-animate'))
    app.use('/angular-aria', express.static(__dirname + '/node_modules/angular-aria'))
    app.use('/angular-ui-router', express.static(__dirname + '/node_modules/angular-ui-router/release'))
    app.use('/assets', express.static(__dirname + '/public/creador-de-logos/assets'))
    app.use('/angular-base64', express.static(__dirname + '/node_modules/angular-base64'))
    app.use('/angular-social', express.static(__dirname + '/node_modules/angular-socialshare/dist'))
    app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'))
    app.use('/save-svg-as-png', express.static(__dirname + '/node_modules/save-svg-as-png'))
    app.use('/ng-file-upload', express.static(__dirname + '/node_modules/ng-file-upload/dist'))
    app.use('/angular-sweetalert', express.static(__dirname + '/node_modules/angular-sweetalert'))
    app.use('/sweetalert', express.static(__dirname + '/node_modules/sweetalert/lib'))
    app.use('/angular-ui-carousel', express.static(__dirname + '/node_modules/angular-ui-carousel/dist'))
    app.use('/angularjs-dragula', express.static(__dirname + '/node_modules/angularjs-dragula/dist'))
    
    app.use('/app',rutas);

    app.use('/',views);
     
    app.use(configuracion.base+'*', function(req, res, next) {
      res.sendFile('/public/'+configuracion.base+'/index.html', { root: __dirname });
    });
    
/*     app.use('/logos-de-:categoria', function(req, res, next) {
      // Just send the index.html for other files to support HTML5Mode
      res.render('index', { root: __dirname, title: req.params.categoria, categorias: ['Prueba', 'Prueba 2'] })
    });
     */
    
    app.use('/m/*', function(req, res, next) {
      // Just send the index.html for other files to support HTML5Mode
      res.sendFile('/public/m/index.html', { root: __dirname });
    });
    
    app.use('/freelance/*', function(req, res, next) {
      // Just send the index.html for other files to support HTML5Mode
      res.sendFile('/public/freelance/index.html', { root: __dirname });
    });
    
    app.use('/administrador/*', function (req, res, next) {
      // Just send the index.html for other files to support HTML5Mode
      res.sendFile('/public/administrador/index.html', { root: __dirname });
    });
    
    app.use('/email/*', function (req, res, next) {
      // Just send the index.html for other files to support HTML5Mode
      res.sendFile('/email-templates/clienteRegistradoPorRedes.html', { root: __dirname });
    });
    
    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
      var err = new Error('No se encuentra');
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

  } catch (error) {
    console.log(error);
    throw error;
  }
}


// Iniciar la aplicacion
init();