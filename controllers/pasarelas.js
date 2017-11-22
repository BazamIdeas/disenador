var pasarelas = require('../modelos/pasarelasModelo.js');
var moneda    = require('../modelos/monedasModelo.js');

exports.Listar = function(req, res, next)
{		
	pasarela.Listar(function(error, data)
	{
		//si el usuario existe 
		if (typeof data !== 'undefined' && data.length > 0){
			res.status(200).json(data);
		}else{
			res.status(404).json({"msg":"No hay resgitro de pasarela en la base de datos"})
		}
	});
}

exports.ListarMonedas = function(req, res, next)
{	
	var id = req.params.id;

	pais.ListarMonedas( id , function(error, data)
	{
		//si el usuario existe 
		if (typeof data !== 'undefined' && data.length > 0){
			res.status(200).json(data);
		}else{
			res.status(404).json({"msg":"No hay resgitro de monedas para este pais en la base de datos"})
		}
	});
}

exports.Nuevo = function(req,res)
{
	//creamos un objeto con los datos a insertar del cliente
	var paisData = {
	   	nombre : req.body.pasarela,
	};
		
	
	pasarela.Nuevo(paisData,function(error, data)
	{
		//si la etiqueta se ha insertado correctamente mostramos su info
		if(data && data.insertId){
			
			var id = data.insertId;

			var paismoneda = {
				pasarelas_idPasarela : id,
				monedas_idMoneda : req.body.idMoneda,
			}
			
			pasarela.AsignarMoneda(paismoneda, function(error, data)
			{
				//si la etiqueta se ha insertado correctamente mostramos su info
				if(data && data.insertId){
					res.status(200).json({'insertId': id});
				}else{
					res.status(500).json({"msg":"Algo ocurrio"})
				}
			});
		}else{
			res.status(500).json({"msg":"Algo ocurrio"})
		}
	});
}

exports.Modificar =  function(req,res)
{
	var id = req.body.id;

	pasarela.Obtener(id ,function(error, data)
	{
		//si el usuario existe 
		if (typeof data !== 'undefined' && data.length > 0){
			//creamos un array con los datos a modificar del cliente
			var pasarelaData = [req.body.pasarela,req.body.id];
				
			pasarela.Modificar(pasarelaData,function(error, data)
			{
				//si el cliente se ha modificado correctamente
				if(data){
					res.status(200).json(data);
				}else{
					res.status(500).json({"msg":"Algo ocurrio"})
				}
			});
			console.log(pasarelaData);
		
		}else{
			res.status(404).json({"msg":"No existe"})
		}
	});
}


exports.AsignarMoneda =  function(req,res)
{
	var paismoneda = {
		paises_idPais : req.body.id,
		monedas_idMoneda : req.body.idMoneda
	}

	pasarela.AsignarMoneda(paismoneda, function(error, data)
	{
		//si la etiqueta se ha insertado correctamente mostramos su info
		if(data && data.insertId){
			res.status(200).json(data);
		}else{
			res.status(500).json({"msg":"Algo ocurrio"})
		}
	});
}

exports.DesasignarMoneda =  function(req,res)
{
	var paismoneda = {
		paises_idPais : req.body.id,
		monedas_idMoneda : req.body.idMoneda
	}

	pasarela.DesasignarMoneda(paismoneda, function(error, data)
	{
		//si la etiqueta se ha insertado correctamente mostramos su info
		if(data && data.insertId){
			res.status(200).json(data);
		}else{
			res.status(500).json({"msg":"Algo ocurrio"})
		}
	});
}

exports.Borrar =  function(req, res, next)
{
	var id = req.params.id;
	pasarela.Borrar(id,function(error, data)
	{
		res.status(200).json(data);
	});
}
