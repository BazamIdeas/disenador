var logo = require("../modelos/logosModelo.js");
var atributo = require("../modelos/atributosModelo.js");
var async = require("async");
var base64 = require("base-64");
var fs = require('fs');
const Etiqueta = require('../modelos/etiquetasModelo.js');
const svg2png = require("svg2png");

exports.ViewCategorias = function (req, res) {

	var nombreCategoria = req.body.categoriaSeleccionada.nombreCategoria != 'Sin categoria' ? req.body.categoriaSeleccionada.nombreCategoria : 'destacados';
	var idLogo = req.body.idLogo ? req.body.idLogo : 0;
	var idCategoria = 6;

	let dataEnviar = { root: __dirname, title: nombreCategoria, categorias: req.body.categorias, categoriaSeleccionada: req.body.categoriaSeleccionada };

	logo.getLogosAprobados(idLogo, idCategoria, function (error, data) {

		if (typeof data !== "undefined" && data.length > 0) {

			Etiqueta.ObtenerPorLogo(data, req.cookies.lang || 'es', (err, logos) => {

				console.log(logos)

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