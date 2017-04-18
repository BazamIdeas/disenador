var usuario=require('../modelos/usuarioModelo.js');



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
		var usuarioData = req.body;
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
				
				var usuarioData = req.body;
					
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