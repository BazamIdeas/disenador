var cliente  = require("../modelos/clientesModelo.js");
var usuario  = require("../modelos/usuarioModelo.js");
var services = require("../services");
var Email = require("../services/emailServices.js");
var moment   = require("moment");
var passwordHash = require('password-hash');

exports.enviarToken =  function(req,res)
{

	if(req.body.tipo == "cliente"){

		cliente.getClienteEmail(req.body.correo, (error, data) => {
			//si el usuario existe 
			if (typeof data !== "undefined" && data.length > 0)
			{	
				var token = services.authServices.crearToken(data[0].idCliente, req.body.tipo);
				
				const emailOptions = {
					to: req.body.correo, // receptor o receptores
					subject: 'LOGOPRO - Cambiar contraseña', // Asunto del correo
				}

				let email = new Email(emailOptions, { token: token, nombre: data[0].nombreCliente });
				email.setHtml(req.body.tipo+"CambiarContrasena.html")
					.send((err,data) => {
						if(err) res.status(500).json({msg:err});
						res.status(200).json(data);
					});

			}else{
				res.status(404).json(data);
			}
		});

	}else{

		usuario.getUsuarioEmail(req.body.correo, (error, data) => {
			//si el usuario existe 
			if (typeof data !== "undefined" && data.length > 0)
			{	
				var token = services.authServices.crearToken(data[0].idUsuario, req.body.tipo);

				const emailOptions = {
					to: req.body.correo, // receptor o receptores
					subject: 'LOGOPRO - Cambiar contraseña', // Asunto del correo
				}

				let email = new Email(emailOptions,{"token": token});
				email.setHtml(req.body.tipo+"CambiarContrasena.html")
					.send((err,data) => {
						if(err) res.status(500).json({msg:err});
						res.status(200).json(data);
					});
		
			}else{
				res.status(404).json(data);
			}
		});

	}

		
};

exports.confirmarToken = function(req,res)
{
	var token = services.authServices.decodificar(req.params.tk);

	if (token.final <= moment().unix()){
		return res.status(401).json({"mensaje":"El token ha expirado"});
	}

	return res.status(200).json(true);
};

exports.cambiar = function(req,res)
{

	var token = services.authServices.decodificar(req.body.token);

	var datos = [
		passwordHash.generate(req.body.pass),
		token.id
	];

	if (token.tipo == "cliente") {

		cliente.getCliente(token.id,function(error, data)
		{
			//console.log(data)
			//si el usuario existe 
			if (typeof data !== "undefined" && data.length > 0){

				cliente.changePassword(datos,function(error, datau)
				{
					//si el cliente se ha modificado correctamente
					if(datau){

						res.status(200).json(datau);
					}else{

						res.status(500).json({"msg":"Algo ocurrio"});
					}
				});
			
			}else{

				res.status(500).json({"msg":"No existe"});
			}
		});
	
	}else if(token.tipo == "admin"){

		usuario.getUsuario(token.id,function(error, data)
		{
			//si el usuario existe 
			if (typeof data !== "undefined" && data.length > 0){

				usuario.changePassword(datos,function(error, data)
				{
					//si el cliente se ha modificado correctamente
					if(data){

						res.status(200).json(data);
					}else{

						res.status(500).json({"msg":"Algo ocurrio"});
					}
				});
			
			}else{

				res.status(500).json({"msg":"No existe"});
			}
		});

	}
};
