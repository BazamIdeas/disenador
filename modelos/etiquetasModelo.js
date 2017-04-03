var DB=require('./DB.js');
 
//creamos un objeto para ir almacenando todo lo que necesitemos
var etiqueta = {};
 

//obtenemos todos las Etiquetas
etiqueta.getEtiquetas = function(callback)
{
	var q = 'SELECT idEtiqueta, nombreEtiqueta FROM etiquetas ORDER BY idEtiqueta';

	DB.getConnection(function(err, connection)
	{
		connection.query( q ,  function(err, rows){
	  	
	  	if(err)	throw err;
	  	
	  	else callback(null, rows);
	  	
	  });

	  connection.release();
	});

}
etiqueta.getEtiqueta = function(id,callback)
{ 
	var q = 'SELECT nombreEtiqueta idEtiqueta FROM etiquetas WHERE idEtiqueta= ? ' 
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
 

etiqueta.insertEtiqueta = function(etiquetaData,callback)
{
	var q = 'INSERT INTO etiquetas SET ? ' 
	var par = etiquetaData //parametros

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



etiqueta.updateEtiqueta = function(etiquetaData, callback)
{
	var q = 'UPDATE etiquetas SET nombreEtiqueta = ? WHERE idEtiqueta = ?';
	var par = etiquetaData //parametros

	DB.getConnection(function(err, connection)
	{
		connection.query( q , par , function(err, row){
	  	
	  	if(err)	throw err;

	  	else callback(null,{"msg" : "modificacion exitosa"}); 
	  	
	  });

	  connection.release();
	});
}




etiqueta.deleteEtiqueta = function(id, callback)
{
	var q = 'SELECT * FROM etiquetas WHERE idEtiqueta = ?';
	var par = [id] //parametros

	DB.getConnection(function(err, connection)
	{
		connection.query( q , par , function(err, row)
		{
	  	 	//si existe la id del cliente a eliminar
		  	if (typeof row !== 'undefined' && row.length > 0)
		  	{
		  		var qq = 'DELETE FROM etiquetas WHERE idEtiqueta = ?';
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




module.exports = etiqueta;