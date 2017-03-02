var DB=require('./DB.js');
 
//creamos un objeto para ir almacenando todo lo que necesitemos
var preferencia = {};
 

//obtenemos todos las preferencias
preferencia.getPreferencias = function(callback)
{
	var q = 'SELECT idPreferencia, nombre1, nombre2 FROM preferencias ORDER BY idPreferencia';

	DB.getConnection(function(err, connection)
	{
		connection.query( q ,  function(err, rows){
	  	
	  	if(err)	throw err;
	  	
	  	else callback(null, rows);
	  	
	  });

	  connection.release();
	});

}
preferencia.getPreferencia = function(id,callback)
{ 
	var q = 'SELECT nombre1, nombre2, idPreferencia FROM preferencias WHERE idPreferencia = ? ' 
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
 

preferencia.insertPreferencia = function(preferenciaData,callback)
{
	var q = 'INSERT INTO preferencias SET ? ' 
	var par = preferenciaData //parametros

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



preferencia.updatePreferencia = function(preferenciaData, callback)
{
	var q = 'UPDATE preferencias SET nombre1 = ?, nombre2 = ? WHERE idPreferencia = ?';
	var par = preferenciaData //parametros

	DB.getConnection(function(err, connection)
	{
		connection.query( q , par , function(err, row){
	  	
	  	if(err)	throw err;

	  	else callback(null,{"msg" : "modificacion exitosa"}); 
	  	
	  });

	  connection.release();
	});
}




preferencia.deletePreferencia = function(id, callback)
{
	var q = 'SELECT * FROM preferencias WHERE idPreferencia = ?';
	var par = [id] //parametros

	DB.getConnection(function(err, connection)
	{
		connection.query( q , par , function(err, row)
		{
	  	 	//si existe la id del cliente a eliminar
		  	if (typeof row !== 'undefined' && row.length > 0)
		  	{
		  		var qq = 'DELETE FROM preferencias WHERE idPreferencia = ?';
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
		  	else callback(null,{"msg":"no existe esta Preferencia"});
	  	});

	  connection.release();
	});
}




module.exports = preferencia;