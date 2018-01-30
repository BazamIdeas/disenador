var caracteristica = require("../modelos/caracteristicasModelo.js");
var async = require("async");


exports.Nuevo = function(req, res)
{
	var caracteristicasData = {
		clave : req.body.clave,
		valor : req.body.valor,
		descripcion : req.body.descripcion,
		planes_idPlan : req.body.idPlan  
	};

	caracteristica.Guardar(caracteristicasData, function(error, data) {
		if(!data && !data.insertId){
			res.status(500).json({"msg":"Algo ocurrio"});
		}else{
			res.status(200).json(data);
		}
	});
};

exports.Nuevos = function(req, res)
{
	var caracteristicas = req.body.caracteristicas;

	var inserts_ids = [];

	async.forEachOf(caracteristicas, (carac, key, callback) => {

		var caracteristicasData = {
			clave : carac.clave,
			valor : carac.valor,
			descripcion : carac.descripcion,
			planes_idPlan : carac.idPlan  
		};

		caracteristica.Guardar(caracteristicasData, function(error, data) {
			if(data && data.insertId){
				inserts_ids.push(data.insertId);
			}
            
			callback();
		});

	}, function() {
		res.status(200).json({inserts_ids : inserts_ids});
	});
};