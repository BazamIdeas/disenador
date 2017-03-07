var DB=require('./DB.js');
 
//creamos un objeto para ir almacenando todo lo que necesitemos
var categoria = {};
 

//obtenemos todos los clientes
categoria.getCategorias = function(callback)
{
	var q = 'SELECT idCategoria,nombreCategoria FROM categorias ORDER BY idCategoria';

	DB.getConnection(function(err, connection)
	{
		connection.query( q ,  function(err, rows){
	  	
	  	if(err)	throw err;
	  	
	  	else callback(null, rows);
	  	
	  });

	  connection.release();
	});

}
categoria.getCategoria = function(id,callback)
{ 
	var q = 'SELECT nombreCategoria, idCategoria FROM categorias WHERE idCategoria = ? ' 
	var par = [id] //parametros

	DB.getConnection(function(err, connection)
	{
		connection.query( q , par , function(err, row){
	  	
	  	if(err)	throw err;
	  	
	  	else callback(null, row);
	  	
	  });

	  connection.release();
	});
}
 

categoria.insertCategoria= function(categoriaData,callback)
{
	var q = 'INSERT INTO categorias SET ? ' 
	var par = categoriaData //parametros

	DB.getConnection(function(err, connection)
	{
		connection.query( q , par , function(err, result){
	  	
	  	if(err)	throw err;

	  	//devolvemos la última id insertada
	  	else callback(null,{"insertId" : result.insertId}); 
	  	
	  });

	  connection.release();
	});
}



categoria.updateCategoria = function(categoriaData, callback)
{
	var q = 'UPDATE categorias SET nombreCategoria = ? WHERE idCategoria = ?';
	var par = categoriaData //parametros

	DB.getConnection(function(err, connection)
	{
		connection.query( q , par , function(err, row){
	  	
	  	if(err)	throw err;

	  	else callback(null,{"msg" : "modificacion exitosa"}); 
	  	
	  });

	  connection.release();
	});
}




categoria.deleteCategoria = function(id, callback)
{
	var q = 'SELECT * FROM categorias WHERE idCategoria = ?';
	var par = [id] //parametros

	DB.getConnection(function(err, connection)
	{
		connection.query( q , par , function(err, row)
		{
	  	 	//si existe la id del cliente a eliminar
		  	if (typeof row !== 'undefined' && row.length > 0)
		  	{
		  		var qq = 'DELETE FROM categorias WHERE idCategoria = ?';
		  		DB.getConnection(function(err, connection)
		  		{
					connection.query( qq , par , function(err, row)
					{
				  	
				  		if(err)	throw err;

					  	//devolvemos el última id insertada
					  	else callback(null,{"msg" : 'eliminado'}); 
				  	
				 	 });

				  	connection.release();
				});

		  	}
		  	else callback(null,{"msg":"no existe esta categoria"});
	  	});

	  connection.release();
	});
}




module.exports = categoria;