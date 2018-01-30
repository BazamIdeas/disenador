var precio = require("../modelos/preciosModelo.js");

exports.Nuevo = (req, res) =>
{
	var precioData = {
		idPrecio         : null,
		precio           : req.body.precio,
		monedas_idMoneda : req.body.idMoneda,
		planes_idPlan    : req.body.idPlan
	};

	precio.Nuevo(precioData, (error, data) => {
		
		if (data && data.result) {

			res.status(200).json({"insertId": data.result});
		
		} else {

			res.status(500).json({"msg": "Algo ocurrio"});
		
		}
	});
};

exports.Modificar = (req, res) =>
{
	var precioData = {
		idPrecio         : null,
		precio           : req.body.precio,
		monedas_idMoneda : req.body.idMoneda,
		planes_idPlan    : req.body.idPlan
	};

	precio.Bloquear(req.body.idPrecio, (error, bloqueo) => {

		if (typeof bloqueo !== "undefined" && bloqueo.affectedRows) {

			precio.Nuevo(precioData, (error, data) => {
				
				if (data && data.result) {

					res.status(200).json({"insertId": data.result});
				
				} else {

					res.status(500).json({"msg": "Algo ocurrio 1"});
				
				}
			
			});

		} else {
		
			res.status(500).json({"msg": "Algo ocurrio 2"});
		
		}

	});
};