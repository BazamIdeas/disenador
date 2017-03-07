var preferencia=require('../modelos/preferenciasModelo.js');

exports.listaPreferencias = function(req, res, next) {
		
		preferencia.getPreferencias(function(error, data)
		{
			//si el usuario existe 
			if (typeof data !== 'undefined' && data.length > 0)
			{
				res.status(200).json(data);
			}
		//no existe
			else
			{
				res.status(404).json({"msg":"No hay categorias en la base de datos"})
			}
		});

	}


exports.nuevaPreferencia =  function(req,res)
	{
		//creamos un objeto con los datos a insertar del cliente
		var preferenciaData = {
			idPreferencia : null,
			nombre1: req.body.nombre1,
			nombre2: req.body.nombre2
			
		};
		preferencia.insertPreferencia(preferenciaData,function(error, data)
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



	exports.modificarPreferencia =  function(req,res)
	{
		var idPreferencia = req.body.idPreferencia // cambiar por valor de sesion o por parametro

		preferencia.getPreferencia(idPreferencia,function(error, data)
		{
		//si el usuario existe 
			if (typeof data !== 'undefined' && data.length > 0)
			{
				//creamos un array con los datos a modificar del cliente
				var preferenciaData = [req.body.nombre1, req.body.nombre2,  idPreferencia];
					
				preferencia.updatePreferencia(preferenciaData,function(error, data)
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



	exports.borrarPreferencia =  function(req, res, next) {
		//id del cliente
		var id = req.params.id;
		preferencia.deletePreferencia(id,function(error, data)
		{
			res.status(200).json(data);
		});

	}