var DB=require('./DB.js');
 
//creamos un objeto para ir almacenando todo lo que necesitemos
var impuesto = {};
 

//obtenemos todos las Etiquetas
impuesto.getImpuestos = function(callback)
{
	var q = 'SELECT * FROM impuestos ORDER BY localidad';

	DB.getConnection(function(err, connection)
	{
		connection.query( q ,  function(err, rows){
	  	
	  	if(err)	throw err;
	  	
	  	else callback(null, rows);
	  	
	  });

	  connection.release();
	});

}

impuesto.insertImpuesto = function(impuestoData,callback)
{
	var q = 'INSERT INTO impuestos SET ? ' 
	var par = impuestoData //parametros

	DB.getConnection(function(err, connection)
	{
		connection.query( q , par , function(err, result){
	  	
	  	if(err)	throw err;

	  	//devolvemos la última id insertada
	  	else callback(null,{"result" : true}); 
	  	
	  });

	  connection.release();
	});
}


impuesto.getImpuesto = function(localidad,callback)
{
	var par = ([localidad]) ? [localidad] : ["null"] //parametro
	var q = 'SELECT * FROM impuestos WHERE localidad = ?';

	DB.getConnection(function(err, connection)
	{
		connection.query( q , par,  function(err, row){ 
	  	
	  	if(err)	throw err;
	  	
	  	else callback(null, row);
	  	
	  });

	  connection.release();
	});

}
 




impuesto.updateImpuesto = function(impuestoData, callback)
{
	var q = 'UPDATE impuestos SET impuesto = ? WHERE localidad = ?';
	var par = impuestoData //parametros

	DB.getConnection(function(err, connection)
	{
		connection.query( q , par , function(err, row){
	  	
	  	if(err)	throw err;

	  	else callback(null,{"msg" : row }); 
	  	
	  });

	  connection.release();
	});
}




impuesto.deleteImpuesto = function(id, callback)
{
	var q = 'SELECT * FROM impuestos WHERE localidad = ?';
	var par = [id] //parametros

	DB.getConnection(function(err, connection)
	{
		connection.query( q , par , function(err, row)
		{
	  	 	//si existe la id del cliente a eliminar
		  	if (typeof row !== 'undefined' && row.length > 0)
		  	{
		  		var qq = 'DELETE FROM impuestos WHERE localidad = ?';
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




module.exports = impuesto;