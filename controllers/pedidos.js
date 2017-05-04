var pedido=require('../modelos/pedidosModelo.js');
var logo=require('../modelos/logosModelo.js');
var pago=require('../modelos/pagosModelo.js');
var elemento=require('../modelos/elementosModelo.js');
var precio=require('../modelos/preciosModelo.js');
var configuracion=require('../configuracion.js');
var moment = require('moment');

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
				res.status(404).json({"msg":"No Encontrado"})
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
			{idPrecio = req.body.idPrecio

				//si el logo se ha insertado correctamente 
				if(data && data.insertId)
				{
					idLogo = data.insertId;
						var pedidoData = {
						idPedido : null,
						fecha : moment().format("YYYY-MM-DD"),
						estado : 'EN ESPERA',
						logos_idLogo : data.insertId, // id del logo guardado
						impuestos_localidad : req.body.localidad,
						precios_idPrecio : idPrecio
						};

					pedido.insertPedido(pedidoData,function(error, data)
					{
						//si el pedido se ha insertado correctamente mostramos su info
						if(data && data.insertId)
						{
							/// PAGO AQUI
							//////////////////////
							
							precio.getPrecio(idPrecio,function(error, data)
								{
								if (typeof data !== 'undefined' && data.length > 0)
								{
									var plan = data;

									////IDENTIFICAR VARIABLES DEL PAGO
									if (req.body.tipoPago){
										 var datosPago = {
											tipoPago : req.body.tipoPago,
											precio : plan[0].precio,
											moneda : plan[0].moneda,
											localidad : req.body.localidad,
											descripcion : "Diseño de logo - "+plan[0].plan, 
											localidad : req.body.localidad,
											idLogo : idLogo,
											idElemento : req.body.idElemento
											}

										if (req.body.tipoPago == "credit_card"){

											datosPago.tTarjeta = req.body.tTarjeta,
											datosPago.nTarjeta = req.body.nTarjeta,
											datosPago.expire_month =  req.body.month,
											datosPago.expire_year = req.body.year
										}
									/////ENVIAR PAGO
										
										pago.realizarPago(datosPago,function(error, data){

											if (req.body.tipoPago == "credit_card"){
												if (data.res == "approved") {
													//// cambiar estado al icono
													var elementoData = [1, req.body.idElemento];
						
													elemento.cambiarEstado(elementoData,function(error, data)
													{
														if(data)
														{
														//////cambiar estado al logo a descargable
															var logoData = ["Descargable", idLogo];
							
															logo.cambiarEstado(logoData,function(error, data)
															{
															
																if(data)
																{
																	////////////////////////////// ENVIAR CORREO AQUI
																		res.status(200).json({"res":true,"msg":"Pago aprobado"});
																}
																else
																{
																	res.status(404).json({"msg":"Algo ocurrio en cambio de estado de logo"})
																}
															});
														}
														else
														{
															res.status(404).json({"msg":"Algo ocurrio en cambio de icono"})
														}
													});
											    }
											    else{
											    	res.status(404).json({"res":false,"msg":"El pago no fue aceptado"})
											    }
											}
											if (req.body.tipoPago == "paypal"){
												res.redirect(data.link)
											}
											else{
												res.status(404).json(data)
											}
										});

									}
									else{
										res.status(404).json({"msg":"No existe el medio de pago"})
									}
									
								}
								//no existe
								else
								{
									res.status(404).json({"msg":"No existe el plan"})
								}

								});
						//////////////////////////////////
						}
						else
						{
							res.status(500).json({"msg":"Algo ocurrio al crear pedido"})
						}
					});
				}
				else
				{
					res.status(500).json({"msg":"Algo ocurrio"})
				}
			});


	}

	exports.cambioEstadoPagado = function(req,res)

	{
		var elementoData = [1, req.params.idElemento];
		elemento.cambiarEstado(elementoData,function(error, data)
			{
				if(data)
				{
				//////cambiar estado al logo a descargable
					var logoData = ["Descargable", req.params.idLogo];

					logo.cambiarEstado(logoData,function(error, data)
					{
					
						if(data)
						{
							////////////////////////////// ENVIAR CORREO AQUI
								 res.redirect(configuracion.dashboard+"?pago=true");
						}
						else
						{
							res.redirect(configuracion.dashboard+"?pago=true");
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

	exports.nuevoPedidoGuardado =  function(req,res) /// ARREGLARRRRR
	{
			var pedidoData = {
					idPedido : null,
					fecha : moment().format("YYYY-MM-DD"),
					estado : 'EN ESPERA',
					tipoP : '1',
					logos_idLogo : req.body.idLogo, // id del logo guardado
					};

				pedido.insertPedido(pedidoData,function(error, data)
				{
					//si el pedido se ha insertado correctamente mostramos su info
					if(data && data.insertId)
					{
						var logoData = ['Descargable', req.body.idLogo];
					
						logo.cambiarEstado(logoData,function(error, data)
						{
							//si el pedido se ha modificado correctamente
							if(data)
							{
								var elementoData = [1, req.body.idElemento];
					
								elemento.cambiarEstado(elementoData,function(error, data)
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
							else
							{
								res.status(500).json({"msg":"Algo ocurrio"})
							}
						});
					}
					else
					{
						res.status(500).json({"msg":"Algo ocurrio"})
					}
				});
		
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
