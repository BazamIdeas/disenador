var logo = require("../modelos/logosModelo.js");
var atributo = require("../modelos/atributosModelo.js");
var async = require("async");
var base64 = require("base-64");
var fs = require('fs');
const Etiqueta = require('../modelos/etiquetasModelo.js');
const svg2png = require("svg2png");
const langs = require("../langs/views.js").langs;
var pais     = require("../modelos/paisesModelo.js");
var plan     = require("../modelos/planesModelo.js");
var precio   = require("../modelos/preciosModelo.js");
var caracteristica = require("../modelos/caracteristicasModelo.js");
var services = require("../services");
var async    = require("async");

exports.ViewCategorias = function (req, res) {

	var nombreCategoria = req.body.categoriaSeleccionada.nombreCategoria != 'Sin categoria' ? req.body.categoriaSeleccionada.nombreCategoria : 'destacados';

	console.log(req.body.categoriaSeleccionada);

	var idLogo = req.body.idLogo ? req.body.idLogo : 0;
	var idCategoria = req.body.categoriaSeleccionada ? req.body.categoriaSeleccionada.idCategoria : 0;
	req.lang = req.lang.toLowerCase();
	let lang = langs[req.lang];

	let dataEnviar = { root: __dirname, title: nombreCategoria, categorias: req.body.categorias, categoriaSeleccionada: req.body.categoriaSeleccionada, idioma: lang.categoria_pagina, lang:  req.lang};

	logo.getLogosAprobados(idLogo, idCategoria, function (error, data) {

		if (typeof data !== "undefined" && data.length > 0) {

			Etiqueta.ObtenerPorLogo(data, req.lang, (err, logos) => {

				data = logos;

				async.forEachOf(data, (logo, key, callback) => {

					logo.svg = base64.decode(logo.logo);
					logo.svg = logo.svg.replace(/"/g, "'");
					let nombre = logo.idLogo + ".svg";
					const path = "public/tmp/shared/";
					let ancho = 200;

					var buffer = new Buffer(base64.decode(logo.logo).replace("/fuentes/", req.protocol + "://" + req.headers.host + "/fuentes/"));

					fs.open(path + nombre, "w", (err, fd) => {
						if (err) throw "error al crear svg " + err;

						fs.write(fd, buffer, 0, buffer.length, null, err => {
							if (err) throw "error al escribir " + err;

							let svg = path + nombre;

							var pngout = svg.replace("svg", "jpg");

							fs.readFile(svg, (err, svgbuffer) => {
								if (err) throw err;
								svg2png(svgbuffer, {
									width: ancho
								})
									.then(buffer => {
										fs.writeFile(pngout, buffer, (err) => {
											setTimeout(() => {
												logo.imgSrc = nombre.replace("svg", "jpg");

												//console.log(logo)

												// __dirname + "/../" + path + 

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
											}, 1000)
										});
									})
									.catch(e => console.log('error'));
							});

							fs.close(fd);
						});
					});

				}, (err) => {

					if (err) res.status(402).json(err);

					dataEnviar.logosPredisenados = data;

					res.render('categorias.html', dataEnviar);
				});

			})

		} else {

			console.log("No hay logos aprobados");

			res.redirect(301, '/logos-destacados');

		}
	});

};

exports.ViewLanding = function(req, res) {

	var iso = services.geoipServices.iso(req.headers["x-forwarder-for"]);

	pais.ObtenerPorIso(iso, (err, pais) => {

		if (err) res.status(400).json({});

		if (pais.length) {

			var json = pais[0];

			json.monedaDefault = {idMoneda: json.idMoneda ,codigo : json.moneda};

			delete json["idMoneda"]; 
			delete json["moneda"]; 
		
			plan.ListarPorPais(json.idPais, (err, planes) => {

				if (err) res.status(401).json({});

				if (planes.length) {

					json.planes = planes;

					async.forEachOf(json.planes, (plan, key, callback) => {

						precio.ListarPorPlan(json.idPais, plan.idPlan, (err, precios) => {
							
							if (err) return callback(err);

							try {

								if (precios.length) {

									json.planes[key].precios = precios;
								
								}

								caracteristica.ObtenerPorPlan(plan.idPlan, (err, caracteristicas) => {
							
									if (err) return callback(err);
		
									try {
		
										if (caracteristicas.length) {
		
											json.planes[key].caracteristicas = caracteristicas;
										
										}								
									
									} catch (e) {
										return callback(e);
									}
		
									callback();
								});
					
							} catch (e) {
								return callback(e);
							}
						});

					}, (err) => {
						
						if (err) res.status(402).json({});

						req.lang = req.lang.toLowerCase();

						let lang = langs[req.lang];
						let categorias = [];

						
						req.body.categorias.forEach(element => {
							if(element.categoriasFormateada != 'sin-categoria' && categorias.length < 12){
								categorias.push(element);
							}
						});

						lang.landing.secciones.seccion_cuatro.planes = json.planes;
						
						res.render('index_landing.html', {categorias: categorias, categoriasFuentes: req.body.categoriasFuentes, idioma: lang.landing, lang: req.lang });
					
					});
				
				}else{

					res.status(200).json({"msg": "No se encuentran planes para el pais"});

				}
			
			});
		
		}else{

			res.status(200).json({"msg": "No se encuentra el pais"});

		}


	
	});

};