var pedido=require('../modelos/pedidosModelo.js');

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


exports.nuevoPedido =  function(req,res)
	{
		//creamos un objeto con los datos a insertar del pedido
		var pedidoData = {
			idpedido : null,
			fecha : req.body.fecha,
			estado : req.body.estado,
			tipo : req.body.tipo,
			logos_idLogo : req.body.idLogo, // cambiar por id del logo guardado
			clientes_idCliente : req.body.idCliente, // cambiar por id del logo guardado
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

	exports.modificarPedido =  function(req,res)
	{
		var idpedido = req.body.idPedido 

		pedido.getPedido(idpedido,function(error, data)
		{
		//si el pedido existe 
			if (typeof data !== 'undefined' && data.length > 0)
			{
				//creamos un array con los datos a modificar del pedido
				var pedidoData = [req.body.nombrepedido, req.body.correo, req.body.pass, idpedido];
					
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

exports.borrarPedido =  function(req, res, next) {
		//id del pedido
		var id = req.params.id;
		pedido.deletePedido(id,function(error, data)
		{
			res.status(200).json(data);
		});

	}
