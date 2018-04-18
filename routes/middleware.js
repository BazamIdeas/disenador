var jwt = require('jwt-simple');
var moment = require('moment');
var configuracion = require('../configuracion/configuracion.js');
var services=require('../services');
var fs = require('fs');

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
		req.idUsuario = 1;
		req.idCliente = 1;
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
			descripcion: "DiseÃ±o de Logo- " + req.body.plan,
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


exports.userAgent = function(req,res,next) {

	let data = {idLogo: req.query.idLogo, url: configuracion.url} 

	if(req.headers['user-agent'] === 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)' || 
		req.headers['user-agent'] === 'Facebot') {

		if (req.query.idLogo) {

			let template = fs.readFileSync('./public/share_facebook.html' ,'utf8', (err) => {
				if (err) throw err;
			});
      
      		var keys = Object.keys(data);

			for(var key in keys){
				while(template.indexOf("${"+keys[key]+"}") != -1){
						template = template.replace("${"+keys[key]+"}", data[keys[key]]);
				}
			}

			res.status(200).type('html').send(template)

		} else { 
			
			next()

		}

	} else if (req.headers['user-agent'] === 'Twitterbot' || req.headers['user-agent'] === 'Twitterbot/1.0') {

		if(req.query.idLogo){

			let template = fs.readFileSync('./public/share_twitter.html' ,'utf8', (err) => {
				if (err) throw err;
			});

      		var keys = Object.keys(data);

			for(var key in keys){
				while(template.indexOf("${"+keys[key]+"}") != -1){
						template = template.replace("${"+keys[key]+"}", data[keys[key]]);
				}
			}

			res.status(200).type('html').send(template)

		} else { 
			
			next()

		}

	} else if (req.headers['user-agent'] === 'LinkedInBot/1.0 (compatible; Mozilla/5.0; Jakarta Commons-HttpClient/3.1 +http://www.linkedin.com)' ) { 

		if(req.query.idLogo){

			let template = fs.readFileSync('./public/share_linkedin.html' ,'utf8', (err) => {
				if (err) throw err;
			});

      		var keys = Object.keys(data);

			for(var key in keys){
				while(template.indexOf("${"+keys[key]+"}") != -1){
						template = template.replace("${"+keys[key]+"}", data[keys[key]]);
				}
			}

			res.status(200).type('html').send(template)

		} else { 
			
			next()

		}

	} else if (req.headers['user-agent'] === 'Pinterest/0.2 (+https://www.pinterest.com/bot.html)' || req.headers['user-agent'] === 'Pinterest' || req.headers['user-agent'] === 'Mozilla/5.0 (compatible; Pinterestbot/1.0; +https://www.pinterest.com/bot.html)' || req.headers['user-agent'] === 'Mozilla/5.0 (compatible; Pinterestbot/1.0; +http://www.pinterest.com/bot.html)') { 

		if(req.query.idLogo){

			let template = fs.readFileSync('./public/share_pinterest.html' ,'utf8', (err) => {
				if (err) throw err;
			});

      		var keys = Object.keys(data);

			for(var key in keys){
				while(template.indexOf("${"+keys[key]+"}") != -1){
						template = template.replace("${"+keys[key]+"}", data[keys[key]]);
				}
			}

			res.status(200).type('html').send(template)

		} else { 
			
			next()

		}

	} else if (req.headers['user-agent'] === 'Google (+https://developers.google.com/+/web/snippet/)' || req.headers['user-agent'] === 'Googlebot' || req.headers['user-agent'] === 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)' || req.headers['user-agent'] === 'Googlebot/2.1 (+http://www.google.com/bot.html)' || req.headers['user-agent'] === 'Mozilla/5.0 (compatible; Google-Structured-Data-Testing-Tool +https://search.google.com/structured-data/testing-tool)' || req.headers['user-agent'] === 'Googlebot/2.1 (+http://www.googlebot.com/bot.html)' || req.headers['user-agent'].indexOf("Google (+https://developers.google.com/+/web/snippet/)") != -1) { 

		if(req.query.idLogo){

			let template = fs.readFileSync('./public/share_google.html' ,'utf8', (err) => {
				if (err) throw err;
			});

      		var keys = Object.keys(data);

			for(var key in keys){
				while(template.indexOf("${"+keys[key]+"}") != -1){
						template = template.replace("${"+keys[key]+"}", data[keys[key]]);
				}
			}

			res.status(200).type('html').send(template)

		} else { 
			
			next()

		}

	} else {

		next()

	}
}