var usuario  = require('../modelos/usuarioModelo.js');
var services = require('../services');

exports.login =  function(req,res,next)
	{
		//creamos un objeto con los datos a insertar del usuario
	
		var usuarioData = [req.body.correo,req.body.pass];

		usuario.verificarUsuario(usuarioData,function(error, data)
		{
			//si el usuario existe  
			if (typeof data !== 'undefined' && data.length > 0)
			{
				res.status(200).json({
					'nombre':data[0].nombreUser,
					'token':services.authServices.crearToken(data[0].idUsuario,"admin")
				})
				//res.status(200).json(data)

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
			nombreUser:req.body.nombreUser,
			correo : req.body.correo,
			pass : req.body.pass
		};
		usuario.insertUsuario(usuarioData,function(error, data)
		{
			//si el usuario se ha insertado correctamente mostramos su info
			if(data && data.insertId)
			{
				res.status(200).json({
					'nombre':req.body.nombreUser,
					'token':services.authServices.crearToken(data.insertId,"admin")
				})
			}
			else
			{
				res.status(404).json(data)
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
				
				//var usuarioData = [req.body.nombreUser,req.body.pass,req.body.idUsuario];
					
				usuario.updateUsuario(req.body, req.body.passActual,function(error, data)
				{
					//si el usuario se ha modificado correctamente
					if(typeof data !== 'undefined' && data.affectedRows)
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