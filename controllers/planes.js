var planes=require('../modelos/planesModelo.js');

exports.listarPlanes = function(req, res, next) {
		
		planes.getPlanes(function(error, data)
		{
			//si el usuario existe 
			if (typeof data !== 'undefined' && data.length > 0)
			{
				res.status(200).json(data);
			}
		//no existe
			else
			{
				res.status(404).json({"msg":"No hay resgitro de planes en la base de datos"})
			}
		});

	}

exports.nuevoPlan = function(req,res)
	{
		//creamos un objeto con los datos a insertar del cliente
		var pnomdat = {
							idPlan: null,
							plan : req.body.plan
						}

		planes.insertPlan(pnomdat,function(error, data)
		{
			//si la etiqueta se ha insertado correctamente mostramos su info
			if(data && data.insertId)
			{
					res.status(200).json(data);
					
						var planPrecio = {
							idPrecio : null,
							precio : req.body.precio,
						   	moneda : req.body.moneda,
						   	planes_idPlan : data.insertId
						};
						console.log(data);

				planes.insertPrecio(planPrecio,function(error, data)
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
			else
			{
				res.status(500).json({"msg":"Algo ocurrio"})
			}
		});
	}

	exports.selectPlan = function(req, res, next) {
		
		planes.getselectPlanes(function(error, data)
		{
			//si el usuario existe 
			if (typeof data !== 'undefined' && data.length > 0)
			{
				res.status(200).json(data);
			}
		//no existe
			else
			{
				res.status(404).json({"msg":"No hay resgitro de planes en la base de datos"})
			}
		});

	}


	exports.nuevoPrecio = function(req,res)
	{

		var planPrecio = {
							idPrecio: null,
							precio : req.body.precio,
							moneda : req.body.moneda,
							status : 1,
							planes_idPlan : req.body.idplan
						}
			

		planes.insertPrecio(planPrecio,function(error, data)
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

exports.modificarPlan =  function(req,res)
	{
		var idprecio = req.body.idprecio; // cambiar por valor de sesion o por parametro
		
		planes.updateprecio(idprecio,function(error, data)
		{
		//si el usuario existe 
			if (data)
			{
				var precioData = { 
							idPrecio: null,
							precio : req.body.precio,
							moneda : req.body.moneda,
							status : 1,
							planes_idPlan : req.body.idplan
						}
				
		planes.insertPrecio(precioData,function(error, data)
		{
			
			
						if(data && data.result)
						{
							console.log(data);

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
