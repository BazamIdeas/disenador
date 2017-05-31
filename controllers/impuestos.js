var impuesto=require('../modelos/impuestoModelo.js');

exports.listaImpuesto = function(req, res, next) {
		
		impuesto.getImpuestos(function(error, data)
		{
			//si el usuario existe 
			if (typeof data !== 'undefined' && data.length > 0)
			{
				res.status(200).json(data);
			}
		//no existe
			else
			{
				res.status(404).json({"msg":"No hay resgitro de impuesto en la base de datos"})
			}
		});

	}


exports.nuevoImpuesto=function(req,res)
	{
		//creamos un objeto con los datos a insertar del cliente
		var impuestoData = {

							localidad :req.body.localidad,
						   	impuesto : req.body.impuesto
						};
			
		
		impuesto.insertImpuesto(impuestoData,function(error, data)
		{
			//si la etiqueta se ha insertado correctamente mostramos su info
			if(data && data.result)
			{
				res.status(200).json(data);
			}
			else
			{
				res.status(500).json({"msg":"Algo ocurrio"})
			}
		});
	}

exports.modificarImpuesto =  function(req,res)
	{
		var localidad = req.body.localidad; // cambiar por valor de sesion o por parametro

		impuesto.getImpuesto(localidad,function(error, data)
		{
		//si el usuario existe 
			if (typeof data !== 'undefined' && data.length > 0)
			{
				//creamos un array con los datos a modificar del cliente
				var impuestoData = [req.body.impuesto,req.body.localidad];
					
				impuesto.updateImpuesto(impuestoData,function(error, data)
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
				console.log(impuestoData);
			}
		//no existe
			else
			{
				res.status(404).json({"msg":"No existe"})
			}
		});
	}


	exports.borrarImpuesto =  function(req, res, next) {
		//id del cliente
		var id = req.params.id;
		impuesto.deleteImpuesto(id,function(error, data)
		{
			res.status(200).json(data);
		});

	}