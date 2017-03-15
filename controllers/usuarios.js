var usuario=require('../modelos/usuarioModelo.js');



exports.login =  function(req,res)
	{
		//creamos un objeto con los datos a insertar del usuario
	
		var usuarioData = [req.body.correo,req.body.pass];
		usuario.verificarUsuario(usuarioData,function(error, data)
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

exports.listaUsuarios = function(req, res, next) {
		
		usuario.getUsuarios(function(error, data)
		{
			//si el usuario existe 
			if (typeof data !== 'undefined' && data.length > 0)
			{
				res.status(200).json(data);
			}
		//no existe
			else
			{
				res.status(404).json({"msg":"No hay usuarios registrados"})
			}
		});

	}


	exports.datosUsuario =  function(req, res, next) {
		//id del Usuario
		var id = req.params.id;
		usuario.getUsuario(id,function(error, data)
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


exports.nuevoUsuario =  function(req,res)
	{
		//creamos un objeto con los datos a insertar del usuario
		var usuarioData = {
			idUsuario : null,
			nombreUser : req.body.nombreUser,
			correo : req.body.correo,
			pass : req.body.pass
		};
		usuario.insertUsuario(usuarioData,function(error, data)
		{
			//si el usuario se ha insertado correctamente mostramos su info
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

	exports.modificarUsuario =  function(req,res)
	{
		var idUsuario = req.body.idUsuario // cambiar por valor de sesion o por parametro

		usuario.getUsuario(idUsuario,function(error, data)
		{
		//si el usuario existe 
			if (typeof data !== 'undefined' && data.length > 0)
			{
				//creamos un array con los datos a modificar del usuario
				var usuarioData = [req.body.nombreUser, req.body.correo, req.body.pass, idUsuario];
					
				usuario.updateUsuario(usuarioData,function(error, data)
				{
					//si el usuario se ha modificado correctamente
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

exports.borrarUsuario =  function(req, res, next) {
		//id del usuario
		var id = req.params.id;
		usuario.deleteUsuario(id,function(error, data)
		{
			res.status(200).json(data);
		});

	}