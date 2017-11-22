var pais     = require('../modelos/paisesModelo.js');
var plan     = require('../modelos/planesModelo.js');
var precio   = require('../modelos/preciosModelo.js');
var services = require('../services');
var async    = require("async");

exports.ListarFront = (req, res, next) =>
{
	var iso  = services.geoipServices.iso(req.ip);

	pais.ObtenerPorIso(iso, (err, pais) => {
		
		if (pais.length) {

			var json = pais[0];

			json.monedaDefault = {idMoneda: json.idMoneda ,codigo : json.moneda}

			delete json["idMoneda"]; 
			delete json["moneda"]; 
		
			plan.ListarPorPais(json.idPais, (err, planes) => {

				if (planes.length) {

					json.planes = planes;

					var precios_json = {};
					async.forEachOf(json.planes, (plan, key, callback) => {

						precio.ListarPorPlan(json.idPais, plan.idPlan, (err, precios) => {
							
							if (err) return callback(err);

							try {

								if (precios.length) {

									json.planes[key].precios = precios;
								
								}
							
							} catch (e) {
							    return callback(e);
							}
							callback();
						})

					}, (err) => {
						
						if (err) console.error(err.message);
						
						res.status(200).json(json);
					
					})
				
				}else{

					res.status(200).json({"msg": "No se encuentran planes para el pais"});

				}
			
			})
		
		}else{

			res.status(200).json({"msg": "No se encuentra el pais"});

		}
	
	});

}

exports.ListarBack = (req, res, next) =>
{
	plan.Listar( (error, data) => {
		//si el usuario existe 
		if (typeof data !== 'undefined' && data.length > 0) {
			res.status(200).json(data);
		}
		//no existe
		else {
			res.status(404).json({
				"msg": "No hay registro de planes en la base de datos"
			})
		}
	});
}

exports.ListarPrecios = (req, res, next) =>
{
	var id = req.params.id;

	plan.ListarPrecios(id , (error, data) => {

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

exports.Nuevo = (req, res) =>
{
	//creamos un objeto con los datos a insertar del cliente
	var planData = {
		idPlan : null,
		plan   : req.body.plan,
		status : 1,
		info   :req.body.info
	}

	plan.Nuevo(planData, (error, data) => {
		//si la etiqueta se ha insertado correctamente mostramos su info
		if (data && data.insertId) {

			var precioData = {
				idPrecio         : null,
				precio           : req.body.precio,
				monedas_idMoneda : req.body.idMoneda,
				planes_idPlan    : data.insertId
			};

			precio.Nuevo(precioData, (error, data) => {

				if (data && data.result) {

					res.status(200).json(data);

				} else {
					res.status(500).json({"msg": precioData.planes_idPlan})
				}
			});

		} else {
			res.status(500).json({"msg": error})
		}
	});
}

exports.Bloquear = (req, res, next) =>
{
	plan.Bloquear(req.body.idPlan, (error, data) => {
		//si el usuario existe 
		if (typeof data !== 'undefined' && data.affectedRows) {
			res.status(200).json(data);
		}
		else {
			res.status(404).json({"msg": "No hay resgitro de planes en la base de datos"})
		}
	});
}

exports.Modificar = (req, res) =>
{
	var planData = [req.body.plan, req.body.info, req.body.idPlan];

	plan.Modificar(planData, (error, data) => {

		if (typeof data !== 'undefined' && data.affectedRows) {
			res.status(200).json(data);
		} else {
			res.status(500).json({"msg": "Algo ocurrio"})
		}
	});
}