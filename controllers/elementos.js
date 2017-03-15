var elemento=require('../modelos/elementosModelo.js');
var async = require("async");

// FUNCION QUE DEVUELVE LOS ICONOS SEGUN 
exports.listaIconosPref = function(req, res, next) {
	//inicio del ciclo for

	var datos = [ [2, 2, 2, 'FUENTE'], [2,2,2, 'ICONO']];
   
	var coincidencias = [];
	
	async.each(datos,  function (dato,callback) {

		elemento.getElementos( dato, function(error, data)
		{
		//si  existe 
			if (typeof data !== 'undefined' && data.length > 0)
			{ /*
			//si las coincidencias son menores a 12 buscar las que concuerden con la categoria
					if( data.length < 12){

						elemento.getElementosIncat( data, function (error, data){
							res.status(200).json(data);
						});		
					}
					
					//fin del if/
					*/
				coincidencias = coincidencias.concat(data);
				callback();
				
			}
			else
				callback();

		});
	},

	function(err){
		if (err)
			res.status(500);
		else
			res.json(coincidencias)
	}); 
}

/*exports.datosPedido =  function(req, res, next) {
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
			idPedido : null,
			fecha : req.body.fecha,
			estado : req.body.estado,
			tipo : req.body.tipo,
			elementos_idLogo : req.body.elementos_idLogo, // cambiar por id del elemento guardado
			clientes_idCliente : req.body.clientes_idCliente // cambiar por id del cliente guardado
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
		var idPedido = req.body.idPedido  // 

		pedido.getPedido(idPedido,function(error, data)
		{
		//si el pedido existe 
			if (typeof data !== 'undefined' && data.length > 0)
			{
				//creamos un array con los datos a modificar del pedido
				var pedidoData = [req.body.fecha, req.body.estado, req.body.tipo, req.body.elementos_idLogo, req.body.clientes_idCliente, idPedido];
					
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
*/