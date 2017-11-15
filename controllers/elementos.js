var elemento = require('../modelos/elementosModelo.js');
var async = require("async");
var base64 = require('base-64');
var fs = require('fs');

// FUNCION QUE DEVUELVE LOS ICONOS SEGUN 
exports.listaSegunPref = function (req, res, next) {

	var datos2 = req.body
	var datos = [];
	var datoIncat = [];
	var x;
	for (x in datos2.preferencias) {
		datos.push([datos2.preferencias[x].idPreferencia, datos2.preferencias[x].valor, datos2.categoria, datos2.tipo])
	}
	//console.log(datos);
	/*for (x in datos2.preferencias){
	    datoIncat.push([datos2.categoria, datos2.tipo])
	}*/
	var datoIncat = [
		[datos2.categoria, datos2.tipo]
	];
	//console.log(datos);
	console.log(datoIncat);
	var coincidencias = [];
	async.each(datos, function (dato, callback) {
			elemento.getElementos(dato, function (error, data) {
				if (typeof data !== 'undefined' && data.length > 0) {
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
					//console.log(coincidencias);
				} else
					callback();
			});
		},
		function (err) {
			if (err)
				res.status(500);
			else {

				if (coincidencias.length < 12) {
					var exit = 1;
					async.each(datoIncat, function (dato, callback) {

							elemento.getElementosIncat(dato, function (error, data) {
								if (typeof data !== 'undefined' && data.length > 0) {
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

								res.json(coincidencias)
							}
						});
				} else {
					res.json(coincidencias)

				}


			}
		});
}
// te quedaste a aqui
exports.listaElemCat = function (req, res, next) {

	var cat = [req.body.idCategoria, req.body.tipo];


	elemento.getElementosIncat(cat, function (error, data) {

		if (typeof data !== 'undefined' && data.length > 0) {
			res.status(200).json(data);
		}
		//no existe
		else {
			res.status(404).json({
				"msg": "No Encontrado"
			})
		}
	});

}

exports.nuevoElementoIcono = function (req, res) {
	/*console.log(req.body);*/
	/*console.log(req.files);*/
	var datoPrefe = req.body.datoPrefe;
	var svg_path = req.files.misvg.path;
	var tiposvg = req.files.misvg.type;
	if (tiposvg == 'image/svg+xml') {
		fs.readFile(svg_path, function (error, contenido) {
			var str = (contenido.toString());
			dd = str.replace(/.*<svg version=/, "<svg version=");
			dd2 = base64.encode(dd.replace('xmlns=', 'width="100%" xmlns='));
			var elem = {
				idElemento: null,
				nombre: req.body.nombre,
				url: null,
				svg: dd2,
				color: null,
				tipo: 'ICONO',
				comprado: 0,
				categorias_idCategoria: req.body.categoria
			};

			elemento.insertElemento(elem, function (error, data) {
				//si el pedido existe 
				if (data && data.insertId) {

					for (x in datoPrefe) {
						elecat = {
							elementos_idElemento: data.insertId,
							preferencias_idPreferencia: datoPrefe[x].idPreferencia,
							valor: datoPrefe[x].valor
						}

						elemento.getElementosInpref(elecat, function (error, datapref) {

							if (error) {
								res.status(500).json(error);
							}


						});


					} //fin del for
					res.status(200).json(data);
				}
				//no existe
				else {
					res.status(404).json(data)
				}
			});
		});

	} else {
		res.status(404).json({
			"msg": "Archivo no Soportado"
		})
	}
}

exports.nuevoElementoFuente = function (req, res) {
	var tmp_path = req.files.mifuente.name;
	var datoPrefe = req.body.datoPrefe;
	var tmp_path = req.files.mifuente.path;
	var tipo = req.files.mifuente.type;

	/*if(tipo.includes('ttf')){
		tipo = 'application/x-font-ttf';
	}else if(tipo.includes('otf')){
		tipo = 'application/x-font-otf';
	}else if(tipo.includes('eot')){
		tipo = 'application/x-font-eot';
	}*/
	
	if ((tipo == 'application/x-font-ttf') || (tipo == 'application/x-font-otf') || (tipo == 'application/x-font-eot')) {

		var nombrefuente = req.files.mifuente.name;
		var targer_path = './fuentes/' + nombrefuente;
		fs.rename(tmp_path, targer_path, function (err) {
			fs.unlink(tmp_path, function (err) {

				var fuente = {
					idElemento: null,
					nombre: req.body.nombre,
					url: targer_path,
					svg: null,
					color: null,
					tipo: 'FUENTE',
					comprado: 0,
					categorias_idcategoria: req.body.categoria
				}

				elemento.insertFuente(fuente, function (error, data) {

					if (data && data.insertId) {

						for (x in datoPrefe) {
							elecat = {
								elementos_idElemento: data.insertId,
								preferencias_idPreferencia: datoPrefe[x].idPreferencia,
								valor: datoPrefe[x].valor
							}

							elemento.getElementosInpref(elecat, function (error, datapref) {

								if (error) {
									res.status(500).json(error);
								}


							});


						} //fin del for
						res.status(200).json(data);
					}
					//no existe
					else {
						res.status(404).json(data)
					}

				});
			});
		});

	} else {
		res.status(404).json({
			"msg": "Archivo no Soportado"
		})
	}
}

