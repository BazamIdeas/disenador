var DB=require('./DB.js');
 
//creamos un objeto para ir almacenando todo lo que necesitemos
var pais = {};
 

//obtenemos todos las Etiquetas
pais.getPaises = function(callback)
{
	var q = 'SELECT paises.* FROM paises ORDER BY localidad';

	DB.getConnection(function(err, connection)
	{
		connection.query( q ,  function(err, rows){
	  	
	  	if(err)	throw err;
	  	
	  	else callback(null, rows);
	  	
	  });

	  connection.release();
	});

}

pais.insertPais = function(paisData,callback)
{
	var q = 'INSERT INTO paises SET ? ' 
	var par = paisData //parametros

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

pais.asignarMoneda = function(paismoneda,callback)
{
	var q = 'SELECT count(*) as cantidad FROM monedas_has_paises WHERE paises_idPais = ? AND monedas_idMoneda = ?';
	var par = paismoneda //parametros

	DB.getConnection(function(err, connection)
	{
		connection.query( q , [paismoneda.paises_idPais, paismoneda.monedas_idMoneda] , function(err, row)
		{
			console.log(row[0].cantidad)
	  	 	//si existe la id del cliente a eliminar
		  	if (!row[0].cantidad)
		  	{
		  		var qq = 'INSERT INTO monedas_has_paises SET ?';
		  		DB.getConnection(function(err, connection)
		  		{
					connection.query( qq , par , function(err, result)
					{
				  	
				  		if(err)	throw err;

					  	//devolvemos el última id insertada
					  	else callback(null,{"insertId" : result.insertId}); 
				  	
				 	});

				  	connection.release();
				});

		  	}
		  	else callback(null,{"msg":"La moneda ya esta asignada"});
	  	});

	  connection.release();
	});
}



pais.getPais = function(id,callback)
{
	var par = ([id]) ? [id] : ["null"] //parametro
	var q = 'SELECT * FROM paises WHERE idPais = ?';

	DB.getConnection(function(err, connection)
	{
		connection.query( q , par,  function(err, row){ 
	  	
	  	if(err)	throw err;
	  	
	  	else callback(null, row);
	  	
	  });

	  connection.release();
	});

}
 




pais.updatePais = function(paisData, callback)
{
	var q = 'UPDATE paises SET impuesto = ? WHERE idPais = ?';
	var par = paisData //parametros

	DB.getConnection(function(err, connection)
	{
		connection.query( q , par , function(err, row){
	  	
	  	if(err)	throw err;

	  	else callback(null,{"msg" : row }); 
	  	
	  });

	  connection.release();
	});
}




pais.deletePais = function(id, callback)
{
	var q = 'SELECT * FROM paises WHERE idPais = ?';
	var par = [id] //parametros

	DB.getConnection(function(err, connection)
	{
		connection.query( q , par , function(err, row)
		{
	  	 	//si existe la id del cliente a eliminar
		  	if (typeof row !== 'undefined' && row.length > 0)
		  	{
		  		var qq = 'DELETE FROM paises WHERE idPais = ?';
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




module.exports = pais;