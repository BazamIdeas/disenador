var etiqueta=require('../modelos/etiquetasModelo.js');

exports.listaEtiquetas = function(req, res, next) {
		
		etiqueta.getEtiquetas(function(error, data)
		{
			//si el usuario existe 
			if (typeof data !== 'undefined' && data.length > 0)
			{
				res.status(200).json(data);
			}
		//no existe
			else
			{
				res.status(404).json({"msg":"No hay etiquetas en la base de datos"})
			}
		});

	}


exports.nuevaEtiqueta =  function(req,res)
	{
		//creamos un objeto con los datos a insertar del cliente
		var etiquetaData = {nombreEtiqueta :req.body.nombreEtiqueta,
						   idEtiqueta : null
						};
			
		
		etiqueta.insertEtiqueta(etiquetaData,function(error, data)
		{
			//si la etiqueta se ha insertado correctamente mostramos su info
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



	exports.modificarEtiqueta =  function(req,res)
	{
		var idEtiqueta = req.body.idEtiqueta; // cambiar por valor de sesion o por parametro

		etiqueta.getEtiqueta(idEtiqueta,function(error, data)
		{
		//si el usuario existe 
			if (typeof data !== 'undefined' && data.length > 0)
			{
				//creamos un array con los datos a modificar del cliente
				var etiquetaData = [req.body.nombreEtiqueta,req.body.idEtiqueta];
					
				etiqueta.updateEtiqueta(etiquetaData,function(error, data)
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



	exports.borrarEtiqueta =  function(req, res, next) {
		//id del cliente
		var id = req.params.id;
		etiqueta.deleteEtiqueta(id,function(error, data)
		{
			res.status(200).json(data);
		});

	}