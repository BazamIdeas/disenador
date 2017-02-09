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