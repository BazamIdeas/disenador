var facturacion = require("../modelos/facturacionesModelo.js");

exports.Nuevo = function(req, res)
{
	var datosFacturacion = {
		medio: req.body.medio,
		correo: req.body.correo,
		clientes_idCliente: req.idCliente 
	};

	facturacion.Nuevo(datosFacturacion, function(error,data){
		if(typeof data !== "undefined" && data.insertId){
			res.status(200).json(data);
		}else{
			res.status(500).json({msg:"Algo ocurrio"});
		}
	});
};

exports.Actualizar = function(req, res)
{
	var datosFacturacion = {
		medio: req.body.medio,
		correo: req.body.correo,
	};

	facturacion.Actualizar(req.params.idFacturacion, datosFacturacion, function(error,data){
		if(typeof data !== "undefined" && data.affectedRows){
			res.status(200).json(data);
		}else{
			res.status(500).json({msg:"Algo ocurrio"});
		}
	});
};

exports.Eliminar = function(req, res)
{
	facturacion.Eliminar(req.params.idFacturacion, function(error,data){
		if(typeof data !== "undefined" && data.affectedRows){
			res.status(200).json(data);
		}else{
			res.status(500).json({msg:"Algo ocurrio"});
		}
	});
};