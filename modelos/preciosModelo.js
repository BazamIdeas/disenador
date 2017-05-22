var DB=require('./DB.js');
 
//creamos un objeto para ir almacenando todo lo que necesitemos
var precio = {};
 

//obtenemos todos las precios
precio.getprecios = function(callback)
{
	var q = 'SELECT idprecio, nombreprecio FROM precios ORDER BY idprecio';

	DB.getConnection(function(err, connection)
	{
		connection.query( q ,  function(err, rows){
	  	
	  	if(err)	throw err;
	  	
	  	else callback(null, rows);
	  	
	  });

	  connection.release();
	});

}
precio.getPrecio = function(id,callback)
{ 
	var q = 'SELECT precio, moneda, plan, idPlan FROM precios, planes WHERE planes_idPlan = idPlan AND idPrecio= ? ' 
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
 

precio.insertprecio = function(precioData,callback)
{
	var q = 'INSERT INTO precios SET ? ' 
	var par = precioData //parametros

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



precio.updateprecio = function(precioData, callback)
{
	var q = 'UPDATE precios SET nombreprecio = ? WHERE idprecio = ?';
	var par = precioData //parametros

	DB.getConnection(function(err, connection)
	{
		connection.query( q , par , function(err, row){
	  	
	  	if(err)	throw err;

	  	else callback(null,{"msg" : "modificacion exitosa"}); 
	  	
	  });

	  connection.release();
	});
}




precio.deleteprecio = function(id, callback)
{
	var q = 'SELECT * FROM precios WHERE idprecio = ?';
	var par = [id] //parametros

	DB.getConnection(function(err, connection)
	{
		connection.query( q , par , function(err, row)
		{
	  	 	//si existe la id del cliente a eliminar
		  	if (typeof row !== 'undefined' && row.length > 0)
		  	{
		  		var qq = 'DELETE FROM precios WHERE idprecio = ?';
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
		  	else callback(null,{"msg":"no existe esta precio"});
	  	});

	  connection.release();
	});
}




module.exports = precio;