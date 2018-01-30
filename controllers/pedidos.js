var pedido = require("../modelos/pedidosModelo.js");
var logo = require("../modelos/logosModelo.js");
var cliente = require("../modelos/clientesModelo.js");
var services = require("../services");
var elemento = require("../modelos/elementosModelo.js");
var configuracion = require("../configuracion.js");
var moment = require("moment");
var pais = require("../modelos/paisesModelo.js");
var precio = require("../modelos/preciosModelo.js");
var pasarela = require("../modelos/pasarelasModelo.js");
var atributo = require("../modelos/atributosModelo.js");


exports.listaPedidos = function (req, res) {

	pedido.getPedidos(function (error, data) {

		//si el usuario existe 
		if (typeof data !== "undefined" && data.length > 0) {
			res.status(200).json(data);
		}
		//no existe
		else {
			res.status(404).json({
				"msg": "No hay pedidos registrados"
			});
		}
	});

};

exports.ListarPorPais = function (req, res) {

	pedido.ListarPorPais(req.params.iso, function (error, data) {
		//si el usuario existe 
		if (typeof data !== "undefined" && data.length > 0) {
			res.status(200).json(data);
		} else {
			res.status(404).json({
				"msg": "No hay pedidos registrados"
			});
		}
	});

};

exports.datosPedido = function (req, res) {
	//id del pedido
	var id = req.params.id;
	pedido.getPedido(id, function (error, data) {
		//si el pedido existe 
		if (typeof data !== "undefined" && data.length > 0) {
			res.status(200).json(data);
		}
		//no existe
		else {
			res.status(204).json({
				"msg": "No Encontrado"
			});
		}
	});

};

exports.datosPedidosCliente = function (req, res) {
	//id del pedido
	var id = req.params.id;
	pedido.getPedidosCliente(id, function (error, data) {
		//si el pedido existe 
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

exports.PedidosCliente = function (req, res) {
	//id del pedido
	var id = req.idCliente;
	pedido.getPedidosCliente(id, function (error, data) {
		//si el pedido existe 
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

exports.nuevoPedido = function (req, res) {
	//creamos un objeto con los datos a insertar del pedido

	var logoData = {
		idLogo: null,
		estado: "Editable",
		logo: req.body.logo,
		tipoLogo: req.body.tipoLogo,
		clientes_idCliente: req.idCliente,
		elementos_idElemento: req.body.idElemento
	};
	

	logo.insertLogo(logoData, function (error, data) {

		//si el logo se ha insertado correctamente
		if (data && data.insertId) {
            

			var atributos = req.body.atributos;

			for(var key in atributos){

				var atributosData = {
					clave : key,
					valor : atributos[key],
					logos_idLogo: data.insertId  
				};

				atributo.Guardar(atributosData, function(error, data) {

					if(!data && !data.insertId)
					{

						res.status(500).json({"msg":"Algo ocurrio"});

					}

				});

			} 

			var idLogo = data.insertId;
			var iso = services.geoipServices.iso(req.ip);
			var idPrecio = req.body.idPrecio;
			var idPasarela = req.body.idPasarela;

			pais.ObtenerImpuesto(iso, function (error, impuesto) {
				var pedidoData = {
					idPedido: null,
					fecha: moment().format("YYYY-MM-DD"),
					estado: "EN ESPERA",
					logos_idLogo: idLogo, // id del logo guardado
					precios_idPrecio: idPrecio,
					impuesto: impuesto,
					pasarelas_idPasarela: idPasarela,
					iso: iso
				};

				pedido.insertPedido(pedidoData, function (error, data) {
					//si el pedido se ha insertado correctamente mostramos su info
					if (data && data.insertId) {
						/// PAGO AQUI
						//////////////////////
						var idPedido= data.insertId;
						precio.datos(idPrecio, function (error, data) {

							if (typeof data !== "undefined" && data.length > 0) {
								var plan = data;
								elemento.datosElemento(req.body.idElemento, function (error, data) {

									if (typeof data !== "undefined" && data.length > 0) {

										var tipoE = data[0].tipo.replace(" ", "");

										pasarela.Obtener(idPasarela, function (error, data) {
											
											if (typeof data !== "undefined" && data.length > 0) {

												/////ENVIAR PAGO a paypal
												if (idPasarela == 1) {

													var datosPago = {
														precio: plan[0].precio,
														moneda: plan[0].moneda,
														descripcion: "Diseño de Logo- " + plan[0].plan,
														idLogo: idLogo,
														idElemento: req.body.idElemento,
														impuesto: impuesto,
														tipoElemento: tipoE,
														token: req.headers.auth,
														idPedido: idPedido
													};

													if(req.body.atributos.padre){
														datosPago.padre = req.body.atributos.padre; 
													}
													//console.log(req.body);
													services.pagoServices.paypal(datosPago, function (error, data) {
														res.json(data.link);
														//console.log(data.link)
													});

												} else {
													//falta Bloquear elemento
													res.status(200).json({
														"msg": true
													});
												}

											} else {
												res.status(404).json({
													"msg": "No existe el medio de pago"
												});
											}

										});

									} else {
										res.status(404).json({
											"msg": "No existe el elemento"
										});
									}
								});

							}
							//no existe
							else {
								res.status(404).json({
									"msg": "No existe el plan"
								});
							}

						});
						//////////////////////////////////
					} else {
						res.status(500).json({
							"msg": "Algo ocurrio al crear pedido"
						});
					}
				});
			});
		} else {
			res.status(500).json({
				"msg": "Algo ocurrio"
			});
		}
	});


};

exports.nuevoPedidoGuardado = function (req, res) {
	var idLogo = req.body.idLogo;
	var iso = services.geoipServices.iso(req.ip);
	var idPrecio = req.body.idPrecio;
	var idPasarela = req.body.pasarelas_idPasarela;

	pais.ObtenerImpuesto(iso, function (error, impuesto) {
		var pedidoData = {
			idPedido: null,
			fecha: moment().format("YYYY-MM-DD"),
			estado: "EN ESPERA",
			logos_idLogo: idLogo, // id del logo guardado
			precios_idPrecio: idPrecio,
			impuesto: impuesto,
			pasarelas_idPasarela: idPasarela,
			iso: iso
		};

		pedido.insertPedido(pedidoData, function (error, data) {
			//si el pedido se ha insertado correctamente mostramos su info
			if (data && data.insertId) {
				/// PAGO AQUI
				//////////////////////
				var idPedido= data.insertId;
				precio.datos(idPrecio, function (error, data) {
					if (typeof data !== "undefined" && data.length > 0) {
						var plan = data;
						elemento.datosElemento(req.body.idElemento, function (error, data) {

							if (typeof data !== "undefined" && data.length > 0) {

								var tipoE = data[0].tipo.replace(" ", "");

								pasarela.Obtener(idPasarela, function (error, data) {
									if (typeof data !== "undefined" && data.length > 0) {

										/////ENVIAR PAGO

										if (data[0].pasarela == "Paypal") {

											var datosPago = {
												precio: plan[0].precio,
												moneda: plan[0].moneda,
												descripcion: "Diseño de Logo- " + plan[0].plan,
												idLogo: idLogo,
												idElemento: req.body.idElemento,
												impuesto: impuesto,
												tipoElemento: tipoE,
												token: req.headers.auth,
												idPedido: idPedido
											};

											if(req.body.atributos.padre){
												datosPago.padre = req.body.atributos.padre; 
											}

											//console.log(req.body);

											services.pagoServices.paypal(datosPago, function (error, data) {
												res.json(data.link);
												//console.log(data.link)
											});

										} else {
											//falta Bloquear elemento
											res.status(200).json({
												"msg": true
											});
										}
									} else {
										res.status(404).json({
											"msg": "No existe el medio de pago"
										});
									}

								});

							} else {
								res.status(404).json({
									"msg": "No existe el elemento"
								});
							}
						});

					}
					//no existe
					else {
						res.status(404).json({
							"msg": "No existe el plan"
						});
					}

				});
			} else {
				res.status(500).json({
					"msg": "Algo ocurrio al crear pedido"
				});
			}
		});
	});
};

exports.cambioEstadoPagado = function (req, res)

{
	//console.log(req.params)
	var pedidoData = ["COMPLETADO", req.params.idPedido];

	pedido.cambiarEstado(pedidoData, function (error, data) {

		if (data) {
			//////cambiar estado al logo a descargable
			var logoData = ["Descargable", req.params.idLogo];

			logo.cambiarEstado(logoData, function (error) {

				if (!error) {

					if(req.params.padre){
						
						var logoPadre = ["Vendido", req.params.padre];

						logo.cambiarEstado(logoPadre, function (error_p) {

							if (!error_p) {
								
								var id = services.authServices.decodificar(req.params.tk).id;

								cliente.getCliente(id, function (error, data) {
			
									//console.log(data);
									services.emailServices.enviar("pedidoPago.html", {}, "Pedido pagado", data.correo);
			
								});
								res.redirect(configuracion.base+configuracion.pago + req.params.idLogo);
							
							}
						
						});
					
					}else{

						var id = services.authServices.decodificar(req.params.tk).id;

						cliente.getCliente(id, function (error, data) {
	
							//console.log(data);
							services.emailServices.enviar("pedidoPago.html", {}, "Pedido pagado", data.correo);
	
						});
						res.redirect(configuracion.base+configuracion.pago + req.params.idLogo);

					}

				} else {
					res.redirect(configuracion.base+configuracion.dashboard);
				}
			});
		} else {
			res.status(404).json({
				"msg": "Algo ocurrio en cambio de icono"
			});
		}
	});

};

exports.noPago = function (req, res) {

	res.redirect(configuracion.base+configuracion.dashboard);

};

exports.modificarPedido = function (req, res) {
	var idPedido = req.body.idPedido; // 

	pedido.getPedido(idPedido, function (error, data) {
		//si el pedido existe 
		if (typeof data !== "undefined" && data.length > 0) {
			//creamos un array con los datos a modificar del pedido
			var pedidoData = [req.body.fecha, req.body.estado, req.body.tipoP, idPedido];

			pedido.updatePedido(pedidoData, function (error, data) {
				//si el pedido se ha modificado correctamente
				if (data) {
					res.status(200).json(data);
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

exports.cambiarEstado = function (req, res) {
	var idPedido = req.body.idPedido; // 

	pedido.getPedido(idPedido, function (error, data) {
		//si el pedido existe 
		if (typeof data !== "undefined" && data.length > 0) {
			//creamos un array con los datos a modificar del pedido
			var pedidoData = [req.body.estado, idPedido];

			pedido.cambiarEstado(pedidoData, function (error, data) {
				//si el pedido se ha modificado correctamente
				if (data) {
					res.status(200).json(data);
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


exports.borrarPedido = function (req, res) {
	//id del pedido
	var id = req.params.id;
	pedido.deletePedido(id, function (error, data) {
		res.status(200).json(data);
	});

};