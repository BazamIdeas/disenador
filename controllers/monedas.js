var moneda=require('../modelos/monedasModelo.js');

exports.listaMonedas = function(req, res, next) {

	moneda.getMonedas(function(error, data)
	{
		//si el usuario existe 
		if (typeof data !== 'undefined' && data.length > 0)
		{
			res.status(200).json(data);
		}
	//no existe
		else
		{
			res.status(404).json({"msg":"No hay resgitro de pais en la base de datos"})
		}
	});

}

exports.nuevoMoneda=function(req,res)
{
	//creamos un objeto con los datos a insertar del cliente
	var monedaData = {
		   	moneda : req.body.moneda 
	};
		
	
	moneda.insertMoneda(monedaData,function(error, data)
	{
		//si la etiqueta se ha insertado correctamente mostramos su info
		if(data && data.result)
		{
			res.status(200).json(data);
		}
		else
		{
			res.status(500).json({"msg":"Algo ocurrio"})
		}
	});
}

exports.borrarMoneda =  function(req, res, next) {
	//id del cliente
	var id = req.params.id;
	moneda.deleteMoneda(id,function(error, data)
	{
		res.status(200).json(data);
	});

}
