var express = require("express");
var router = express.Router();
var controllers = require(".././controllers");
var multipart = require("connect-multiparty");
var compression = require('compression');

router.use(compression());

// LANDING

router.use('/logos-de-:categoria', controllers.vistas.ViewCategorias);

router.use('/terminos-y-condiciones', function(req, res) {
    res.render('terminos.html');
});

router.use('/avisos-legales', function(req, res) {
    res.render('legales.html');
});

module.exports = router;