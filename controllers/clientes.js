var cliente=require('../modelos/clientesModelo.js');


exports.login =  function(req,res)
	{
		//creamos un objeto con los datos a insertar del usuario
	
		var clienteData = [req.body.correo,req.body.pass];
		cliente.verificarCliente(clienteData,function(error, data)
		{
			//si el usuario existe 
			if (typeof data !== 'undefined' && data.length > 0)
			{
			
			var jwt = require('jwt-simple');
			var moment = require('moment');
			var payload = {
					sub:data,
					iat:moment().unix(),
					exp:moment().add(1,'days').unix()
				};
				var x = jwt.encode(payload,'misecretoken');
				var z = jwt.decode(x,'misecretoken')
				res.status(200).send(z);
				
			}
		//no existe
			else
			{
				res.status(404).json(data);
			}
		});
	} 


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
			pass : req.body.pass,
			telefono : req.body.telefono,
			pais : req.body.pais
		};
		cliente.insertCliente(clienteData,function(error, data)
		{
			//si el cliente se ha insertado correctamente mostramos su info
			if(data && data.insertId)
			{
				res.status(201).json(data);
			}
			else
			{
				res.status(500).json(data)
			}
		});
	}

	exports.modificarCliente =  function(req,res)
	{
		var idCliente = req.body.idCliente // cambiar por valor de sesion o por parametro

		cliente.getCliente(idCliente,function(error, data)
		{
		//si el usuario existe 
			if (typeof data !== 'undefined' && data.length > 0)
			{
				//creamos un array con los datos a modificar del cliente
				var clienteData = [req.body.nombreCliente, req.body.correo, req.body.pass, req.body.telefono, idCliente];
					
				cliente.updateCliente(clienteData,function(error, data)
				{
					//si el cliente se ha modificado correctamente
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

exports.borrarCliente =  function(req, res, next) {
		//id del cliente
		var id = req.params.id;
		cliente.deleteCliente(id,function(error, data)
		{
			res.status(200).json(data);
		});

	}




