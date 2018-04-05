
var jwt = require('jwt-simple');
var moment = require('moment');
var configuracion = require('../configuracion.js');
var services=require('../services');

exports.validarCliente = function(req,res,next){

	if(configuracion.seguridad){
		
		if(!req.headers.auth){
			return res.status(403).json({"mensaje":"No autorizado"})
		}

		const token = req.headers.auth

		try {
	      	const datos = jwt.decode(token, configuracion.secret)

		    if (datos.final <= moment().unix()){
				return res.status(401).json({"mensaje":"El acceso ha expirado"})
			}

			if (datos.tipo == "cliente"){
				req.idCliente = datos.id
			}

			if (datos.tipo == "admin"){
				req.idUsuario = datos.id
			}
			//console.log(datos)
			next()
	    } catch (e) {
	      res.status(400).json({"Mensaje":"Token invalido"});
	    }
	}

	else{
		req.idUsuario = 1
		req.idCliente = 1
		next()
	}
}

exports.validarAdministrador = function(req,res,next){

	if(configuracion.seguridad){
		
		if(!req.headers.auth){
			return res.status(403).json({"mensaje":"No autorizado"})
		}

		const token = req.headers.auth

		try {
	      	const datos = jwt.decode(token, configuracion.secret)

		    if (datos.final <= moment().unix()){
				return res.status(401).json({"mensaje":"El acceso ha expirado"})
			}

			if (datos.tipo == "cliente"){
				return res.status(403).json({"mensaje":"No autorizado"})
			}

			if (datos.tipo == "admin"){
				req.idUsuario = datos.id
			}
			//console.log(datos)
			next() 
	    } catch (e) {
	      res.status(400).json({"Mensaje":"Token invalido"});
	    }
	}

	else{
		req.idUsuario = 1
		req.idCliente = 1
		next()
	}
}

exports.decodificar = function(req,res,next){
    try {
		return res.json(jwt.decode(req.headers.auth, configuracion.secret))
	}

	catch (e) {
	      res.status(400).json({"Mensaje":"Token invalido",
	  							"token":req.headers});
	}
}

exports.pruebas = function(req,res,next){
    try {
    	var datosPago = {
			precio: req.body.precio,
			moneda: req.body.moneda,
			descripcion: "Diseño de Logo- " + req.body.plan,
			impuesto: req.body.impuesto,
			stripeToken: req.body.stripeToken,
			idPedido: req.body.idPedido
		};

		services.pagoServices.stripe(datosPago, function (error, data) {
			res.json(data);
			//console.log(data)
			});
	}

	catch (e) {
	      res.status(400).json({"Mensaje":"Prueba fallida",
	  							"error":e});
	}
}
