var pedido=require('../modelos/pedidosModelo.js');
var logo=require('../modelos/logosModelo.js');
var moment = require('moment');
var paypal_api = require('paypal-rest-sdk');

var config_opts = {
    'host': 'api.sandbox.paypal.com',
    'port': '',
    'client_id': 'AVpLm3Mj781_AAa4M5gArCwllQ2LIv5WT6qccHJOjdbOMFOz_6fQmItQQbCWvXeeG3TS1qBA6a8_8NoV',
    'client_secret': 'EO-vJ68bnGFvig7xhITyMgtSYH24fb6tJqYL7VPFEdJ38B6cz0R6m-Bo3GMhYyVtCBkh6KLzW4k1KDlD'
};

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
    
    saleId = req.body.idPago
    
    paypal_api.sale.get(saleId, config_opts, function (get_err, get_res) {
    if (get_err) {
        throw get_res;
    }

    if (get_res) {
        
        console.log(JSON.stringify(get_res));
        
        		//creamos un objeto con los datos a insertar del pedido

		var logoData = {
			idLogo : null,
			tipoLogo : 'Descargable',
			logo : req.body.logo,
			clientes_idCliente : req.body.idCliente,
			elementos_idElemento : req.body.idElemento
		};


		logo.insertLogo(logoData,function(error, data)
		{
			//si el pedido se ha insertado correctamente mostramos su info
			if(data && data.insertId)
			{
					var pedidoData = {
					idPedido : null,
					fecha : moment().format("YYYY-MM-DD"),
					estado : 'EN ESPERA',
					tipoP : '1',
					logos_idLogo : data.insertId, // id del logo guardado
					};

				pedido.insertPedido(pedidoData,function(error, data)
				{
					//si el pedido se ha insertado correctamente mostramos su info
					if(data && data.insertId)
					{
						res.status(201).json(data);
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

    });
    
    
	
	}

	exports.nuevoPedidoGuardado =  function(req,res)
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
					
						logo.cambiarTipo(logoData,function(error, data)
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
