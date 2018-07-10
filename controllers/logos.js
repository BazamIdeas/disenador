var logo = require("../modelos/logosModelo.js");
var atributo = require("../modelos/atributosModelo.js");
var elemento = require("../modelos/elementosModelo.js");
var cliente = require("../modelos/clientesModelo.js");
var caracteristica = require("../modelos/caracteristicasModelo.js");
var pedido = require("../modelos/pedidosModelo.js");
var services = require("../services");
var Email = require("../services/emailServices.js");
var fs = require("pn/fs");
var moment = require("moment");
var base64 = require("base-64");
const svg2png = require("svg2png");
var archiver = require("archiver");
var pathM = require("path");
var async = require("async");
var config = require("../configuracion/configuracion.js");
const fse = require('fs-extra')

//GUARDAR UN LOGO
exports.guardar = function (req, res) {
	//creamos un objeto con los datos a insertar del pedido
	var idCategoria = req.body.idCategoria ? req.body.idCategoria : 22;
	var estado = "Editable";

	switch (req.body.estado) {
		case "Borrador":
			estado = "Borrador";
			break;
		case "Por Aprobar":
			estado = "Por Aprobar";
			break;
	}

	var logoData = {
		idLogo: null,
		estado: estado,
		logo: req.body.logo,
		tipoLogo: req.body.tipoLogo,
		clientes_idCliente: req.idCliente,
		categorias_idCategoria: idCategoria
	};

	logo.insertLogo(logoData, function (error, data) {

		//si el pedido se ha insertado correctamente mostramos su info
		if (data && data.insertId) {

			var atributos = req.body.atributos;

			for (var key in atributos) {

				var atributosData = {
					clave: key,
					valor: atributos[key],
					logos_idLogo: data.insertId
				};

				atributo.Guardar(atributosData, function (error, data) {
					if (error)  console.log(err);

				});

			}

			cliente.getCliente(req.idCliente, function (error, dataCliente) {

				const emailOptions = {
					to: dataCliente[0].correo, // receptor o receptores
					subject: "Logo guardado", // Asunto del correo
				}

				let email = new Email(emailOptions, {});
				email.setHtml("logoGuardado.html").send((err, data) => {
					if (err) return console.log(err);
				});

			});

			res.status(200).json(data);

		} else {
			res.status(500).json({
				"msg": "Algo ocurrio"
			});
		}
	});


};

exports.Destacar = function (req, res) {

	var par = [req.body.idCliente, req.body.idLogo];

	logo.getLogo(par, function (error, data) {

		if (typeof data !== "undefined" && data.length > 0) {

			var parr = [!data[0].destacado, req.body.idLogo];

			logo.Destacar(parr, function (error, data) {
				if (typeof data !== "undefined" && data.msg) {
					res.status(200).json(data);
				} else {
					res.status(500).json({
						"msg": "Algo ocurrio"
					});
				}
			});

		} else {
			res.status(404).json({
				"msg": "No existe el logo o no le pertenece al cliente"
			});
		}
	})
}

//CAMBIAR EL ESTADO DE UN LOGO A 'POR APROBAR'
exports.porAprobar = function (req, res) {

	var par = ["Por Aprobar", req.body.idLogo];

	logo.cambiarEstado(par, function (error, data) {

		if (typeof data !== "undefined" && data.msg) {

			var atributos = [{
				clave: "color-icono",
				valor: req.body.colores.icono,
				logos_idLogo: req.body.idLogo
			}, {
				clave: "color-nombre",
				valor: req.body.colores.nombre,
				logos_idLogo: req.body.idLogo
			}];

			if (req.body.colores.eslogan) {

				atributos.push({
					clave: "color-eslogan",
					valor: req.body.colores.eslogan,
					logos_idLogo: req.body.idLogo
				});

			}



			for (var key in atributos) {

				atributo.Guardar(atributos[key], function (error, data) {

					if (!data && !data.insertId) {
						res.status(500).json({
							"msg": "Algo ocurrio"
						});
					}

				});
			}

			res.status(200).json(data);

		} else {

			res.status(500).json({
				"msg": "Algo ocurrio"
			});

		}
	});
};

//CAMBIAR EL ESTADO DE UN LOGO A 'APROBADO'
exports.aprobar = function (req, res) {
	var par = ["Aprobado", req.body.idLogo];
	logo.cambiarEstado(par, function (error, data) {
		if (typeof data !== "undefined" && data.msg) {
			res.status(200).json(data);
		} else {
			res.status(500).json({
				"msg": "Algo ocurrio"
			});
		}
	});
};

//DEVUELVE LOS DATOS DE UN LOGO
exports.datosLogo = function (req, res) {
	//id del pedido
	var par = [req.idCliente, req.params.id];

	logo.getLogo(par, function (error, data) {
		//si el pedido existe 

		if (typeof data !== "undefined" && data.length > 0) {
			var logo = data[0];

			atributo.ObtenerPorLogo(req.params.id, function (error, data) {


				//console.log(data)
				if (typeof data !== "undefined" && data.length > 0) {
					logo["atributos"] = data;

					res.status(200).json(logo);

				} else {

					res.status(200).json(logo);

				}

			});
		}
		//no existe
		else {
			res.status(404).json({
				"msg": "No existe el logo o no le pertenece al cliente"
			});

		}
	});

};

//DEVULEVE LOGOS DE UN CLIENTE POR SU ESTADO
exports.listaLogosPorEstado = function (req, res) {

	var par = [req.body.estado, req.idCliente];

	logo.getLogosTipo(par, function (error, data) {
		//si el usuario existe 
		if (typeof data !== "undefined" && data.length > 0) {


			async.forEachOf(data, (logo, key, callback) => {


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

				res.status(200).json(data);

			});

		}
		//no existe
		else {
			res.status(404).json({
				"msg": "No hay logos guardados por el cliente "
			});
		}
	});

};

//DEVUELVE LOGOS POR APROBAR DE TODOS LOS CLIENTES
exports.listaLogosPorAprobar = function (req, res) {

	logo.getLogosPorAprobar(function (error, data) {
		//si el usuario existe 
		if (typeof data !== "undefined" && data.length > 0) {
			async.forEachOf(data, (logo, key, callback) => {


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

				res.status(200).json(data);

			});
		}
		//no existe
		else {
			res.status(404).json({
				"msg": "No hay logos guardados por el cliente"
			});
		}
	});

};

//DEVUELVE LOGOS APROBADOS DE TODOS LOS CLIENTES
exports.listaLogosAprobados = function (req, res) {

	var idLogo = req.body.idLogo ? req.body.idLogo : 0;
	var idCategoria = req.body.idCategoria ? req.body.idCategoria : 0;

	logo.getLogosAprobados(idLogo, idCategoria, function (error, data) {

		if (typeof data !== "undefined" && data.length > 0) {
			async.forEachOf(data, (logo, key, callback) => {


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

				res.status(200).json(data);

			});
		}
		//no existe
		else {
			res.status(404).json({
				"msg": "No hay logos aprobados"
			});
		}
	});

};

//DEVUELVE LOGOS APROBADOS DE TODOS LOS CLIENTES
exports.listaLogosAprobadosPorCliente = function (req, res) {

	var idCliente = req.params.id;

	logo.getLogosAprobadosPorCliente(idCliente, function (error, data) {

		if (typeof data !== "undefined" && data.length > 0) {
			async.forEachOf(data, (logo, key, callback) => {


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

				res.status(200).json(data);

			});
		}
		//no existe
		else {
			res.status(404).json({
				"msg": "No hay logos aprobados"
			});
		}
	});

};

exports.listaLogosVendidosPorCliente = function (req, res) {

	var idCliente = req.params.id;

	logo.getLogosVendidosPorCliente(idCliente, function (error, data) {

		if (typeof data !== "undefined" && data.length > 0) {
			async.forEachOf(data, (logo, key, callback) => {


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

				res.status(200).json(data);

			});
		}
		//no existe
		else {
			res.status(404).json({
				"msg": "No hay logos aprobados"
			});
		}
	});

};

//DEVUELVE LOGOS APROBADOS DESTACADOS DE TODOS LOS CLIENTES
exports.listaLogosAprobadosDestacados = function (req, res) {

	logo.getLogosAprobadosDestacados(function (error, data) {

		if (typeof data !== "undefined" && data.length > 0) {
			async.forEachOf(data, (logo, key, callback) => {


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

				res.status(200).json(data);

			});
		}
		//no existe
		else {
			res.status(404).json({
				"msg": "No hay logos destacados"
			});
		}
	});

};

//DEVUELVE LOS LOGOS GUARDADOS DE UN CLIENTE
exports.listaLogosGuardados = function (req, res) {

	var par = ["Editable", req.idCliente];

	logo.getLogosTipo(par, function (error, data) {
		//si el usuario existe 
		if (typeof data !== "undefined" && data.length > 0) {


			async.forEachOf(data, (logo, key, callback) => {


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

				res.status(200).json(data);

			});

		}
		//no existe
		else {
			res.status(404).json({
				"msg": "No hay logos guardados por el cliente "
			});
		}
	});

};

//DEVUELVE LOGOS DESCARGABLES OSEA COMPRADOS DE UN CLIENTE
exports.listaLogosDescargables = function (req, res) {

	var par = ["Descargable", req.idCliente];

	logo.getLogosTipo(par, function (error, data) {
		//si el usuario existe 
		if (typeof data !== "undefined" && data.length > 0) {
			async.forEachOf(data, (logo, key, callback) => {


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

				res.status(200).json(data);

			});
		}
		//no existe
		else {
			res.status(404).json({
				"msg": "No hay logos guardados por el cliente"
			});
		}
	});

};

//MODIFICA UN LOGO
exports.modificarLogo = function (req, res) {
	var par = [req.idCliente, req.body.idLogo];
	var objetivos = ["principal", "eslogan"];

	logo.getLogo(par, function (error, data) {
		//console.log(data)

		//si el logo existe 
		if (typeof data !== "undefined" && data.length > 0) {
			//creamos un array con los datos a modificar del logo
			var logoData = [req.body.logo, req.body.idLogo];

			logo.updateLogo(logoData, function (error, data) {
				//si el logo se ha modificado correctamente
				if (data) {

					atributo.BorrarPorLogo(req.body.idLogo, objetivos, function () {

						var atributos = req.body.atributos;

						async.forEachOf(atributos, (logo, key, callback) => {



							if (objetivos.indexOf(key) != -1) {
								var atributosData = {
									clave: key,
									valor: atributos[key],
									logos_idLogo: req.body.idLogo
								};

								atributo.Guardar(atributosData, function (error, data) {

									if (!data && !data.insertId) {

										callback({
											"msg": "Algo ocurrio"
										});

									} else {
										callback()
									}

								});
							} else {
								callback()
							}

						}, (err) => {

							if (err) res.status(402).json({});

							res.status(200).json(data);

						});

					});



				} else {
					res.status(500).json({
						"msg": "Algo ocurrio"
					});
				}
			});
		}
		//no existe
		else {
			res.status(404).json({
				"msg": "No existe"
			});
		}
	});
};

//DESCARGA UN LOGO COMPRADO
exports.zip = function (req, res) {
	const idLogo = req.query.idLogo;
	const ancho = req.query.ancho;
	const tipo = req.query.tipo;
	const descarga = req.query.descarga;
	let fuentes = {};
	const par = [req.idCliente, idLogo];
	const plantilla = req.query.plantilla ? req.query.plantilla : null;
	const colores = {};

	let nombre = "Logo" + "-" + descarga + "-" + moment().format("DD-MM-YYYY") + ".svg";

	const path = "public/tmp/";
	//console.log(req)

	logo.getLogo(par, (error, data) => {
		//console.log(data)
		if (typeof data !== "undefined" && data.length > 0) {

			pedido.ObtenerPlanPorIDdeLogo(idLogo, (err, plan) => {

				if (typeof plan !== "undefined" && plan.length > 0) {

					plan = plan[0];

					caracteristica.ObtenerPorPlan(plan.idPlan, function (err, carac) {

						if (typeof carac !== 'undefined' && carac.length) {

							var caracteristicas = {}

							for (var key in carac) {

								caracteristicas[carac[key].clave] = carac[key].valor;

							}

						}

						atributo.ObtenerPorLogo(data[0].idLogo, (err, dataAttrs) => {
							//console.log(dataAttrs)
							if (typeof dataAttrs !== "undefined" && dataAttrs.length > 0) {

								async.forEachOf(dataAttrs, (row, key, callback) => {
									if (row.clave == "principal" || row.clave == "eslogan") {

										elemento.datosElemento(row.valor, (err, fuente) => {

											if (err) return callback(err);

											try {

												if (typeof fuente !== "undefined" && fuente.length > 0) {
													fuentes[row.clave] = {
														nombre: fuente[0].nombre,
														url: fuente[0].url
													};
												}

											} catch (e) {
												return callback(e);
											}

											callback();
										});
									} else {

										colores[row.clave] = row.valor;
										callback();

									}
								}, (err) => {
									if (err) res.status(402).json({});

									var buffer = new Buffer(base64.decode(data[0].logo).replace("/fuentes/", req.protocol + "://" + req.headers.host + "/fuentes/"));

									fs.open(path + nombre, "w", (err, fd) => {
										if (err) throw "error al crear svg " + err;

										fs.write(fd, buffer, 0, buffer.length, null, err => {
											if (err) throw "error al escribir " + err;

											let svg = path + nombre;

											if (tipo == "editable" && caracteristicas.editable == '1') {

												var output = fs.createWriteStream(svg.replace("svg", "zip"));
												var archive = archiver("zip", {
													zlib: {
														level: 9
													}
												});

												archive.pipe(output);

												archive.append(fs.createReadStream(svg), {
													name: "logo.svg"
												});

												archive.append(fs.createReadStream(pathM.dirname(require.main.filename) + fuentes.principal.url), {
													name: fuentes.principal.nombre + '.ttf'
												});

												if (fuentes.eslogan) {
													archive.append(fs.createReadStream(pathM.dirname(require.main.filename) + fuentes.eslogan.url), {
														name: fuentes.eslogan.nombre + '.ttf'
													});
												}

												output.on('close', () => {
													setTimeout(() => {
														res.download(__dirname + "/../" + svg.replace("svg", "zip"));
													}, 1000)
												})

												archive.finalize();

											} else if (tipo == "documento" &&
												/* Crear atributo 'documento' en base de datos */
												caracteristicas.png == '1') {

												var pngout = svg.replace("svg", "png");

												fs.readFile(svg, (err, svgbuffer) => {
													if (err) throw err;
													svg2png(svgbuffer, {
															width: ancho
														})
														.then(buffer => {

															descargarDocumento(buffer)

														})
														.catch(e => console.log(e));
												});

											} else if (tipo != "editable" && caracteristicas.png == '1') {

												var pngout = svg.replace("svg", "png");

												fs.readFile(svg, (err, svgbuffer) => {
													if (err) throw err;
													svg2png(svgbuffer, {
															width: ancho
														})
														.then(buffer => {
															fs.writeFile(pngout, buffer, (err) => {
																setTimeout(() => {
																	res.download(__dirname + "/../" + pngout);
																}, 1000)
															});
														})
														.catch(e => console.log('error'));
												});

											}

											fs.close(fd);
										});
									});

								});

							}

						});

					})

				} else {

					if (ancho < 100) {

						atributo.ObtenerPorLogo(data[0].idLogo, (err, dataAttrs) => {
							//console.log(dataAttrs)
							if (typeof dataAttrs !== "undefined" && dataAttrs.length > 0) {

								async.forEachOf(dataAttrs, (row, key, callback) => {

									if (row.clave == "principal" || row.clave == "eslogan") {

										elemento.datosElemento(row.valor, (err, fuente) => {

											if (err) return callback(err);

											try {

												if (typeof fuente !== "undefined" && fuente.length > 0) {
													fuentes[row.clave] = {
														nombre: fuente[0].nombre,
														url: fuente[0].url
													};
												}

											} catch (e) {
												return callback(e);
											}

											callback();
										});
									} else {
										callback();
									}
								}, (err) => {
									if (err) res.status(402).json({});

									var buffer = new Buffer(base64.decode(data[0].logo).replace("/fuentes/", req.protocol + "://" + req.headers.host + "/fuentes/"));

									fs.open(path + nombre, "w", (err, fd) => {
										if (err) throw "error al crear svg " + err;

										fs.write(fd, buffer, 0, buffer.length, null, err => {
											if (err) throw "error al escribir " + err;

											let svg = path + nombre;

											var pngout = svg.replace("svg", "png");

											fs.readFile(svg, (err, svgbuffer) => {
												if (err) throw err;
												svg2png(svgbuffer, {
														width: ancho
													})
													.then(buffer => {
														fs.writeFile(pngout, buffer, (err) => {
															setTimeout(() => {
																res.download(__dirname + "/../" + pngout);
															}, 1000)
														});
													})
													.catch(e => console.log('error'));
											});

											fs.close(fd);
										});
									});

								});

							}

						});

					}
				}

			});
		} else {
			res.status(404).json({
				"msg": "No existe el logo o no le pertenece al cliente"
			});
		}
	});

	function descargarDocumento(imagen) {

		/**
		 * DATOS PLANTILLAS
		 */

		var plantillas = {
			ppt: {
				urlBase: '/ppt',
				plantilla_uno: {
					coloresTema: {
						fondo1: 'FFFFFF',
						fondo2: '000000',
						texto1: 'FFFFFF',
						texto2: '000000',
						enfasis1: colores['color-icono'] ? toHexa(colores['color-icono']) : 'FFFFFF',
						enfasis2: colores['color-nombre'] ? toHexa(colores['color-nombre']) : 'FFFFFF',
						enfasis3: colores['color-eslogan'] ? toHexa(colores['color-eslogan']) : 'FFFFFF',
						enfasis4: 'FFFFFF',
						enfasis5: 'FFFFFF',
						enfasis6: 'FFFFFF',
					},
					temas: ['theme1.xml'],
					imagenes: ['image4.png'],
					ext: '.pptx'
				},
				eglamour: {
					coloresTema: {
						enfasis1: colores['color-icono'] ? toHexa(colores['color-icono']) : 'FFFFFF',
						enfasis2: colores['color-nombre'] ? toHexa(colores['color-nombre']) : 'FFFFFF',
						enfasis3: colores['color-eslogan'] ? toHexa(colores['color-eslogan']) : 'FFFFFF',
					},
					temas: ['theme1.xml', 'theme2.xml'],
					imagenes: ['image4.png'],
					ext: '.pptx'
				}
			},
			doc: {
				urlBase: '/word',
				plantilla_uno: {
					coloresTema: {
						fondo1: 'FFFFFF',
						fondo2: '000000',
						texto1: 'FFFFFF',
						texto2: '000000',
						enfasis1: colores['color-icono'] ? toHexa(colores['color-icono']) : 'FFFFFF',
						enfasis2: colores['color-nombre'] ? toHexa(colores['color-nombre']) : 'FFFFFF',
						enfasis3: colores['color-eslogan'] ? toHexa(colores['color-eslogan']) : 'FFFFFF',
						enfasis4: 'FFFFFF',
						enfasis5: 'FFFFFF',
						enfasis6: 'FFFFFF',
					},
					temas: ['theme1.xml'],
					imagenes: ['image1.png'],
					ext: '.docx',
				}
			}
		}

		/**
		 * FUNCION DOCUMENTOS
		 */

		var plantillaParametros = JSON.parse(plantilla);

		var datosPlantilla = plantillas[plantillaParametros.tipo][plantillaParametros.nombre];

		var extensionPlantilla = datosPlantilla.ext;

		var urlBase = plantillas[plantillaParametros.tipo]['urlBase']; // Carpeta en donde se encuentran los archivos a cambiar

		var coloresTema = datosPlantilla.coloresTema;

		var imagenes = datosPlantilla.imagenes;

		var ubicacionFuente = __dirname.replace('controllers', '') + '/public/tmp/' + plantillaParametros.nombre + extensionPlantilla;

		/**
		 * Creamos una copia del la plantilla en la carpeta temporal 'tmp'
		 */
		fse.copy(__dirname.replace('controllers', '') + '/plantillas-documentos/' + plantillaParametros.nombre + extensionPlantilla, ubicacionFuente, err => {
			if (err) return console.error(err)

			/**
			 * CAMBIAMOS LOS COLORES DEL TEMA
			 */

			for (let i = 0; i < datosPlantilla.temas.length; i++) {

				let tema = datosPlantilla.temas[i];

				var template = fs.readFileSync(ubicacionFuente + urlBase + '/theme/' + tema, 'utf8', (err, data) => {
					if (err) throw err;
				});

				var datos = coloresTema;
				var keys = Object.keys(datos);

				for (var key in keys) {
					while (template.indexOf("${" + keys[key] + "}") != -1) {

						template = template.replace("${" + keys[key] + "}", datos[keys[key]]);
					}
				}

				fs.writeFileSync(ubicacionFuente + urlBase + '/theme/' + tema, template);

			}

			/**
			 * REMPLAZAMOS LAS IMAGENES DEL DOCUMENTO
			 */
			
			for (let i = 0; i < imagenes.length; i++) {
				fs.writeFileSync(ubicacionFuente + urlBase + '/media/' + imagenes[i], imagen);
			}

			/**
			 * COMPRIMIR DOCUMENTO Y DESCARGAR
			 */

			var ubicacionArchivoNuevo = __dirname.replace('controllers', '') + '/public/tmp/papeleria-' + moment().format("DD-MM-YYYY") + '-' + idLogo + '.zip';

			var output = fs.createWriteStream(ubicacionArchivoNuevo);

			var archive = archiver("zip", {
				zlib: {
					level: 9
				}
			});

			archive.pipe(output);

			archive.directory(ubicacionFuente, false);

			output.on('close', () => {
				setTimeout(() => {
					fs.rename(ubicacionArchivoNuevo, ubicacionArchivoNuevo.replace('.zip', extensionPlantilla), function (err) {
						if (err) throw err;
						fs.stat(ubicacionArchivoNuevo.replace('.zip', extensionPlantilla), function (err, stats) {
							if (err) throw err;
							fse.remove(ubicacionFuente, err => {
								if (err) return console.error(err)

								res.download(ubicacionArchivoNuevo.replace('.zip', extensionPlantilla));
							});
						});
					});
				}, 1000)
			})

			archive.finalize();
		})

	}

	function toHexa(rgb) {
		rgb = rgb.slice(4, -1);
		args = rgb.split(', ');

		var integer = ((Math.round(args[0]) & 0xFF) << 16) +
			((Math.round(args[1]) & 0xFF) << 8) +
			(Math.round(args[2]) & 0xFF);

		var string = integer.toString(16).toUpperCase();
		return '000000'.substring(string.length) + string;
	}

};

//DEPRECATED
exports.descargar = (req, res) => {
	const idLogo = req.query.idLogo;
	const descargas = JSON.parse(req.query.formatos) || {
		facebook: 250,
		youtube: 400,
		editable: 400
	};
	let fuentes = {};
	const par = [req.idCliente, idLogo];

	logo.getLogo(par, (error, data) => {
		if (typeof data !== "undefined" && data.length > 0) {

			pedido.ObtenerPlanPorIDdeLogo(idLogo, (err, plan) => {

				if (typeof plan !== "undefined" && plan.length > 0) {

					plan = plan[0];

					caracteristica.ObtenerPorPlan(plan.idPlan, function (err, carac) {

						if (typeof carac !== 'undefined' && carac.length) {

							var caracteristicas = {}

							for (var key in carac) {

								caracteristicas[carac[key].clave] = carac[key].valor;

							}

						}

						let nombre = "Logo" + "-todos-los-FORMATOS-" + moment().format("DD-MM-YYYY") + ".svg";

						const path = "public/tmp/";

						atributo.ObtenerPorLogo(data[0].idLogo, (err, dataAttrs) => {
							if (typeof dataAttrs !== "undefined" && dataAttrs.length > 0) {

								async.forEachOf(dataAttrs, (row, key, callback) => {

									if (row.clave == "principal" || row.clave == "eslogan") {

										elemento.datosElemento(row.valor, (err, fuente) => {

											if (err) return callback(err);

											try {

												if (typeof fuente !== "undefined" && fuente.length > 0) {
													fuentes[row.clave] = {
														nombre: fuente[0].nombre,
														url: fuente[0].url
													};
												}

											} catch (e) {
												return callback(e);
											}

											callback();
										});
									} else {
										callback();
									}
								}, (err) => {
									if (err) res.status(402).json({});

									var buffer = new Buffer(base64.decode(data[0].logo).replace("/fuentes/", req.protocol + "://" + req.headers.host + "/fuentes/"));

									fs.open(path + nombre, "w", (err, fd) => {
										if (err) throw "error al crear svg " + err;

										fs.write(fd, buffer, 0, buffer.length, null, err => {
											if (err) throw "error al escribir " + err;

											let svg = path + nombre;

											var output_a = fs.createWriteStream(svg.replace("svg", "zip"));
											var archive_a = archiver("zip", {
												zlib: {
													level: 9
												}
											});
											archive_a.pipe(output_a);

											if (caracteristicas.editable == '1') {

												var output_b = fs.createWriteStream(path + 'logo_editable.zip');
												var archive_b = archiver("zip", {
													zlib: {
														level: 9
													}
												});
												archive_b.pipe(output_b);

												archive_b.append(fs.createReadStream(svg), {
													name: "logo.svg"
												});

												archive_b.append(fs.createReadStream(pathM.dirname(require.main.filename) + fuentes.principal.url), {
													name: fuentes.principal.nombre + '.ttf'
												});

												if (fuentes.eslogan) {
													archive_b.append(fs.createReadStream(pathM.dirname(require.main.filename) + fuentes.eslogan.url), {
														name: fuentes.eslogan.nombre + '.ttf'
													});
												}

												output_b.on('close', () => {
													setTimeout(() => {
														archive_a.append(fs.createReadStream(__dirname + "/../" + path + "logo_editable.zip"), {
															name: "logo_editable.zip"
														});
													}, 1000)
												})

												archive_b.finalize();

											}

											if (caracteristicas.png == '1') {

												async.forEachOf(descargas, (ancho, key, callback) => {

													fs.readFile(svg, (err, svgbuffer) => {
														if (err) throw err;
														svg2png(svgbuffer, {
																width: ancho
															})
															.then(buffer => {
																archive_a.append(buffer, {
																	name: "logo_" + key + ".png"
																});
																callback();
															})
															.catch(e => {
																callback(e)
															});
													});

												}, (err) => {


													output_a.on('close', () => {
														setTimeout(() => {
															res.download(__dirname + "/../" + svg.replace("svg", "zip"));
														}, 1000)
													})

													archive_a.finalize();

													fs.close(fd);
												});

											}

										});
									});

								});

							}

						});

					})

				} else {
					res.status(404).json({
						"msg": "No se encuentra el plan"
					});
				}

			});

		} else {
			res.status(404).json({
				"msg": "No existe el logo o no le pertenece al cliente"
			});
		}
	});
};

exports.obtenerBinario = function (req, res) {
	const idLogo = req.params.id;
	const ancho = 200;
	let fuentes = {};

	logo.getLogoPorId(idLogo, (error, data) => {

		if (typeof data !== "undefined" && data.length > 0) {
			let nombre = idLogo + ".svg";

			const path = "public/tmp/shared/";

			atributo.ObtenerPorLogo(data[0].idLogo, (err, dataAttrs) => {

				if (typeof dataAttrs !== "undefined" && dataAttrs.length > 0) {

					async.forEachOf(dataAttrs, (row, key, callback) => {

						if (row.clave == "principal" || row.clave == "eslogan") {

							elemento.datosElemento(row.valor, (err, fuente) => {

								if (err) return callback(err);

								try {

									if (typeof fuente !== "undefined" && fuente.length > 0) {
										fuentes[row.clave] = {
											nombre: fuente[0].nombre,
											url: fuente[0].url
										};
									}

								} catch (e) {
									return callback(e);
								}

								callback();
							});
						} else {
							callback();
						}
					}, (err) => {
						if (err) res.status(402).json({});

						var buffer = new Buffer(base64.decode(data[0].logo).replace("/fuentes/", req.protocol + "://" + req.headers.host + "/fuentes/"));

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
													res.sendFile(nombre.replace("svg", "jpg"), {
														root: __dirname + "/../" + path
													});
												}, 1000)
											});
										})
										.catch(e => console.log('error'));
								});

								fs.close(fd);
							});
						});

					});

				}

			});
		} else {
			res.status(404).json({
				"msg": "No existe el logo o no le pertenece al cliente"
			});
		}
	});
};

exports.enviarPorEmail = function (req, res) {
	const idLogo = req.body.idLogo;
	const urlImagen = req.body.url;
	const ancho = 150;
	const to = req.body.email;
	let fuentes = {};
	const par = [req.idCliente, idLogo];

	//console.log(to)

	logo.getLogo(par, (error, data) => {
		if (typeof data !== "undefined" && data.length > 0) {
			let nombre = "Logo-" + idLogo + "-" + moment().format("DD-MM-YYYY") + ".svg";

			const path = "public/tmp/";

			atributo.ObtenerPorLogo(data[0].idLogo, (err, dataAttrs) => {
				if (typeof dataAttrs !== "undefined" && dataAttrs.length > 0) {

					async.forEachOf(dataAttrs, (row, key, callback) => {

						if (row.clave == "principal" || row.clave == "eslogan") {

							elemento.datosElemento(row.valor, (err, fuente) => {

								if (err) return callback(err);

								try {

									if (typeof fuente !== "undefined" && fuente.length > 0) {
										fuentes[row.clave] = {
											nombre: fuente[0].nombre,
											url: fuente[0].url
										};
									}

								} catch (e) {
									return callback(e);
								}

								callback();
							});
						} else {
							callback();
						}
					}, (err) => {
						if (err) res.status(402).json({});

						var buffer = new Buffer(base64.decode(data[0].logo).replace("/fuentes/", req.protocol + "://" + req.headers.host + "/fuentes/"));

						fs.open(path + nombre, "w", (err, fd) => {
							if (err) throw "error al crear svg " + err;

							fs.write(fd, buffer, 0, buffer.length, null, err => {
								if (err) throw "error al escribir " + err;

								let svg = path + nombre;

								var pngout = svg.replace("svg", "png");
								fs.readFile(svg, (err, svgbuffer) => {
									if (err) throw err;
									svg2png(svgbuffer, {
										width: ancho
									}).then(buffer => {
										fs.writeFile(pngout, buffer, function (err) {
											if (err) { //console.log(err);
											}

											const emailOptions = {
												to: to, // receptor o receptores
												subject: "Logo compatido", // Asunto del correo
											}

											let email = new Email(emailOptions, {
												urlImagen: urlImagen,
												msg: "te han compartido este logo (prueba de envio de logo por email)"
											});
											email.setHtml("logoCompartido.html")
												.setAttachs([{ // stream as an attachment
													filename: 'logo.png',
													content: fs.createReadStream(__dirname + "/../" + pngout),
													cid: "logo-compartido"
												}]).send((err, data) => {
													if (err) return res.status(500).json({
														msg: err
													})

													return res.status(200).json({
														msg: "Enviado"
													})
												});

										})
									}).catch(e => console.log('error'));
								});

								fs.close(fd);
							});
						});

					});

				}

			});
		} else {
			res.status(404).json({
				"msg": "No existe el logo o no le pertenece al cliente"
			});
		}
	});
};

//BORRA UN LOGO
exports.Borrar = (req, res) => {
	var idLogo = req.params.id;
	logo.Borrar(idLogo, (error, data) => {

		if (typeof data !== "undefined" && data.affectedRows) {

			res.status(200).json({
				"affectedRows": data.affectedRows
			});

		} else {

			res.status(500).json({
				"msg": "Algo ocurrio"
			});

		}
	});
};

exports.favicon = function (req, res) {
	const idLogo = req.params.id;
	const ancho = 48;
	let fuentes = {};

	logo.getLogoPorId(idLogo, (error, data) => {

		if (typeof data !== "undefined" && data.length > 0) {
			let nombre = "favicon-" + idLogo + ".svg";

			const path = "public/tmp/";

			var buffer = new Buffer(base64.decode(data[0].logo).split('<g class="contenedor-icono">')[1].split("</svg>")[0] + "</svg>");

			fs.open(path + nombre, "w", (err, fd) => {
				if (err) throw "error al crear svg " + err;

				fs.write(fd, buffer, 0, buffer.length, null, err => {
					if (err) throw "error al escribir " + err;

					let svg = path + nombre;

					var pngout = svg.replace("svg", "png");

					fs.readFile(svg, (err, svgbuffer) => {
						if (err) throw err;
						svg2png(svgbuffer, {
								width: ancho
							})
							.then(buffer => {
								fs.writeFile(pngout, buffer, (err) => {
									setTimeout(() => {
										res.download(__dirname + "/../" + pngout);
									}, 1000)
								});
							})
							.catch(e => console.log('error'));
					});

					fs.close(fd);
				});
			});

		} else {
			res.status(404).json({
				"msg": "No existe el logo o no le pertenece al cliente"
			});
		}
	});
};

/*exports.htmlShare = (req, res) => 
{
	const idLogo = req.params.id;

	console.log(req.headers['user-agent'])
	
	if (req.headers['user-agent'] === 'facebookexternalhit/' || req.headers['user-agent'] === 'Facebot') {

		var html = `<!DOCTYPE html>
			<html>
				<head>
					<meta property="og:title" content="LOGOPRO" />
					<meta property="og:type" content="article"/>
					<meta property="og:url" content="${config.url}"/>
					<meta property="og:image" content="${config.url}/app/logo/compartido/${idLogo}" />
					<meta property="og:image:secure_url" content="${config.url}/app/logo/compartido/${idLogo}"/>
					<link rel="image_src" href="${config.url}/app/logo/compartido/${idLogo}"/>
					<meta property="og:description" content="Descripcion" />
					<meta property="og:site_name" content="LOGOPRO" />
					<meta property="fb:admins" content="ID de Facebook" />
				</head>
				<body>
					Url para compartir
				</body>
			</html>`;

			res.status(200).type('html').send(html)

	} else if(req.headers['user-agent'] === 'Twitterbot') {

		var html = `<!DOCTYPE html>
		<html>
			<head>
				<!-- Twitter Card data -->
				<meta name="twitter:card" content="summary">
				<meta name="twitter:site" content="@publisher_handle">
				<meta name="twitter:title" content="LOGOPRO">
				<meta name="twitter:description" content="Descripcion de la pagina sin superar los 200 caracteres">
				<meta name="twitter:creator" content="@author_handle">
		
				<!-- Twitter Summary card images. Igual o superar los 200x200px -->
				<meta name="twitter:image" content="<a href='${config.url}'>${config.url}/app/logo/compartido/${idLogo}</a>">
			</head>
			<body>
				Url para compartir
			</body>
		</html>`;

		res.status(200).type('html').send(html)

	} else {
		res.status(301).redirect('/')
	}


}*/