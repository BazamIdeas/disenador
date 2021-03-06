var logo = require("../modelos/logosModelo.js");
const Etiqueta = require('../modelos/etiquetasModelo.js');
const langs = require("../langs");
var services = require('../services');

var atributo = require("../modelos/atributosModelo.js");
var base64 = require("base-64");
var async = require("async");

exports.ViewCategorias = function (req, res) {

	const categoriasService = services.categorias;

	var idLogo = req.body.idLogo ? req.body.idLogo : 0;
	var idCategoria = req.body.idCategoria ? req.body.idCategoria : 0;
	let dataEnviar;

	if (!req.body.idLogo && !req.body.idCategoria) {

		idCategoria = req.body.categoriaSeleccionada.idCategoria;
		req.lang = req.lang.toUpperCase();
		let lang = langs.views[req.lang].categoria_pagina;
		let idiomas = langs.langs[req.lang];

		let catTraducciones = JSON.stringify(req.body.categoriaSeleccionada.traducciones);

		dataEnviar = {
			root: __dirname, title: req.body.categoriaSeleccionada.nombreCategoria,
			categorias: req.body.categorias,
			categoriaSeleccionada: req.body.categoriaSeleccionada,
			idioma: lang,
			idiomas: idiomas,
			lang: req.lang,
			mostraretiquetaslogo: false,
			categoriasPadre: req.body.categoriasPadre,
			urls_categorias: catTraducciones,
			subcategoria: false
		};

	}

	//console.log('Buscar logos aprobados de ->  idCategoria:', idCategoria);

	logo.getLogosAprobadosCatPadre(idLogo, idCategoria, function (error, data) {
		if (typeof data !== "undefined" && data.length > 0) {

			async.forEachOf(data, (logo, key, callback) => {

				logo.svg = base64.decode(logo.logo);
				logo.svg = logo.svg.replace(/"/g, "'");
				logo.padre = idCategoria;

				if (logo.nombreCategoria) {
					categoriaLogo = categoriasService.formatearCategorias([{ idCategoria: logo.idCategoria, nombreCategoria: logo.nombreCategoria }], req.lang)[0];

					logo.categoriaFormateada = categoriaLogo.categoriaFormateada;
					logo.traduccion = categoriaLogo.traduccion.label;
				}

				atributo.ObtenerPorLogo(logo.idLogo, function (err, dataAttrs) {

					if (err) return callback(err);

					try {

						if (typeof dataAttrs !== "undefined" && dataAttrs.length > 0) {
							data[key]["atributos"] = dataAttrs;
						}

					} catch (e) {
						return callback(e);
					}

					callback();

				});

			}, (err) => {

				if (err) res.status(402).json({});

				if (!req.body.idLogo && !req.body.idCategoria) {
					dataEnviar.logosPredisenados = data;

					res.render('categorias.html', dataEnviar);
				} else {
					res.status(200).json(data);
				}

			});
		} else {

			if (!req.body.idLogo && !req.body.idCategoria) {
				res.redirect('/creador-de-logos');
			} else {
				res.status(404).json({ msg: "No hay logos aprobados" });
			}
		}
	});
};

exports.ViewSubCategorias = function (req, res) {

	const categoriasService = services.categorias;

	var idLogo = req.body.idLogo ? req.body.idLogo : 0;
	var idCategoria = req.body.idCategoria ? req.body.idCategoria : 0;
	let dataEnviar;

	if (!req.body.idLogo && !req.body.idCategoria) {

		idCategoria = req.body.categoriaSeleccionada.idCategoria;
		req.lang = req.lang.toUpperCase();
		let lang = langs.views[req.lang].categoria_pagina;
		let idiomas = langs.langs[req.lang];

		let catTraducciones = JSON.stringify(req.body.categoriaSeleccionada.traducciones);

		dataEnviar = {
			root: __dirname, title: req.body.categoriaSeleccionada.nombreCategoria,
			categorias: req.body.categorias,
			categoriaSeleccionada: req.body.categoriaSeleccionada,
			idioma: lang,
			idiomas: idiomas,
			lang: req.lang,
			mostraretiquetaslogo: true,
			categoriasPadre: false,
			urls_categorias: catTraducciones,
			subcategoria: true
		};

	}

	//console.log('Buscar logos aprobados de ->  sub Categoria:', idCategoria);

	// COLOCAR CATEGORIA PADRE

	logo.getLogosAprobados(idLogo, idCategoria, function (error, data) {

		if (typeof data !== "undefined" && data.length > 0) {

			Etiqueta.ObtenerPorLogo(data, req.lang.toLowerCase(), (err, logos) => {

				async.forEachOf(logos, (logo, key, callback) => {

					logo.svg = base64.decode(logo.logo);
					logo.svg = logo.svg.replace(/"/g, "'");

					if (logo.nombreCategoria) {
						logo.categoriaFormateada = categoriasService.formatearCategorias([{ nombreCategoria: logo.nombreCategoria }])[0].categoriaFormateada;
					}



					atributo.ObtenerPorLogo(logo.idLogo, function (err, dataAttrs) {

						if (err) return callback(err);

						try {

							if (typeof dataAttrs !== "undefined" && dataAttrs.length > 0) {
								data[key]["atributos"] = dataAttrs;
							}

						} catch (e) {
							return callback(e);
						}

						callback();

					});

				}, (err) => {

					if (err) res.status(402).json({});

					if (!req.body.idLogo && !req.body.idCategoria) {
						dataEnviar.logosPredisenados = data;

						res.render('categorias.html', dataEnviar);
					} else {
						res.status(200).json(data);
					}

				});

			})

		} else {

			if (!req.body.idLogo && !req.body.idCategoria) {
				res.redirect('/creador-de-logos');
			} else {
				res.status(404).json({ msg: "No hay logos aprobados" });
			}
		}
	});

};

exports.ViewLanding = function (req, res) {

	req.lang = req.lang.toUpperCase();

	let lang = langs.views[req.lang].landing;

	let idiomas = langs.langs[req.lang];

	/* TRADUCCIONES PLANES */
	lang.secciones.seccion_cuatro.planes = langs.planes[req.lang];

	res.render('index_landing.html', { categorias: req.body.categorias, categoriasFuentes: req.body.categoriasFuentes, idioma: lang, lang: req.lang, idiomas: idiomas });

};