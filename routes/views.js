var express = require("express");
var router = express.Router();
var controllers = require(".././controllers");
var compression = require("compression");
var middleware = require("./middleware");

router.use(compression());

// VISTAS DEL SERVIDOR

// ES

router.get("/logos-de-:categoria", middleware.validarCategorias,controllers.vistas.ViewCategorias);

// EN

router.get("/logos-of-:categoria", middleware.validarCategorias,controllers.vistas.ViewCategorias);

// PT

router.get("/logotipos-de-:categoria", middleware.validarCategorias,controllers.vistas.ViewCategorias);


router.get("/logos/:subcategoria", middleware.validarSubCategorias, controllers.vistas.ViewSubCategorias);

router.get("/terminos-y-condiciones", function(req, res) {
	res.render("terminos.html");
});

router.get("/avisos-legales", function(req, res) {
	res.render("legales.html");
});

router.get("/404", function(req, res) {
	res.render("404.html");
});
router.get("/", middleware.userAgent, middleware.validarLanding, controllers.vistas.ViewLanding);

router.post("/logos/categoria", controllers.vistas.ViewCategorias);

router.post("/logos/subcategoria", controllers.vistas.ViewSubCategorias);

module.exports = router;