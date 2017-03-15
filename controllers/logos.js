var logo=require('../modelos/logosModelo.js');

exports.listaLogosGuardados = function(req, res, next) {
		
		var par = ["Editable",req.params.id]

		logo.getLogosTipo(par,function(error, data)
		{
			//si el usuario existe 
			if (typeof data !== 'undefined' && data.length > 0)
			{
				res.status(200).json(data);
			}
		//no existe
			else
			{
				res.status(404).json({"msg":"No hay logos guardados por el cliente"})
			}
		});

	}

