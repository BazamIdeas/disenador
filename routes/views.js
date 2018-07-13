var express = require("express");
var router = express.Router();
var controllers = require(".././controllers");
var compression = require('compression');
var middleware = require("./middleware");

router.use(compression());

// LANDING

router.use('/logos-de-:categoria', middleware.validarCategorias, controllers.vistas.ViewCategorias);

router.use('/logos-destacados', middleware.validarCategorias,  controllers.vistas.ViewCategorias);

router.use('/terminos-y-condiciones', function(req, res) {
    res.render('terminos.html');
});

router.use('/avisos-legales', function(req, res) {
    res.render('legales.html');
});

router.get('/', middleware.userAgent, middleware.validarLanding, controllers.vistas.ViewLanding);

module.exports = router;