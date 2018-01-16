var logo=require('../modelos/logosModelo.js');
var atributo = require('../modelos/atributosModelo.js');
var cliente=require('../modelos/clientesModelo.js');
var services=require('../services');
var fs = require('pn/fs');
var moment = require('moment');
var base64 = require('base-64');
const svg2png = require("svg2png");
var archiver = require("archiver")
var pathM = require("path")
var async    = require("async");


exports.guardar =  function(req,res)
	{
		//creamos un objeto con los datos a insertar del pedido

		var estado = "Editable";

		switch(req.body.estado){
			case "Borrador":
				estado = "Borrador";
				break;
			case "Por Aprobar":
				estado = "Por Aprobar";
				break;
		}

		var logoData = {
			idLogo : null,
			estado : estado,
			logo : req.body.logo,
			tipoLogo: req.body.tipoLogo,
			clientes_idCliente : req.idCliente,
			elementos_idElemento : req.body.idElemento
		};

		logo.insertLogo(logoData,function(error, data)
		{

			//si el pedido se ha insertado correctamente mostramos su info
			if(data && data.insertId)
			{	
                
				var atributos = req.body.atributos;
                
				for(var key in atributos){

					var atributosData = {
						clave : key,
						valor : atributos[key],
						logos_idLogo: data.insertId  
					};

					atributo.Guardar(atributosData, function(error, data) {

						if(!data && !data.insertId)
						{

							res.status(500).json({"msg":"Algo ocurrio"})
						
						}

					})

				} 

				cliente.getCliente(req.idCliente, function(error, dataCliente){

					//console.log(data);
					services.emailServices.enviar('logoGuardado.html', {}, "Logo guardado", dataCliente.correo);
					res.status(200).json(data);
				});
				
			}
			else
			{
				res.status(500).json({"msg":"Algo ocurrio"})
			}
		});

		
	}

	exports.porAprobar = function(req,res,next) {
		var par = ["Por Aprobar", req.body.idLogo];
		logo.cambiarEstado(par, function(error,data){
			if (typeof data !== 'undefined' && data.length > 0){
				res.status(200).json(data);
			}else{
				res.status(500).json({"msg":"Algo ocurrio"})
			}
		})
	}


exports.aprobar = function(req,res,next) {
	var par = ["Aprobado", req.body.idLogo];
	logo.cambiarEstado(par, function(error,data){
		if (typeof data !== 'undefined' && data.length > 0){
			res.status(200).json(data);
		}else{
			res.status(500).json({"msg":"Algo ocurrio"})
		}
	})
}

exports.datosLogo =  function(req, res, next) {
		//id del pedido
		var par = [req.idCliente, req.params.id];

		logo.getLogo(par,function(error, data)
		{
		//si el pedido existe 

			if (typeof data !== 'undefined' && data.length > 0)
			{
				var logo = data[0];

				atributo.ObtenerPorLogo(req.params.id, function(error, data){


					//console.log(data)
					if (typeof data !== 'undefined' && data.length > 0)
					{
						logo['atributos'] = data;

						res.status(200).json(logo);
					
					}else{

						res.status(200).json(logo);

					}

				})
			}
		//no existe
			else
			{
				res.status(404).json({"msg":"No existe el logo o no le pertenece al cliente"})

			}
		});

	}

	exports.listaLogosPorEstado = function(req, res, next) {
		
		var par = [req.params.estado, req.idCliente]

		logo.getLogosTipo(par,function(error, data)
		{
			//si el usuario existe 
			if (typeof data !== 'undefined' && data.length > 0)
			{


				async.forEachOf(data, (logo, key, callback) => {


					atributo.ObtenerPorLogo(logo.idLogo, function(err, dataAttrs){

						if (err) return callback(err);

						try {

							if (typeof dataAttrs !== 'undefined' && dataAttrs.length > 0)
							{
								data[key]['atributos'] = dataAttrs;
							}

						} catch (e) {
						    return callback(e);
						}	

						callback();						
						
					})

				}, (err) => {
					
					if (err) res.status(402).json({});
					
					res.status(200).json(data);
				
				})

			}
		//no existe
			else
			{
				res.status(404).json({"msg":"No hay logos guardados por el cliente "})
			}
		});

	}

exports.listaLogosGuardados = function(req, res, next) {
		
		var par = ["Editable",req.idCliente]

		logo.getLogosTipo(par,function(error, data)
		{
			//si el usuario existe 
			if (typeof data !== 'undefined' && data.length > 0)
			{


				async.forEachOf(data, (logo, key, callback) => {


					atributo.ObtenerPorLogo(logo.idLogo, function(err, dataAttrs){

						if (err) return callback(err);

						try {

							if (typeof dataAttrs !== 'undefined' && dataAttrs.length > 0)
							{
								data[key]['atributos'] = dataAttrs;

							}

						} catch (e) {
						    return callback(e);
						}	

						callback();						
						
					})

				}, (err) => {
					
					if (err) res.status(402).json({});
					
					res.status(200).json(data);
				
				})

			}
		//no existe
			else
			{
				res.status(404).json({"msg":"No hay logos guardados por el cliente "})
			}
		});

	}

exports.listaLogosDescargables = function(req, res, next) {
		
		var par = ["Descargable",req.idCliente]

		logo.getLogosTipo(par,function(error, data)
		{
			//si el usuario existe 
			if (typeof data !== 'undefined' && data.length > 0)
			{
				async.forEachOf(data, (logo, key, callback) => {


					atributo.ObtenerPorLogo(logo.idLogo, function(err, dataAttrs){

						if (err) return callback(err);

						try {

							if (typeof dataAttrs !== 'undefined' && dataAttrs.length > 0)
							{
								data[key]['atributos'] = dataAttrs;

							}

						} catch (e) {
						    return callback(e);
						}	

						callback();						
						
					})

				}, (err) => {
					
					if (err) res.status(402).json({});
					
					res.status(200).json(data);
				
				})
			}
		//no existe
			else
			{
				res.status(404).json({"msg":"No hay logos guardados por el cliente"})
			}
		});

	}

	exports.modificarLogo =  function(req,res)
	{
		var par = [req.idCliente, req.body.idLogo]

		logo.getLogo(par,function(error, data)
		{
            //console.log(data)
            
		//si el logo existe 
			if (typeof data !== 'undefined' && data.length > 0)
			{
				//creamos un array con los datos a modificar del logo
				var logoData = [req.body.logo, req.body.idLogo];
					
				logo.updateLogo(logoData,function(error, data)
				{
					//si el logo se ha modificado correctamente
					if(data)
					{

						atributo.BorrarPorLogo(req.body.idLogo, function(error, data) {


							var atributos = req.body.atributos;


							for(var key in atributos){

								if(key == "principal" || key == "eslogan"){
									var atributosData = {
										clave : key,
										valor : atributos[key],
										logos_idLogo: req.body.idLogo  
									};

									atributo.Guardar(atributosData, function(error, data) {

										if(!data && !data.insertId)
										{

											res.status(500).json({"msg":"Algo ocurrio"})
										
										}

									})
								}

							}

						})						
 

						res.status(200).json(data);
					}
					else
					{
						res.status(500).json({"msg":"Algo ocurrio"})
					}
				});
			}
		//no existe
			else
			{
				res.status(404).json({"msg":"No existe"})
			}
		});
	}


	exports.zip = function(req,res, next)
	{
		var idLogo = req.body.idLogo;
		var ancho = req.body.ancho;
		var tipo = req.body.tipo;
		var descarga = req.body.descarga;

		var par = [req.idCliente, req.body.idLogo]

		logo.getLogo(par,function(error, data)
		{
		//si el logo existe 
			if (typeof data !== 'undefined' && data.length > 0)
			{
				var nombre = 'Logo'+'-' +descarga +'-' + moment().format("DD-MM-YYYY")+'.svg'

				var path = 'public/tmp/'

				buffer = new Buffer(base64.decode(data[0].logo).replace('/fuentes/',req.protocol + "://" + req.headers.host+'/fuentes/'));
				
				fuente = base64.decode(data[0].logo).split("@font-face")[1].split("</style>")[0].split("/fuentes/")[1].split("')")[0]
				//console.log(fuente)
				fs.open(path+nombre, 'w', function(err, fd) {
				    if (err) {
				        throw 'error al crear svg ' + err;
				    }

				    fs.write(fd, buffer, 0, buffer.length, null, function(err) {
				        if (err) throw 'error al escribir ' + err;
				        else{
				        		
			        		var svg = path + nombre

			        		if(tipo == "editable"){

				        		var output = fs.createWriteStream(svg.replace("svg", "zip"));
				        		var archive = archiver('zip', { zlib: { level: 9 } });

				        		archive.pipe(output);

				        		archive.append(fs.createReadStream(svg), { name: 'logo.svg' });
				        		archive.append(fs.createReadStream(pathM.dirname(require.main.filename)+"/fuentes/"+fuente), { name: fuente });

				        		archive.finalize();

								setTimeout(function () {
						    		res.json({zip:svg.replace("svg", "zip")})
						    
								}, 5000); 				        		

				        		

				        	}else{

								var pngout = svg.replace("svg", "png");
								fs.readFile(svg, (err, svgbuffer) => {
									if (err) throw err;
									svg2png(svgbuffer, { width: ancho})
									    .then(buffer => {fs.writeFile(pngout, buffer)
									    	res.json({png:pngout})
									    })
									    .catch(e => console.error(e));
								});

							}
						
							setTimeout(function () {
						    //fs.unlink(salida)
						    
							}, 10000); 
				        }
				        fs.close(fd)
				    });
				});
			}
		//no existe
			else
			{
				res.status(404).json({"msg":"No existe el logo o no le pertenece al cliente"})
			}
		});	
	}




	exports.descargar = function(req, res, next) {
		var idLogo = req.body.idLogo;
		var ancho = req.body.ancho;
		var par = [req.idCliente, req.body.idLogo];

		logo.getLogo(par,function(error, data)
		{
		//si el logo existe 
			if (typeof data !== 'undefined' && data.length > 0)
			{
				var nombre = idLogo +'-' + moment().format("YYYY-MM-DD")+'-'+ancho+'.svg'
				var path = 'public/tmp/'
				buffer = new Buffer(base64.decode(data[0].logo).replace('/fuentes/',req.protocol + "://" + req.headers.host+'/fuentes/'));
				//console.log(base64.decode(data[0].logo));


				fs.open(path+nombre, 'w', function(err, fd) {
				    if (err) {
				        throw 'error al crear svg ' + err;
				    }

				    fs.write(fd, buffer, 0, buffer.length, null, function(err) {
				        if (err) throw 'error al escribir ' + err;
				        else{
				        	var img =  path + nombre
							var salida =  path + nombre.replace("svg", "png");
							fs.readFile(img, (err, svg) => {
								if (err) throw err;
								//console.log()
								svg2png(svg, { width: ancho})
								    .then(buffer => {fs.writeFile(salida, buffer)
								    	res.json({svg:salida.replace('png','svg'),png:salida})
								    })
								    .catch(e => console.error(e));
							});
							
							setTimeout(function () {
						    //fs.unlink(salida)
						    
							}, 10000); 
				        }
				        fs.close(fd)
				    });
				});
			}
		//no existe
			else
			{
				res.status(404).json({"msg":"No existe"})
			}
		});
	}


exports.Borrar = (req, res, next) =>
{
	var idLogo = req.params.id;
	logo.Borrar(idLogo, (error, data) => {

		if (typeof data !== 'undefined' && data.affectedRows) {
			
			res.status(200).json({'affectedRows': data.affectedRows});
		
		} else {

			res.status(500).json({"msg": "Algo ocurrio"})
		
		}
	})
}
