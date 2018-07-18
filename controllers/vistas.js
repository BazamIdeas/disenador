var logo = require("../modelos/logosModelo.js");
const Etiqueta = require('../modelos/etiquetasModelo.js');
const langs = require("../langs/views.js").langs;
const planesLang = require("../langs/planes.js").langs;
var services = require('../services');

exports.ViewCategorias = function (req, res) {

	const categoriasService = services.categorias;

	var idLogo = req.body.idLogo ? req.body.idLogo : 0;
	var idCategoria = req.body.categoriaSeleccionada.idCategoria;
	req.lang = req.lang.toUpperCase();
	let lang = langs[req.lang];

	let dataEnviar = { 
		root: __dirname, title: req.body.categoriaSeleccionada.nombreCategoria, 
		categorias: req.body.categorias, 
		categoriaSeleccionada: req.body.categoriaSeleccionada, 
		idioma: lang.categoria_pagina, 
		lang: req.lang, 
		mostraretiquetaslogo: false, 
		categoriasPadre: req.body.categoriasPadre
	};

	//console.log('Buscar logos aprobados de ->  idCategoria:', idCategoria);

	logo.getLogosAprobadosCatPadre(idLogo, idCategoria, function (error, data) {
		if (typeof data !== "undefined" && data.length > 0) {

			//console.log('Logos encontrados')
			dataEnviar.logosPredisenados = categoriasService.bufferAndAttrs(data);
			res.render('categorias.html', dataEnviar);

		} else {

			console.log("No hay logos aprobados");

		}
	});
};

exports.ViewSubCategorias = function (req, res) {

	const categoriasService = services.categorias;

	var nombreCategoria = req.body.categoriaSeleccionada.nombreCategoria;

	var idLogo = req.body.idLogo ? req.body.idLogo : 0;

	var idCategoria = req.body.categoriaSeleccionada.idCategoria;

	req.lang = req.lang.toUpperCase();

	let dataEnviar = {
		root: __dirname,
		title: nombreCategoria, categorias: req.body.categorias, categoriaSeleccionada: req.body.categoriaSeleccionada,
		idioma: req.lang.categoria_pagina,
		lang: req.lang, mostraretiquetaslogo: false,
		categoriasPadre: false
	};

	dataEnviar.mostraretiquetaslogo = true;

	console.log('Buscar logos aprobados de ->  sub Categoria:', idCategoria);

	logo.getLogosAprobados(idLogo, idCategoria, function (error, data) {

		if (typeof data !== "undefined" && data.length > 0) {

			Etiqueta.ObtenerPorLogo(data, req.lang.toLowerCase(), (err, logos) => {

				dataEnviar.logosPredisenados = categoriasService.bufferAndAttrs(logos);

				res.render('categorias.html', dataEnviar);

			})

		} else {

			console.log("No hay logos aprobados");

		}
	});

};

exports.ViewLanding = function (req, res) {

	req.lang = req.lang.toUpperCase();

	let lang = langs[req.lang];

	/* TRADUCCIONES PLANES */

	lang.landing.secciones.seccion_cuatro.planes = planesLang[req.lang];

	res.render('index_landing.html', { categorias: req.body.categorias, categoriasFuentes: req.body.categoriasFuentes, idioma: lang.landing, lang: req.lang });

};