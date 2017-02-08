var cliente=require('../modelos/clientesModelo.js');

exports.listaClientes = function(req, res, next) {
		cliente.getClientes(function(error, data)
		{
			//si el usuario existe 
			if (typeof data !== 'undefined' && data.length > 0)
			{
				res.status(200).json(data);
			}
		//no existe
			else
			{
				res.status(404).json({"msg":"No hay clientes registrados"})
			}
		});

	}

exports.datosCliente =  function(req, res, next) {
		//id del cliente
		var id = req.params.id;
		cliente.getCliente(id,function(error, data)
		{
		//si el usuario existe 
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


exports.nuevoCliente =  function(req,res)
	{
		//creamos un objeto con los datos a insertar del cliente
		var clienteData = {
			idCliente : null,
			nombreCliente : req.body.nombreCliente,
			correo : req.body.correo,
			pass : req.body.pass
		};
		cliente.insertCliente(clienteData,function(error, data)
		{
			//si el cliente se ha insertado correctamente mostramos su info
			if(data && data.insertId)
			{
				res.status(200).json(data);
			}
			else
			{
				res.status(500).json({"msg":"Algo ocurrio"})
			}
		});
	}

exports.borrarCliente =  function(req, res, next) {
		//id del cliente
		var id = req.params.id;
		cliente.deleteCliente(id,function(error, data)
		{
			res.status(200).json(data);
		});

	}




