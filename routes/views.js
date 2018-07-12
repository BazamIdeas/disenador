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

router.get('/', middleware.userAgent, middleware.validarLanding, function(req, res) {

    let categorias = [];
    
    req.body.categorias.forEach(element => {
        if(element.categoriasFormateada != 'sin-categoria' && categorias.length < 12){
            categorias.push(element);
        }
    });

    console.log(req.body.categoriasFuentes)
    
    res.render('index_landing.html', {categorias: categorias, categoriasFuentes: req.body.categoriasFuentes});
});

module.exports = router;