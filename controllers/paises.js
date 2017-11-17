var pais=require('../modelos/paisesModelo.js');
var moneda=require('../modelos/monedasModelo.js');

exports.listaPais = function(req, res, next) {
		
		pais.getPaises(function(error, data)
		{
			//si el usuario existe 
			if (typeof data !== 'undefined' && data.length > 0)
			{
				res.status(200).json(data);
			}
			else
			{
				res.status(404).json({"msg":"No hay resgitro de pais en la base de datos"})
			}
		});

	}

exports.nuevoPais=function(req,res)
	{
		//creamos un objeto con los datos a insertar del cliente
		var paisData = {
			iso : req.body.iso,
		   	nombre : req.body.nombre,
		   	impuesto : req.body.impuesto 
		};
			
		
		pais.insertPais(paisData,function(error, data)
		{
			//si la etiqueta se ha insertado correctamente mostramos su info
			if(data && data.insertId)
			{
				var id = data.insertId;

				var paismoneda = {
					paises_idPais : id,
					monedas_idMoneda : req.body.idMoneda,
					principal : 1
				}
				
				pais.asignarMoneda(paismoneda, function(error, data)
					{
						//si la etiqueta se ha insertado correctamente mostramos su info
						if(data && data.insertId)
						{
							res.status(200).json({'insertId': id});
						}
						else
						{
							res.status(500).json({"msg":"Algo ocurrio"})
						}
					});
			}
			else
			{
				res.status(500).json({"msg":"Algo ocurrio"})
			}
		});
	}

exports.modificarPais =  function(req,res)
{
	var id= req.body.id; // cambiar por valor de sesion o por parametro

	pais.getPais(id,function(error, data)
	{
	//si el usuario existe 
		if (typeof data !== 'undefined' && data.length > 0)
		{
			//creamos un array con los datos a modificar del cliente
			var paisData = [req.body.impuesto,req.body.id];
				
			pais.updatePais(paisData,function(error, data)
			{

				//si el cliente se ha modificado correctamente
				if(data)
				{
					res.status(200).json(data);
				}
				else
				{
					res.status(500).json({"msg":"Algo ocurrio"})
				}
			});
			console.log(paisData);
		}
	//no existe
		else
		{
			res.status(404).json({"msg":"No existe"})
		}
	});
}


exports.asignarMoneda =  function(req,res)
{
	var paismoneda = {
		paises_idPais : req.body.id,
		monedas_idMoneda : req.body.idMoneda
	}

	pais.asignarMoneda(paismoneda, function(error, data)
	{
		//si la etiqueta se ha insertado correctamente mostramos su info
		if(data && data.insertId)
		{
			res.status(200).json(data);
		}
		else
		{
			res.status(500).json({"msg":"Algo ocurrio"})
		}
	});
}

exports.desasignarMoneda =  function(req,res)
{
	var paismoneda = {
		paises_idPais : req.body.id,
		monedas_idMoneda : req.body.idMoneda
	}

	pais.desasignarMoneda(paismoneda, function(error, data)
	{
		//si la etiqueta se ha insertado correctamente mostramos su info
		if(data && data.insertId)
		{
			res.status(200).json(data);
		}
		else
		{
			res.status(500).json({"msg":"Algo ocurrio"})
		}
	});
}



exports.borrarPais =  function(req, res, next) {
	//id del cliente
	var id = req.params.id;
	pais.deletePais(id,function(error, data)
	{
		res.status(200).json(data);
	});

}
