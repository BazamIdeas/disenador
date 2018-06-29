var express = require("express");
var router = express.Router();
var controllers = require(".././controllers");
var multipart = require("connect-multiparty");
var compression = require('compression');

router.use(compression());

// LANDING

router.use('/logos-de-:categoria', controllers.vistas.ViewCategorias);

module.exports = router;