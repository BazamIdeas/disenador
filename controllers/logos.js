var logo      = require("../modelos/logosModelo.js");
var atributo  = require("../modelos/atributosModelo.js");
var elemento  = require("../modelos/elementosModelo.js");
var cliente   = require("../modelos/clientesModelo.js");
var services  = require("../services");
var Email     = require("../services/emailServices.js");
var fs        = require("pn/fs");
var moment    = require("moment");
var base64    = require("base-64");
const svg2png = require("svg2png");
var archiver  = require("archiver");
var pathM     = require("path");
var async     = require("async");

//GUARDAR UN LOGO
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

						res.status(500).json({"msg":"Algo ocurrio"});
					
					}

				});

			} 

			cliente.getCliente(req.idCliente, function(error, dataCliente){

				//console.log(data);
				const emailOptions = {
					to: dataCliente.correo, // receptor o receptores
					subject: "Logo guardado", // Asunto del correo
				}

				let email = new Email(emailOptions,{});
				email.setHtml("logoGuardado.html").send((err,res) => {
					if(err) console.log(err);
					console.log(res);
				});

				res.status(200).json(data);
			});
			
		}
		else
		{
			res.status(500).json({"msg":"Algo ocurrio"});
		}
	});

	
};


exports.Destacar = function(req,res) {

	var par = [req.body.idCliente,req.body.idLogo];

	logo.getLogo(par,function(error, data){
		
		if (typeof data !== "undefined" && data.length > 0){
			
			var parr = [!data[0].destacado, req.body.idLogo];

			logo.Destacar(parr, function(error,data){
				if (typeof data !== "undefined" && data.msg){
					res.status(200).json(data);
				}else{
					res.status(500).json({"msg":"Algo ocurrio"});
				}
			});

		}else{
			res.status(404).json({"msg":"No existe el logo o no le pertenece al cliente"});
		}
	})
}


//CAMBIAR EL ESTADO DE UN LOGO A 'POR APROBAR'
exports.porAprobar = function(req,res) {

	var par = ["Por Aprobar", req.body.idLogo];

	logo.cambiarEstado(par, function(error,data){

		if (typeof data !== "undefined" && data.msg){

			var atributos = [{
					clave : "color-icono",
					valor : req.body.colores.icono,
					logos_idLogo: req.body.idLogo  
				},{
					clave : "color-nombre",
					valor : req.body.colores.nombre,
					logos_idLogo: req.body.idLogo  
				}];

			if(req.body.colores.eslogan){

				atributos.push({
					clave : "color-eslogan",
					valor : req.body.colores.eslogan,
					logos_idLogo: req.body.idLogo  
				});
				
			}



			for(var key in atributos){

				atributo.Guardar(atributos[key], function(error, data) {

					if(!data && !data.insertId)
					{
						res.status(500).json({"msg":"Algo ocurrio"});
					}

				});
			}

			res.status(200).json(data);

		}else{
			
			res.status(500).json({"msg":"Algo ocurrio"});
		
		}
	});
};

//CAMBIAR EL ESTADO DE UN LOGO A 'APROBADO'
exports.aprobar = function(req,res) {
	var par = ["Aprobado", req.body.idLogo];
	logo.cambiarEstado(par, function(error,data){
		if (typeof data !== "undefined" && data.msg){
			res.status(200).json(data);
		}else{
			res.status(500).json({"msg":"Algo ocurrio"});
		}
	});
};

//DEVUELVE LOS DATOS DE UN LOGO
exports.datosLogo =  function(req, res) {
	//id del pedido
	var par = [req.idCliente, req.params.id];

	logo.getLogo(par,function(error, data)
	{
	//si el pedido existe 

		if (typeof data !== "undefined" && data.length > 0)
		{
			var logo = data[0];

			atributo.ObtenerPorLogo(req.params.id, function(error, data){


				//console.log(data)
				if (typeof data !== "undefined" && data.length > 0)
				{
					logo["atributos"] = data;

					res.status(200).json(logo);
				
				}else{

					res.status(200).json(logo);

				}

			});
		}
		//no existe
		else
		{
			res.status(404).json({"msg":"No existe el logo o no le pertenece al cliente"});

		}
	});

};

//DEVULEVE LOGOS DE UN CLIENTE POR SU ESTADO
exports.listaLogosPorEstado = function(req, res) {
	
	var par = [req.body.estado, req.idCliente];

	logo.getLogosTipo(par,function(error, data)
	{
		//si el usuario existe 
		if (typeof data !== "undefined" && data.length > 0)
		{


			async.forEachOf(data, (logo, key, callback) => {


				atributo.ObtenerPorLogo(logo.idLogo, function(err, dataAttrs){

					if (err) return callback(err);

					try {

						if (typeof dataAttrs !== "undefined" && dataAttrs.length > 0)
						{
							data[key]["atributos"] = dataAttrs;
						}

					} catch (e) {
						return callback(e);
					}	

					callback();						
					
				});

			}, (err) => {
				
				if (err) res.status(402).json({});
				
				res.status(200).json(data);
			
			});

		}
		//no existe
		else
		{
			res.status(404).json({"msg":"No hay logos guardados por el cliente "});
		}
	});

};

//DEVUELVE LOGOS POR APROBAR DE TODOS LOS CLIENTES
exports.listaLogosPorAprobar = function(req, res) {

	logo.getLogosPorAprobar(function(error, data)
	{
		//si el usuario existe 
		if (typeof data !== "undefined" && data.length > 0)
		{
			async.forEachOf(data, (logo, key, callback) => {


				atributo.ObtenerPorLogo(logo.idLogo, function(err, dataAttrs){

					if (err) return callback(err);

					try {

						if (typeof dataAttrs !== "undefined" && dataAttrs.length > 0)
						{
							data[key]["atributos"] = dataAttrs;

						}

					} catch (e) {
						return callback(e);
					}	

					callback();						
					
				});

			}, (err) => {
				
				if (err) res.status(402).json({});
				
				res.status(200).json(data);
			
			});
		}
		//no existe
		else
		{
			res.status(404).json({"msg":"No hay logos guardados por el cliente"});
		}
	});

};

//DEVUELVE LOGOS APROBADOS DE TODOS LOS CLIENTES
exports.listaLogosAprobados = function(req, res) {

	var idLogo = req.body.idLogo ? req.body.idLogo : 0; 
	var idCategoria = req.body.idCategoria ? req.body.idCategoria : 0;
	
	logo.getLogosAprobados(idLogo, idCategoria,function(error, data)
	{
		
		if (typeof data !== "undefined" && data.length > 0)
		{
			async.forEachOf(data, (logo, key, callback) => {


				atributo.ObtenerPorLogo(logo.idLogo, function(err, dataAttrs){

					if (err) return callback(err);

					try {

						if (typeof dataAttrs !== "undefined" && dataAttrs.length > 0)
						{
							data[key]["atributos"] = dataAttrs;

						}

					} catch (e) {
						return callback(e);
					}	

					callback();						
					
				});

			}, (err) => {
				
				if (err) res.status(402).json({});
				
				res.status(200).json(data);
			
			});
		}
		//no existe
		else
		{
			res.status(404).json({"msg":"No hay logos aprobados"});
		}
	});

};

//DEVUELVE LOGOS APROBADOS DE TODOS LOS CLIENTES
exports.listaLogosAprobadosPorCliente = function(req, res) {

	var idCliente = req.params.id; 
	
	logo.getLogosAprobadosPorCliente(idCliente,function(error, data)
	{
		
		if (typeof data !== "undefined" && data.length > 0)
		{
			async.forEachOf(data, (logo, key, callback) => {


				atributo.ObtenerPorLogo(logo.idLogo, function(err, dataAttrs){

					if (err) return callback(err);

					try {

						if (typeof dataAttrs !== "undefined" && dataAttrs.length > 0)
						{
							data[key]["atributos"] = dataAttrs;

						}

					} catch (e) {
						return callback(e);
					}	

					callback();						
					
				});

			}, (err) => {
				
				if (err) res.status(402).json({});
				
				res.status(200).json(data);
			
			});
		}
		//no existe
		else
		{
			res.status(404).json({"msg":"No hay logos aprobados"});
		}
	});

};


exports.listaLogosVendidosPorCliente = function(req, res) {

	var idCliente = req.params.id; 
	
	logo.getLogosVendidosPorCliente(idCliente,function(error, data)
	{
		
		if (typeof data !== "undefined" && data.length > 0)
		{
			async.forEachOf(data, (logo, key, callback) => {


				atributo.ObtenerPorLogo(logo.idLogo, function(err, dataAttrs){

					if (err) return callback(err);

					try {

						if (typeof dataAttrs !== "undefined" && dataAttrs.length > 0)
						{
							data[key]["atributos"] = dataAttrs;

						}

					} catch (e) {
						return callback(e);
					}	

					callback();						
					
				});

			}, (err) => {
				
				if (err) res.status(402).json({});
				
				res.status(200).json(data);
			
			});
		}
		//no existe
		else
		{
			res.status(404).json({"msg":"No hay logos aprobados"});
		}
	});

};





//DEVUELVE LOGOS APROBADOS DESTACADOS DE TODOS LOS CLIENTES
exports.listaLogosAprobadosDestacados = function(req, res) {

	logo.getLogosAprobadosDestacados(function(error, data)
	{
		
		if (typeof data !== "undefined" && data.length > 0)
		{
			async.forEachOf(data, (logo, key, callback) => {


				atributo.ObtenerPorLogo(logo.idLogo, function(err, dataAttrs){

					if (err) return callback(err);

					try {

						if (typeof dataAttrs !== "undefined" && dataAttrs.length > 0)
						{
							data[key]["atributos"] = dataAttrs;

						}

					} catch (e) {
						return callback(e);
					}	

					callback();						
					
				});

			}, (err) => {
				
				if (err) res.status(402).json({});
				
				res.status(200).json(data);
			
			});
		}
		//no existe
		else
		{
			res.status(404).json({"msg":"No hay logos destacados"});
		}
	});

};

//DEVUELVE LOS LOGOS GUARDADOS DE UN CLIENTE
exports.listaLogosGuardados = function(req, res) {
	
	var par = ["Editable",req.idCliente];

	logo.getLogosTipo(par,function(error, data)
	{
		//si el usuario existe 
		if (typeof data !== "undefined" && data.length > 0)
		{


			async.forEachOf(data, (logo, key, callback) => {


				atributo.ObtenerPorLogo(logo.idLogo, function(err, dataAttrs){

					if (err) return callback(err);

					try {

						if (typeof dataAttrs !== "undefined" && dataAttrs.length > 0)
						{
							data[key]["atributos"] = dataAttrs;

						}

					} catch (e) {
						return callback(e);
					}	

					callback();						
					
				});

			}, (err) => {
				
				if (err) res.status(402).json({});
				
				res.status(200).json(data);
			
			});

		}
		//no existe
		else
		{
			res.status(404).json({"msg":"No hay logos guardados por el cliente "});
		}
	});

};

//DEVUELVE LOGOS DESCARGABLES OSEA COMPRADOS DE UN CLIENTE
exports.listaLogosDescargables = function(req, res) {
	
	var par = ["Descargable",req.idCliente];

	logo.getLogosTipo(par,function(error, data)
	{
		//si el usuario existe 
		if (typeof data !== "undefined" && data.length > 0)
		{
			async.forEachOf(data, (logo, key, callback) => {


				atributo.ObtenerPorLogo(logo.idLogo, function(err, dataAttrs){

					if (err) return callback(err);

					try {

						if (typeof dataAttrs !== "undefined" && dataAttrs.length > 0)
						{
							data[key]["atributos"] = dataAttrs;

						}

					} catch (e) {
						return callback(e);
					}	

					callback();						
					
				});

			}, (err) => {
				
				if (err) res.status(402).json({});
				
				res.status(200).json(data);
			
			});
		}
		//no existe
		else
		{
			res.status(404).json({"msg":"No hay logos guardados por el cliente"});
		}
	});

};

//MODIFICA UN LOGO
exports.modificarLogo =  function(req,res)
{
	var par = [req.idCliente, req.body.idLogo];
	var objetivos = ["principal","eslogan"];

	logo.getLogo(par,function(error, data)
	{
		//console.log(data)
		
	//si el logo existe 
		if (typeof data !== "undefined" && data.length > 0)
		{
			//creamos un array con los datos a modificar del logo
			var logoData = [req.body.logo, req.body.idLogo];
				
			logo.updateLogo(logoData,function(error, data)
			{
				//si el logo se ha modificado correctamente
				if(data)
				{

					atributo.BorrarPorLogo(req.body.idLogo, objetivos, function() {


						var atributos = req.body.atributos;


						for(var key in atributos){
							
							if(objetivos.indexOf(key) != -1){
								var atributosData = {
									clave : key,
									valor : atributos[key],
									logos_idLogo: req.body.idLogo  
								};

								atributo.Guardar(atributosData, function(error, data) {

									if(!data && !data.insertId)
									{

										res.status(500).json({"msg":"Algo ocurrio"});
									
									}

								});
							}

						}

					});						


					res.status(200).json(data);
				}
				else
				{
					res.status(500).json({"msg":"Algo ocurrio"});
				}
			});
		}
		//no existe
		else
		{
			res.status(404).json({"msg":"No existe"});
		}
	});
};

//DESCARGA UN LOGO COMPRADO
exports.zip = function(req,res)
{	
	const idLogo = req.query.idLogo;
	const ancho = req.query.ancho;
	const tipo = req.query.tipo;
	const descarga = req.query.descarga;
	let fuentes = {};
	const par = [req.idCliente, idLogo];

	//console.log(req)

	logo.getLogo(par, (error, data) => {
		//console.log(data)
		if (typeof data !== "undefined" && data.length > 0) {
			let nombre = "Logo"+"-" +descarga +"-" + moment().format("DD-MM-YYYY")+".svg";

			const path = "public/tmp/";

			atributo.ObtenerPorLogo(data[0].idLogo, (err, dataAttrs) => {
				//console.log(dataAttrs)
				if (typeof dataAttrs !== "undefined" && dataAttrs.length > 0) {

					async.forEachOf(dataAttrs, (row, key, callback) => {

						if (row.clave == "principal" || row.clave == "eslogan") {

							elemento.datosElemento(row.valor, (err, fuente) => {

								if (err) return callback(err);
								
								try {
									
									if (typeof fuente !== "undefined" && fuente.length > 0) {
										fuentes[row.clave] = { nombre:fuente[0].nombre, url:fuente[0].url };
									}
		
								} catch (e) {
									return callback(e);
								}

								callback();	
							});
						}else{
							callback();
						}
					}, (err) => {
						if (err) res.status(402).json({});
						
						var buffer = new Buffer(base64.decode(data[0].logo).replace("/fuentes/",req.protocol + "://" + req.headers.host+"/fuentes/"));
						
						fs.open(path + nombre, "w", (err, fd) => {
							if (err) throw "error al crear svg " + err;

							fs.write(fd, buffer, 0, buffer.length, null, err => {
								if (err) throw "error al escribir " + err;
										
								let svg = path + nombre;

								if (tipo == "editable") {

									var output = fs.createWriteStream(svg.replace("svg", "zip"));
									var archive = archiver("zip", { zlib: { level: 9 } });

									archive.pipe(output);

									archive.append(fs.createReadStream(svg), { name: "logo.svg" });

									archive.append(fs.createReadStream(pathM.dirname(require.main.filename)+fuentes.principal.url), { name: fuentes.principal.nombre+'.ttf' });

									if (fuentes.eslogan) {
										archive.append(fs.createReadStream(pathM.dirname(require.main.filename)+fuentes.eslogan.url), { name: fuentes.eslogan.nombre+'.ttf' });
									}

									output.on('close', () => {
										setTimeout(() => {
											res.download(__dirname+"/../"+svg.replace("svg", "zip"));
										}, 1000)
									})	

									archive.finalize();		        		

								} else {

									var pngout = svg.replace("svg", "png");

									fs.readFile(svg, (err, svgbuffer) => {
										if (err) throw err;
										svg2png(svgbuffer, { width: ancho})
											.then(buffer => {
												fs.writeFile(pngout, buffer, (err) => {
													setTimeout(() => {
														res.download(__dirname+"/../"+pngout);
													}, 1000)
												});
											})
											.catch(e => console.log('error'));
									});

									

								}
								
								fs.close(fd);
							});
						});
					
					});

				}

			});
		} else {
			res.status(404).json({"msg":"No existe el logo o no le pertenece al cliente"});
		}
	});	
};

//DEPRECATED
exports.descargar = (req, res) => 
{
	const idLogo = req.query.idLogo;
	const descargas = req.query.descargas || {
			facebook: 250,
			youtube: 400,
			editable: 400
	};
	let fuentes = {};
	const par = [req.idCliente, idLogo];

	logo.getLogo(par, (error, data) => {
		if (typeof data !== "undefined" && data.length > 0) {
			let nombre = "Logo"+"-todos-los-FORMATOS-" + moment().format("DD-MM-YYYY")+".svg";

			const path = "public/tmp/";

			atributo.ObtenerPorLogo(data[0].idLogo, (err, dataAttrs) => {
				if (typeof dataAttrs !== "undefined" && dataAttrs.length > 0) {

					async.forEachOf(dataAttrs, (row, key, callback) => {

						if (row.clave == "principal" || row.clave == "eslogan") {

							elemento.datosElemento(row.valor, (err, fuente) => {

								if (err) return callback(err);
								
								try {
									
									if (typeof fuente !== "undefined" && fuente.length > 0) {
										fuentes[row.clave] = { nombre:fuente[0].nombre, url:fuente[0].url };
									}
		
								} catch (e) {
									return callback(e);
								}

								callback();	
							});
						}else{
							callback();
						}
					}, (err) => {
						if (err) res.status(402).json({});
						
						var buffer = new Buffer(base64.decode(data[0].logo).replace("/fuentes/",req.protocol + "://" + req.headers.host+"/fuentes/"));
						
						fs.open(path + nombre, "w", (err, fd) => {
							if (err) throw "error al crear svg " + err;

							fs.write(fd, buffer, 0, buffer.length, null, err => {
								if (err) throw "error al escribir " + err;
										
								let svg = path + nombre;

								var output_a = fs.createWriteStream(svg.replace("svg", "zip"));
								var archive_a = archiver("zip", { zlib: { level: 9 } });
								archive_a.pipe(output_a);

								async.forEachOf(descargas, (ancho, key, callback) => {

									if (key == 'editable') {
		
										var output_b = fs.createWriteStream('logo_editable.zip');
										var archive_b = archiver("zip", { zlib: { level: 9 } });
										archive_b.pipe(output_b);

										archive_b.append(fs.createReadStream(svg), { name: "logo.svg" });
		
										archive_b.append(fs.createReadStream(pathM.dirname(require.main.filename)+fuentes.principal.url), { name: fuentes.principal.nombre+'.ttf' });
		
										if (fuentes.eslogan) {
											archive_b.append(fs.createReadStream(pathM.dirname(require.main.filename)+fuentes.eslogan.url), { name: fuentes.eslogan.nombre+'.ttf' });
										}

										output_b.on('close', () => {
											setTimeout(() => {
												archive_a.append(fs.createReadStream(__dirname+"/../logo_editable.zip"), { name: "logo_editable.zip" });
												callback();
											}, 1000)
										})	
		
										archive_b.finalize();
											
									} else {

										fs.readFile(svg, (err, svgbuffer) => {
											if (err) throw err;
											svg2png(svgbuffer, { width: ancho})
												.then(buffer => {
													archive_a.append(buffer, { name: "logo_"+key+".png" });
													callback();
												})
												.catch(e => {
													return callback(e)
												});
										});

									}

								}, (err) => {
								
									output_a.on('close', () => {
										setTimeout(() => {
											res.download(__dirname+"/../"+svg.replace("svg", "zip"));
										}, 1000)
									})	
	
									archive_a.finalize();		        		
									
									fs.close(fd);
								});

							});
						});
					
					});

				}

			});
		} else {
			res.status(404).json({"msg":"No existe el logo o no le pertenece al cliente"});
		}
	});	
};


exports.enviarPorEmail = function(req,res)
{
	const idLogo = req.query.idLogo;
	const ancho = 200;
	let fuentes = {};
	const par = [req.idCliente, idLogo];

	logo.getLogo(par, (error, data) => {
		if (typeof data !== "undefined" && data.length > 0) {
			let nombre = "Logo-" + idLogo + "-" + moment().format("DD-MM-YYYY") + ".svg";

			const path = "public/tmp/";

			atributo.ObtenerPorLogo(data[0].idLogo, (err, dataAttrs) => {
				if (typeof dataAttrs !== "undefined" && dataAttrs.length > 0) {

					async.forEachOf(dataAttrs, (row, key, callback) => {

						if (row.clave == "principal" || row.clave == "eslogan") {

							elemento.datosElemento(row.valor, (err, fuente) => {

								if (err) return callback(err);
								
								try {
									
									if (typeof fuente !== "undefined" && fuente.length > 0) {
										fuentes[row.clave] = { nombre:fuente[0].nombre, url:fuente[0].url };
									}
		
								} catch (e) {
									return callback(e);
								}

								callback();	
							});
						}else{
							callback();
						}
					}, (err) => {
						if (err) res.status(402).json({});
						
						var buffer = new Buffer(base64.decode(data[0].logo).replace("/fuentes/",req.protocol + "://" + req.headers.host+"/fuentes/"));
						
						fs.open(path + nombre, "w", (err, fd) => {
							if (err) throw "error al crear svg " + err;

							fs.write(fd, buffer, 0, buffer.length, null, err => {
								if (err) throw "error al escribir " + err;
										
								let svg = path + nombre;

								var pngout = svg.replace("svg", "png");
								fs.readFile(svg, (err, svgbuffer) => {
									if (err) throw err;
									svg2png(svgbuffer, { width: ancho})
										.then(buffer => {
											fs.writeFile(pngout, buffer);
											services.emailServices.enviar("logoCompartido.html", {}, "Te han compartido un logo", data.correo);
											res.download(__dirname+"/../"+pngout);
										})
										.catch(e => console.log('error'));
								});
								
								fs.close(fd);
							});
						});
					
					});

				}

			});
		} else {
			res.status(404).json({"msg":"No existe el logo o no le pertenece al cliente"});
		}
	});	
};

//BORRA UN LOGO
exports.Borrar = (req, res) =>
{
	var idLogo = req.params.id;
	logo.Borrar(idLogo, (error, data) => {

		if (typeof data !== "undefined" && data.affectedRows) {
			
			res.status(200).json({"affectedRows": data.affectedRows});
		
		} else {

			res.status(500).json({"msg": "Algo ocurrio"});
		
		}
	});
};
