var planes = require('../modelos/planesModelo.js');

exports.listarPlanes = function (req, res, next) {

	planes.getPlanes(function (error, data) {
		//si el usuario existe 
		if (typeof data !== 'undefined' && data.length > 0) {
			res.status(200).json(data);
		}
		//no existe
		else {
			res.status(404).json({
				"msg": "No hay resgitro de planes en la base de datos"
			})
		}
	});

}

exports.nuevoPlan = function (req, res) {
	//creamos un objeto con los datos a insertar del cliente
	var pnomdat = {
		idPlan: null,
		plan: req.body.plan,
		status: 1,
		info:req.body.info
	}

	planes.insertPlan(pnomdat, function (error, data) {
		//si la etiqueta se ha insertado correctamente mostramos su info
		if (data && data.insertId) {

			var planPrecio = {
				idPrecio: null,
				precio: req.body.precio,
				moneda: req.body.moneda,
				isoPais: req.body.pais,
				planes_idPlan: data.insertId
			};

			planes.insertPrecio(planPrecio, function (error, data) {
				//si la etiqueta se ha insertado correctamente mostramos su info
				if (data && data.result) {


					res.status(200).json(data);
					console.log(data);
					console.log(planPrecio);
				} else {
					res.status(500).json({
						"msg": "Algo ocurrio"
					})
				}
			});

		} else {
			res.status(500).json({
				"msg": "Algo ocurrio"
			})
		}
	});
}

exports.selectPlan = function (req, res, next) {

	planes.getselectPlanes(function (error, data) {
		//si el usuario existe 
		if (typeof data !== 'undefined' && data.length > 0) {
			res.status(200).json(data);
		}
		//no existe
		else {
			res.status(404).json({
				"msg": "No hay resgitro de planes en la base de datos"
			})
		}
	});

}

exports.getPlanesWithPrices = function (req, res, next) {
	
	planes.getPlanesWithPrices(function (error, data) {

			if (typeof data !== 'undefined' && data.length > 0) {
				res.status(200).json(data);
			}

			else {
				res.status(404).json({
					"msg": "No hay resgitro de planes en la base de datos"
				})
			}
		});
	
}

exports.nuevoPrecio = function (req, res) {

	var planPrecio = {
		idPrecio: null,
		precio: req.body.precio,
		moneda: req.body.moneda,
		isoPais: req.body.pais,
		status: 1,
		planes_idPlan: req.body.idplan
	}

	planes.insertPrecio(planPrecio, function (error, data) {
		if (data && data.result) {

			res.status(200).json(data);
		} else {
			res.status(500).json({
				"msg": "Algo ocurrio"
			})
		}
	});

}

exports.modificarPlan = function (req, res) {
	var idprecio = req.body.idPrecio;
	planes.updateprecio(idprecio, function (error, data) {

		if (data) {
			var precioData = {
				idPrecio: null,
				precio: req.body.precio,
				moneda: req.body.moneda,
				isoPais: req.body.isoPais,
				status: 1,
				planes_idPlan: req.body.planes_idPlan
			}

			planes.insertPrecio(precioData, function (error, data) {


				if (data && data.result) {
					console.log(data);

					res.status(200).json(data);
				} else {
					res.status(500).json({
						"msg": "Algo ocurrio"
					})
				}
			});


		}
		//no existe
		else {
			res.status(404).json({
				"msg": "No existe"
			})
		}
	});
}
//metodo de rutas
exports.listarPrecios = function (req, res, next) {

	var planId = req.params.id;
	planes.getPlanprecio(planId, function (error, data) {
		//si el usuario existe 
		if (typeof data !== 'undefined' && data.length > 0) {
			res.status(200).json(data);
		}
		//no existe
		else {
			res.status(404).json({
				"msg": "No hay resgitro de planes en la base de datos"
			})
		}
	});

}
exports.statusPlan = function (req, res) {
	var dato = [req.body.status, req.body.idplan];
	//status : req.body.codicion
	console.log(dato);

	planes.cambiarEstado(dato, function (error, data) {


		if (data) {
			console.log(data);

			res.status(200).json(data);
		} else {
			res.status(500).json({
				"msg": "Algo ocurrio"
			})
		}
	});


}

exports.nombrePlanActualizar = function (req, res) {
	var dato = [req.body.plan, req.body.info, req.body.idplan];
	//status : req.body.codicion
	console.log(dato);

	planes.cambiarNombre(dato, function (error, data) {


		if (data) {
			console.log(data);

			res.status(200).json(data);
		} else {
			res.status(500).json({
				"msg": "Algo ocurrio"
			})
		}
	});


}

/*	exports.actualizarPlan =  function(req,res)
			{
		var plandatos = [ req.body.idplan, req.body.nombre];
							

	planes.cambiarEstado(plandatos,function(error, data)
					{
			
			
						if(data)
						{
							console.log(data);

							res.status(200).json(data);
						}
						else
						{
							res.status(500).json({"msg":"Algo ocurrio"})
						}
					});
				
				
			}*/