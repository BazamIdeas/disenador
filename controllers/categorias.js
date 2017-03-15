var categoria=require('../modelos/categoriasModelo.js');

exports.listaCategorias = function(req, res, next) {
		
		categoria.getCategorias(function(error, data)
		{
			//si el usuario existe 
			if (typeof data !== 'undefined' && data.length > 0)
			{
				res.status(200).json(data);
			}
		//no existe
			else
			{
				res.status(404).json({"msg":"No hay categorias en la base de datos"});
			}
		});

	}


exports.nuevaCategoria =  function(req,res)
	{
		//creamos un objeto con los datos a insertar del cliente
		var categoriaData = {
			idCategoria : null,
			nombreCategoria: req.body.nombreCategoria,
			
		};
		categoria.insertCategoria(categoriaData,function(error, data)
		{
			//si el cliente se ha insertado correctamente mostramos su info
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



	exports.modificarCategoria =  function(req,res)
	{
		var idCategoria = req.body.idCategoria // cambiar por valor de sesion o por parametro

		categoria.getCategoria(idCategoria,function(error, data)
		{
		//si el usuario existe 
			if (typeof data !== 'undefined' && data.length > 0)
			{
				//creamos un array con los datos a modificar del cliente
				var categoriaData = [req.body.nombreCategoria, idCategoria];
					
				categoria.updateCategoria(categoriaData,function(error, data)
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
			}
		//no existe
			else
			{
				res.status(404).json({"msg":"No existe"})
			}
		});
	}



	exports.borrarCategoria =  function(req, res, next) {
		//id del cliente
		var id = req.params.id;
		categoria.deleteCategoria(id,function(error, data)
		{
			res.status(200).json(data);
		});

	}