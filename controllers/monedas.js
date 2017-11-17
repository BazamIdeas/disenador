var moneda = require('../modelos/monedasModelo.js');

exports.Listar = function(req, res, next)
{
	moneda.Listar(function(error, data)
	{
		//si el usuario existe 
		if (typeof data !== 'undefined' && data.length > 0){
			res.status(200).json(data);
		}else{
			res.status(404).json({"msg":"No hay resgitro de pais en la base de datos"})
		}
	});
}

exports.Nuevo=function(req,res)
{
	//creamos un objeto con los datos a insertar del cliente
	var monedaData = {
		   	moneda : req.body.moneda 
	};
		
	
	moneda.Nuevo(monedaData,function(error, data)
	{
		//si la etiqueta se ha insertado correctamente mostramos su info
		if(data && data.result){
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
	
	moneda.Borrar(id,function(error, data)
	{
		res.status(200).json(data);
	});
}
