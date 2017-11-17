var pais   = require('../modelos/paisesModelo.js');
var moneda = require('../modelos/monedasModelo.js');

exports.Listar = function(req, res, next)
{
	pais.Listar(function(error, data)
	{
		//si el usuario existe 
		if (typeof data !== 'undefined' && data.length > 0){
			res.status(200).json(data);
		}else{
			res.status(404).json({"msg":"No hay resgitro de pais en la base de datos"})
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
		iso : req.body.iso,
	   	nombre : req.body.nombre,
	   	impuesto : req.body.impuesto 
	};
		
	
	pais.Nuevo(paisData,function(error, data)
	{
		//si la etiqueta se ha insertado correctamente mostramos su info
		if(data && data.insertId){
			
			var id = data.insertId;

			var paismoneda = {
				paises_idPais : id,
				monedas_idMoneda : req.body.idMoneda,
				principal : 1
			}
			
			pais.AsignarMoneda(paismoneda, function(error, data)
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
	var id = req.body.id; // cambiar por valor de sesion o por parametro

	pais.Obtener(id,function(error, data)
	{
		//si el usuario existe 
		if (typeof data !== 'undefined' && data.length > 0){
			//creamos un array con los datos a modificar del cliente
			var paisData = [req.body.impuesto,req.body.id];
				
			pais.Modificar(paisData,function(error, data)
			{
				//si el cliente se ha modificado correctamente
				if(data){
					res.status(200).json(data);
				}else{
					res.status(500).json({"msg":"Algo ocurrio"})
				}
			});
			console.log(paisData);
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

	pais.AsignarMoneda(paismoneda, function(error, data)
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

	pais.DesasignarMoneda(paismoneda, function(error, data)
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
	//id del cliente
	var id = req.params.id;
	pais.Borrar(id,function(error, data)
	{
		res.status(200).json(data);
	});

}
