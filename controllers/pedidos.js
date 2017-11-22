var pedido        = require('../modelos/pedidosModelo.js');
var logo          = require('../modelos/logosModelo.js');
var cliente       = require('../modelos/clientesModelo.js');
var services      = require('../services');
var elemento      = require('../modelos/elementosModelo.js');
var configuracion = require('../configuracion.js');
var moment        = require('moment');
var pais          = require('../modelos/paisesModelo.js');
var precio        = require('../modelos/preciosModelo.js');
var pasarela      = require('../modelos/pasarelasModelo.js');

exports.listaPedidos = function(req, res, next) {

	pedido.getPedidos(function(error, data)
	{
		
		//si el usuario existe 
		if (typeof data !== 'undefined' && data.length > 0)
		{
			res.status(200).json(data);
		}
	//no existe
		else
		{
			res.status(404).json({"msg":"No hay pedidos registrados"})
		}
	});

}

exports.ListarPorPais = function(req, res, next) {

	pedido.ListarPorPais(req.params.iso,function(error, data)
	{
		//si el usuario existe 
		if (typeof data !== 'undefined' && data.length > 0)
		{
			res.status(200).json(data);
		}
		else
		{
			res.status(404).json({"msg":"No hay pedidos registrados"})
		}
	});

}

exports.datosPedido =  function(req, res, next) {
	//id del pedido
	var id = req.params.id;
	pedido.getPedido(id,function(error, data)
	{
		//si el pedido existe 
		if (typeof data !== 'undefined' && data.length > 0)
		{
			res.status(200).json(data);
		}
		//no existe
		else
		{
			res.status(204).json({"msg":"No Encontrado"})
		}
	});

}

exports.datosPedidosCliente =  function(req, res, next) {
		//id del pedido
		var id = req.params.id;
		pedido.getPedidosCliente(id,function(error, data)
		{
		//si el pedido existe 
			if (typeof data !== 'undefined' && data.length > 0)
			{
				res.status(200).json(data);
			}
		//no existe
			else
			{
				res.status(404).json({"msg":"No Encontrado"})
			}
		});

	}

exports.nuevoPedido =  function(req,res)
	{
		//creamos un objeto con los datos a insertar del pedido

		var logoData = {
		idLogo : null,
		estado : 'Editable',
		logo : req.body.logo,
		tipoLogo : req.body.tipoLogo,
		clientes_idCliente : req.idCliente,
		elementos_idElemento : req.body.idElemento
		};


		logo.insertLogo(logoData,function(error, data)
		{	

				//si el logo se ha insertado correctamente 
				if(data && data.insertId){
					
					idLogo = data.insertId
					iso = services.geoipServices.Iso(req.ip)
					idPrecio = req.body.idPrecio
					idPasarela = req.body.pasarelas_idPasarela

					pais.ObtenerImpuesto(iso,function(error, impuesto)
					{
						var pedidoData = {
							idPedido : null,
							fecha : moment().format("YYYY-MM-DD"),
							estado : 'EN ESPERA',
							logos_idLogo : idLogo, // id del logo guardado
							precios_idPrecio : idPrecio,
							impuesto : impuesto,
							pasarelas_idPasarela: idPasarela,
							iso : iso
							};

						pedido.insertPedido(pedidoData,function(error, data)
						{
							//si el pedido se ha insertado correctamente mostramos su info
							if(data && data.insertId){
								/// PAGO AQUI
								//////////////////////
								
								precio.datos(idPrecio,function(error, data)
								{
									if (typeof data !== 'undefined' && data.length > 0){
										var plan = data;
										elemento.datosElemento(req.body.idElemento,function(error, data){

											if (typeof data !== 'undefined' && data.length > 0){

												tipoE = data[0].tipo.replace(" ","");
												
												pasarela.Obtener(idPasarela,function(error, data)
												{
													if (typeof data !== 'undefined' && data.length > 0){

														/////ENVIAR PAGO

														if (data[0].pasarela == "Paypal"){

														var datosPago = {
															precio : plan[0].precio,
															moneda : plan[0].moneda,
															descripcion : "Diseño de Logo- "+plan[0].plan, 
															idLogo : idLogo,
															idElemento : req.body.idElemento,
															impuesto : impuesto,
															tipoElemento : tipoE,
															token : req.headers.auth
															}

															services.pagoServices.paypal(datosPago,function(error, data){
																	res.json(data.link)
																	//console.log(data.link)
															});

														}
														else{
															//falta Bloquear elemento
															res.status(200).json({"msg":true})
														}

													}

													else{
														res.status(404).json({"msg":"No existe el medio de pago"})
													}	

												});

											}
											else{
												res.status(404).json({"msg":"No existe el elemento"})
											}
										});										
										
									}
									//no existe
									else{
										res.status(404).json({"msg":"No existe el plan"})
									}

								});
							//////////////////////////////////
							}
							else{
								res.status(500).json({"msg":"Algo ocurrio al crear pedido"})
							}
						});
					});
				}
				else{
					res.status(500).json({"msg":"Algo ocurrio"})
				}
			});


	}

	exports.nuevoPedidoGuardado =  function(req,res) 
	{
		idLogo = req.body.idLogo
		iso = services.geoipServices.Iso(req.ip)
		idPrecio = req.body.idPrecio
		idPasarela = req.body.pasarelas_idPasarela

		pais.ObtenerImpuesto(iso,function(error, impuesto)
		{
			var pedidoData = {
				idPedido : null,
				fecha : moment().format("YYYY-MM-DD"),
				estado : 'EN ESPERA',
				logos_idLogo : idLogo, // id del logo guardado
				precios_idPrecio : idPrecio,
				impuesto : impuesto,
				pasarelas_idPasarela: idPasarela,
				iso : iso
				};

			pedido.insertPedido(pedidoData,function(error, data)
			{
				//si el pedido se ha insertado correctamente mostramos su info
				if(data && data.insertId){
					/// PAGO AQUI
					//////////////////////
					
					precio.datos(idPrecio,function(error, data)
					{
						if (typeof data !== 'undefined' && data.length > 0){
							var plan = data;
							elemento.datosElemento(req.body.idElemento,function(error, data){

								if (typeof data !== 'undefined' && data.length > 0){

									tipoE = data[0].tipo.replace(" ","");
									
									pasarela.Obtener(idPasarela,function(error, data)
									{
										if (typeof data !== 'undefined' && data.length > 0){

											/////ENVIAR PAGO

											if (data[0].pasarela == "Paypal"){

											var datosPago = {
												precio : plan[0].precio,
												moneda : plan[0].moneda,
												descripcion : "Diseño de Logo- "+plan[0].plan, 
												idLogo : idLogo,
												idElemento : req.body.idElemento,
												impuesto : impuesto,
												tipoElemento : tipoE,
												token : req.headers.auth
												}

												services.pagoServices.paypal(datosPago,function(error, data){
														res.json(data.link)
														//console.log(data.link)
												});

											}
											else{
												//falta Bloquear elemento
												res.status(200).json({"msg":true})
											}
										}

										else{
											res.status(404).json({"msg":"No existe el medio de pago"})
										}	

									});

								}
								else{
									res.status(404).json({"msg":"No existe el elemento"})
								}
							});										
							
						}
						//no existe
						else{
							res.status(404).json({"msg":"No existe el plan"})
						}

					});
				}
				else{
					res.status(500).json({"msg":"Algo ocurrio al crear pedido"})
				}
			});
		});
	}

	exports.cambioEstadoPagado = function(req,res)

	{
		if(req.params.tipo == "ICONO"){
			var elementoData = [1, req.params.idElemento];
		}
		else{
			var elementoData = [0, req.params.idElemento];
		}
		
		elemento.cambiarEstado(elementoData,function(error, data)
			{
				
				if(data)
				{
				//////cambiar estado al logo a descargable
					var logoData = ["Descargable", req.params.idLogo];

					logo.cambiarEstado(logoData,function(error, data)
					{
					
						if(!error)
						{

							var id = services.authServices.decodificar(req.params.tk).id;
							
							cliente.getCliente(id, function(error, data){

								//console.log(data);
								services.emailServices.enviar('pedidoPago.html', {}, "Pedido pagado", data.correo);

							});
							
							res.redirect(configuracion.dashboard+"?pago=true");
						}
						else
						{
							res.redirect(configuracion.dashboard+"?pago=false");
						}
					});
				}
				else
				{
					res.status(404).json({"msg":"Algo ocurrio en cambio de icono"})
				}
			});

	}

	exports.noPago = function(req,res)
	{
		
		res.redirect(configuracion.dashboard+"?pago=false");

	}

	exports.modificarPedido =  function(req,res)
	{
		var idPedido = req.body.idPedido  // 

		pedido.getPedido(idPedido,function(error, data)
		{
		//si el pedido existe 
			if (typeof data !== 'undefined' && data.length > 0)
			{
				//creamos un array con los datos a modificar del pedido
				var pedidoData = [req.body.fecha, req.body.estado, req.body.tipoP, idPedido];
					
				pedido.updatePedido(pedidoData,function(error, data)
				{
					//si el pedido se ha modificado correctamente
					if(data)
					{
						res.status(200).json(data);
					}
					else
					{
						res.status(500).json({"msg":"Algo ocurrio"})
					}
				});
			}
		//no existe
			else
			{
				res.status(404).json({"msg":"No existe"})
			}
		});
	}

exports.cambiarEstado =  function(req,res)
	{
		var idPedido = req.body.idPedido  // 

		pedido.getPedido(idPedido,function(error, data)
		{
		//si el pedido existe 
			if (typeof data !== 'undefined' && data.length > 0)
			{
				//creamos un array con los datos a modificar del pedido
				var pedidoData = [req.body.estado, idPedido];
					
				pedido.cambiarEstado(pedidoData,function(error, data)
				{
					//si el pedido se ha modificado correctamente
					if(data)
					{
						res.status(200).json(data);
					}
					else
					{
						res.status(500).json({"msg":"Algo ocurrio"})
					}
				});
			}
		//no existe
			else
			{
				res.status(404).json({"msg":"No existe"})
			}
		});
	}


exports.borrarPedido =  function(req, res, next) {
		//id del pedido
		var id = req.params.id;
		pedido.deletePedido(id,function(error, data)
		{
			res.status(200).json(data);
		});

	}
