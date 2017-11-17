var DB = require('./db.js');

var moneda = {};

moneda.Listar = function(callback)
{
	var q = 'SELECT * FROM monedas ORDER BY moneda';

	DB.getConnection(function(err, connection)
	{
		connection.query( q ,  function(err, rows){
	  	
	  	if(err)	throw err;
	  	
	  	else callback(null, rows);
	  	
	  });

	  connection.release();
	});
}

moneda.Nuevo = function(monedaData,callback)
{
	var q = 'SELECT count(*) as cantidad FROM monedas WHERE moneda = ?';
	var par = monedaData //parametros

	DB.getConnection(function(err, connection)
	{
		connection.query( q , [monedaData.moneda] , function(err, row)
		{
			console.log(row[0].cantidad)
	  	 	//si existe la id del cliente a eliminar
		  	if (!row[0].cantidad)
		  	{
		  		var qq = 'INSERT INTO monedas SET ?';
		  		DB.getConnection(function(err, connection)
		  		{
					connection.query( qq , par , function(err, row)
					{
				  	
				  		if(err)	throw err;

					  	//devolvemos el última id insertada
					  	else callback(null,{"result" : true}); 
				  	
				 	});

				  	connection.release();
				});

		  	}
		  	else callback(null,{"msg":"Ya existe esta etiqueta"});
	  	});

	  connection.release();
	});
}

moneda.Borrar = function(id, callback)
{
	var q = 'SELECT * FROM monedas WHERE idMoneda = ?';
	var par = [id] //parametros

	DB.getConnection(function(err, connection)
	{
		connection.query( q , par , function(err, row)
		{
	  	 	//si existe la id del cliente a eliminar
		  	if (typeof row !== 'undefined' && row.length > 0)
		  	{
		  		var qq = 'DELETE FROM monedas WHERE idMoneda = ?';
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
		  	else callback(null,{"msg":"no existe esta Etiqueta"});
	  	});

	  connection.release();
	});
}

module.exports = moneda;
