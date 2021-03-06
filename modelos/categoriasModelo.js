var DB=require("./db.js");
 
//creamos un objeto para ir almacenando todo lo que necesitemos
var categoria = {};
 

//obtenemos todos los clientes
categoria.getCategorias = function(tipo,callback)
{
	var q = "SELECT idCategoria,nombreCategoria FROM categorias WHERE NOT(nombreCategoria = ?) AND tipo = ? AND padre IS NULL ORDER BY nombreCategoria";

	DB.getConnection(function(err, connection)
	{
		if (err) return connection.send(400);
		
		connection.query( q , tipo, function(err, rows){
			
			if(err)	throw err;
			
			else callback(null, rows);
				
			connection.release();
		});	
	});
};

categoria.getCategoriasHijas = function (conPadre, callback) {
	
	if (conPadre) {
		
		var q = "SELECT idCategoria , nombreCategoria, padre FROM categorias WHERE NOT(nombreCategoria = 'Sin Categoria') AND padre = ? AND tipo = 'ICONO'  ORDER BY nombreCategoria";

	} else {
		var q = "SELECT idCategoria , nombreCategoria, padre FROM categorias WHERE NOT(nombreCategoria = 'Sin Categoria') AND padre IS NOT NULL AND tipo = 'ICONO'  ORDER BY nombreCategoria";
	}

	DB.getConnection(function (err, connection) {
		
		connection.query(q, [conPadre], function (err, rows) {

			if (err) throw err;

			else callback(null, rows);

			connection.release();
		});
	});
};

categoria.ListarIconos = function(idCategoria,callback)
{
	var q = "SELECT * FROM elementos WHERE categorias_idCategoria = ? AND tipo = \"ICONO\" ORDER BY idElemento";

	DB.getConnection(function(err, connection)
	{
		if (err) return connection.send(400);

		connection.query( q ,  function(err, rows){
			
			if(err)	throw err;
				
			else callback(null, rows);
				
			connection.release();
		});	 	
	});
};

categoria.ListarFuentes = function(idCategoria,callback)
{
	var q = "SELECT * FROM elementos WHERE categorias_idCategoria = ? AND tipo = \"FUENTE\" ORDER BY idElemento";

	DB.getConnection(function(err, connection)
	{
		if (err) return connection.send(400);

		connection.query( q ,  function(err, rows){
		
			if(err)	throw err;
		
			else callback(null, rows);
			
			connection.release();
		});	 	
	});	
};

categoria.getCategoria = function(id,callback)
{ 
	var q = "SELECT nombreCategoria, idCategoria FROM categorias WHERE idCategoria = ? "; 
	var par = [id]; //parametros

	DB.getConnection(function(err, connection)
	{
		if (err) return connection.send(400);

		connection.query( q , par , function(err, row){
		
			if(err)	throw err;
		
			else callback(null, row);
		
			connection.release();
		}); 	
	});
};
 

categoria.insertCategoria= function(categoriaData,callback)
{
	var q = "INSERT INTO categorias SET ? "; 
	var par = categoriaData; //parametros

	DB.getConnection(function(err, connection)
	{
		if (err) return connection.send(400);

		connection.query( q , par , function(err, result){
		
			if(err)	throw err;

			//devolvemos la última id insertada
			else callback(null,{"insertId" : result.insertId}); 
		
			connection.release();
		});	
	});
};



categoria.updateCategoria = function(categoriaData, callback)
{
	var q = "UPDATE categorias SET nombreCategoria = ? WHERE idCategoria = ?";
	var par = categoriaData; //parametros

	DB.getConnection(function(err, connection)
	{
		if (err) return connection.send(400);

		connection.query( q , par , function(err){
		
			if(err)	throw err;

			else callback(null,{"msg" : "modificacion exitosa"}); 
		
			connection.release();
		});
	});
};




categoria.deleteCategoria = function(id, callback)
{
	var q = "SELECT * FROM categorias WHERE idCategoria = ?";
	var par = [id]; //parametros

	DB.getConnection(function(err, connection)
	{
		if (err) return connection.send(400);
		
		connection.query( q , par , function(err, row)
		{
			//si existe la id del cliente a eliminar
			if (typeof row !== "undefined" && row.length > 0)
			{
				var qq = "DELETE FROM categorias WHERE idCategoria = ?";
				DB.getConnection(function(err, connection)
				{
					connection.query( qq , par , function(err)
					{

						if(err)	throw err;

						//devolvemos el última id insertada
						else callback(null,{"msg" : "eliminado"}); 

						connection.release();
					});			 	
				});

			}
			else callback(null,{"msg":"no existe esta categoria"});
			
			connection.release();
		});
	});
};




module.exports = categoria;