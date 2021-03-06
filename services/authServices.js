'use strict';
var jwt = require('jwt-simple');
var moment = require('moment');
var configuracion = require('../configuracion/configuracion.js');

exports.crearToken = function(id,tipo, disenador) {
	const datos	= {
		id : id,
		ini: moment().unix(),
		final: moment().add(7, "days").unix(),
		tipo : tipo,
		disenador: disenador
	}
	return jwt.encode(datos, configuracion.secret)
}

exports.decodificar = function(token) {
	return jwt.decode(token, configuracion.secret)
}
