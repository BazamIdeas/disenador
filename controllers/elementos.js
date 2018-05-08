var elemento = require("../modelos/elementosModelo.js");
var etiqueta = require("../modelos/etiquetasModelo.js");
var helpers = require("../services/Helpers.js");
var async = require("async");
var base64 = require("base-64");
var fs = require("fs");

// FUNCION QUE DEVUELVE LOS ICONOS SEGUN 
exports.listaSegunPref = function (req, res) {

	var datos2 = req.body;
	var datos = [];
	var datoIncat = [];
	var x;
	var limit = req.body.limit ? req.body.limit : 4;
	for (x in datos2.preferencias) {
		datos.push([datos2.preferencias[x].idPreferencia, datos2.preferencias[x].valor, datos2.categoria, datos2.tipo, limit]);
	}
	//console.log(datos);
	/*for (x in datos2.preferencias){
        datoIncat.push([datos2.categoria, datos2.tipo])
    }*/
	datoIncat = [
		[datos2.categoria, 'FUENTE', limit]
	];
	//console.log(datos);
	//console.log(datoIncat);
	var coincidencias = [];
	async.each(datos, function (dato, callback) {
			elemento.getElementos(dato, function (error, data) {
				if (typeof data !== "undefined" && data.length > 0) {
					for (var i = data.length - 1; i >= 0; i--) { // recorremos la data 
						var res = data[i].idElemento; // almacenamos el id del elemento
						var coin = 0; // declaramos una variable para saber y encontro o no
						for (var j = coincidencias.length - 1; j >= 0; j--) { // recorremos la coincidencia 
							var ress = coincidencias[j].idElemento; // asignamos el id de la coincidencia
							if (res == ress) { // verificamos si son iguales
								coin = 1; // cambiamos el valor de la variable

							} // fin del if

						} // fin del for coincidencia

						if (coin == 0) { // verificamos si la variable no cambio de dato
							if (coincidencias.length < limit) {
								coincidencias = coincidencias.concat(data[i]);
							} // concatenamos data con coincidencias
						} // fin del if

					} // fin del for data*/
					callback();
					//console.log(coincidencias);
				} else
					callback();
			});
		},
		function (err) {
			if (err)
				res.status(500);
			else {
				if (coincidencias.length < limit) {
					async.each(datoIncat, function (dato, callback) {
							elemento.getElementosIncat(dato, function (error, data) {
								if (typeof data !== "undefined" && data.length > 0) {
									for (var i = data.length - 1; i >= 0; i--) { // recorremos la data 
										var res = data[i].idElemento; // almacenamos el id del elemento
										var coin = 0; // declaramos una variable para saber y encontro o no
										for (var j = coincidencias.length - 1; j >= 0; j--) { // recorremos la coincidencia 
											var ress = coincidencias[j].idElemento; // asignamos el id de la coincidencia
											if (res == ress) { // verificamos si son iguales
												coin = 1; // cambiamos el valor de la variable

											} // fin del if

										} // fin del for coincidencia

										if (coin == 0) { // verificamos si la variable no cambio de dato

											coincidencias = coincidencias.concat(data[i]); // concatenamos data con coincidencias
										} // fin del if

									} // fin del for data*/

									callback();

								} else
									callback();

							});

						},
						function (err) {
							if (err)
								res.status(500);
							else {

								res.json(coincidencias);
							}
						});
				} else {
					res.json(coincidencias);

				}


			}
		});
};

exports.listaSegunTagCat = function (req, res) {

	const tags = req.body.tags ? req.body.tags : [];
	const categoria = req.body.categoria ? req.body.categoria : 0;
	const limit = req.body.limit ? req.body.limit : 4;
	const ids = req.body.ids ? req.body.ids : [0];

	let tagsNormalize = [];

	tags.forEach(el => tagsNormalize.push(helpers.normalize(el.toLowerCase())));

	etiqueta.Analizar(tagsNormalize, (err, arr) => {

		// Aqui se registran las busquedas

		ids.forEach(ele => {
			let index = arr.indexOf(ele);
			if (index !== -1) arr.splice(index, 1);
		});

		if (!arr.length) {
			arr = [0];
		}

		elemento.getElementsByTags(arr, categoria, limit, (err, data) => {
			let elementos = [];

			if (typeof data !== "undefined" && data.length > 0) {

				for (let i = data.length - 1; i >= 0; i--) {
					let id = data[i].idElemento;
					let into = 0;
					for (let j = elementos.length - 1; j >= 0; j--) {
						let id2 = elementos[j].idElemento;
						if (id == id2) {
							into = 1;
						}
					}

					if (into == 0) {
						elementos = elementos.concat(data[i]);
					}
				}

			}

			if (elementos.length < limit) {

				elemento.getElementosIncat([categoria, 'ICONO', limit], (error, data) => {
					
					if (typeof data !== "undefined" && data.length > 0) {

						for (let i = data.length - 1; i >= 0; i--) {
							let id = data[i].idElemento;
							let into = 0;
							for (let j = elementos.length - 1; j >= 0; j--) {
								let id2 = elementos[j].idElemento;
								if (id == id2) {
									into = 1;
								}
							}

							if (into == 0 && elementos.length < limit) {
								elementos = elementos.concat(data[i]);
							}
						}

					}

					res.status(200).json(elementos);

				});

			} else {

				res.status(200).json(elementos);
			
			}

		})

	});

};

exports.listaElemCat = function (req, res) {

	var cat = [req.body.idCategoria, req.body.tipo];


	elemento.getElementosCat(cat, function (error, data) {

		if (typeof data !== "undefined" && data.length > 0) {
			res.status(200).json(data);
		}
		//no existe
		else {
			res.status(404).json({
				"msg": "No Encontrado"
			});
		}
	});

};

exports.listaElemCategoria = function (req, res) {

	var cat = [req.body.idCategoria, req.body.tipo, 18];


	elemento.getElementosIncat(cat, function (error, data) {

		if (typeof data !== "undefined" && data.length > 0) {
			res.status(200).json(data);
		}
		//no existe
		else {
			res.status(404).json({
				"msg": "No Encontrado"
			});
		}
	});

};

exports.ListaIniciales = function (req, res) {

	var cat = ["Iniciales", req.body.inicial.toLowerCase()];


	elemento.getIniciales(cat, function (error, data) {

		if (typeof data !== "undefined" && data.length > 0) {
			res.status(200).json(data);
		}
		//no existe
		else {
			res.status(404).json({
				"msg": "No Encontrado"
			});
		}
	});
};

exports.ListarFuentes = function (req, res) {

	elemento.ListarFuentes(function (error, data) {

		if (typeof data !== "undefined" && data.length > 0) {
			res.status(200).json(data);
		}
		//no existe
		else {
			res.status(404).json({
				"msg": "No Encontrado"
			});
		}
	});

};

exports.nuevoElementoIcono = function (req, res) {
	/*console.log(req.body);*/
	/*console.log(req.files);*/
	var datoPrefe = req.body.datoPrefe;
	var svg_path = req.files.misvg.path;
	var tiposvg = req.files.misvg.type;
	if (tiposvg == "image/svg+xml") {
		fs.readFile(svg_path, function (error, contenido) {
			var str = (contenido.toString());
			var dd = "<svg" + str.split("<svg")[1];
			var dd2 = base64.encode(dd.replace("xmlns=", "width=\"100%\" xmlns="));
			var elem = {
				idElemento: null,
				nombre: req.body.nombre,
				url: null,
				svg: dd2,
				color: null,
				tipo: "ICONO",
				comprado: 0,
				categorias_idCategoria: req.body.categoria
			};

			elemento.insertElemento(elem, function (error, data) {
				//si el pedido existe 
				if (data && data.insertId) {

					for (var x in datoPrefe) {
						var elecat = {
							elementos_idElemento: data.insertId,
							preferencias_idPreferencia: datoPrefe[x].idPreferencia,
							valor: datoPrefe[x].valor
						};

						elemento.getElementosInpref(elecat, function (error) {

							if (error) {
								res.status(500).json(error);
							}


						});


					} //fin del for
					res.status(200).json(data);
				}
				//no existe
				else {
					res.status(404).json(data);
				}
			});
		});

	} else {
		res.status(404).json({
			"msg": "Archivo no Soportado"
		});
	}
};

exports.nuevoElementoFuente = function (req, res) {
	//var tmp_path = req.files.mifuente.name;
	var datoPrefe = req.body.datoPrefe;
	var tmp_path = req.files.mifuente.path;
	var tipo = req.files.mifuente.name.toLowerCase();

	if (tipo.includes("ttf")) {
		tipo = "application/x-font-ttf";
	} else if (tipo.includes("otf")) {
		tipo = "application/x-font-otf";
	} else if (tipo.includes("eot")) {
		tipo = "application/x-font-eot";
	}

	if ((tipo == "application/x-font-ttf") || (tipo == "application/x-font-otf") || (tipo == "application/x-font-woff")) {

		var nombrefuente = req.files.mifuente.name;
		var targer_path = "/fuentes/" + nombrefuente;
		fs.rename(tmp_path, "." + targer_path, function () {
			fs.unlink(tmp_path, function () {

				var fuente = {
					idElemento: null,
					nombre: req.body.nombre,
					url: targer_path,
					svg: null,
					color: null,
					tipo: "FUENTE",
					comprado: 0,
					categorias_idcategoria: req.body.categoria
				};

				elemento.insertFuente(fuente, function (error, data) {

					if (data && data.insertId) {

						for (var x in datoPrefe) {
							var elecat = {
								elementos_idElemento: data.insertId,
								preferencias_idPreferencia: datoPrefe[x].idPreferencia,
								valor: datoPrefe[x].valor
							};

							elemento.getElementosInpref(elecat, function (error) {

								if (error) {
									res.status(500).json(error);
								}

							});

						} //fin del for
						res.status(200).json(data);
					}
					//no existe
					else {
						res.status(404).json(data);
					}

				});
			});
		});

	} else {
		res.status(400).json({
			"msg": "Archivo no Soportado"
		});
	}
};


exports.ModificarPreferencias = function (req, res) {
	for (var x in req.datoPrefe) {

		var eleCat = {
			valor: req.datoPrefe[x].valor,
			elementos_idElemento: req.datoPrefe[x].idElemento,
			preferencias_idPreferencia: req.datoPrefe[x].idPreferencia,
		};

		elemento.ModificarPreferencias(eleCat, function (error) {

			if (error) {
				res.status(500).json(error);
			}

		});


	}

	res.status(200).json({
		"result": "Todo bien"
	});
};