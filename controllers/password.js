var cliente  = require('../modelos/clientesModelo.js');
var usuario  = require('../modelos/usuarioModelo.js');
var services = require('../services');
var moment   = require('moment');

exports.enviarToken =  function(req,res,next)
{

	if(req.body.tipo == 'cliente'){

		cliente.getClienteEmail(req.body.correo, (error, data) => {
			//si el usuario existe 
			if (typeof data !== 'undefined' && data.length > 0)
			{	
				var token = services.authServices.crearToken(data[0].idCliente, req.body.tipo);

				var datos = {'token': token, 'correo': req.body.correo};
				
				services.emailServices.enviar(req.body.tipo+'CambiarContrasena.html', datos, "Cambiar contraseña", data[0].correo).then( data => {
				
					res.status(200).json({"msg":"Enviado"});
				
				}).catch(e => {
				
					res.status(500).json({"msg":"Algo ocurrio"})
				
				});

			}else{
				res.status(404).json(data);
			}
		});

	}else{

		usuario.getUsuarioEmail(req.body.correo, (error, data) => {
			//si el usuario existe 
			if (typeof data !== 'undefined' && data.length > 0)
			{	
				var token = services.authServices.crearToken(data[0].idUsuario, req.body.tipo);

				var datos = {'token': token, 'correo': req.body.correo};
				var enviado = services.emailServices.enviar(req.body.tipo+'CambiarContrasena.html', datos, "Cambiar contraseña", data[0].correo).then( data => {
				
					res.status(200).json({"msg":"Enviado"});
				
				}).catch(e => {
				
					res.status(500).json({"msg":"Algo ocurrio"})
				
				});
		
			}else{
				res.status(404).json(data);
			}
		});

	}

		
}

exports.confirmarToken = function(req,res,next)
{
    var token = services.authServices.decodificar(req.params.tk);

    if (token.final <= moment().unix()){
		return res.status(401).json({"mensaje":"El token ha expirado"});
	}

	return res.status(200).json(true);
}

exports.cambiar = function(req,res,next)
{

	var token = services.authServices.decodificar(req.body.token)

	var datos = [
		req.body.pass,
	 	token.id
	]

	if (token.tipo == "cliente") {

		cliente.getCliente(token.id,function(error, data)
		{
			console.log(data)
			//si el usuario existe 
			if (typeof data !== 'undefined' && data.length > 0){

				cliente.changePassword(datos,function(error, datau)
				{
					//si el cliente se ha modificado correctamente
					if(datau){

						res.status(200).json(datau);
					}else{

						res.status(500).json({"msg":"Algo ocurrio"})
					}
				});
			
			}else{

				res.status(500).json({"msg":"No existe"})
			}
		});
	
	}else if(token.tipo == "admin"){

		usuario.getUsuario(token.id,function(error, data)
		{
			//si el usuario existe 
			if (typeof data !== 'undefined' && data.length > 0){

				usuario.changePassword(datos,function(error, data)
				{
					//si el cliente se ha modificado correctamente
					if(data){

						res.status(200).json(data);
					}else{

						res.status(500).json({"msg":"Algo ocurrio"})
					}
				});
			
			}else{

				res.status(500).json({"msg":"No existe"})
			}
		});

	}
}
