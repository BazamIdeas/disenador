var DB = require('./db.js');
 
//creamos un objeto para ir almacenando todo lo que necesitemos
var pais = {};

//obtenemos todos las Etiquetas
pais.Listar = function(callback)
{
	var q = 'SELECT paises.* FROM paises ORDER BY iso';

	DB.getConnection(function(err, connection)
	{
		connection.query( q ,  function(err, rows){
	  	
	  	if(err)	throw err;
	  	
	  	else callback(null, rows);
	  	
	  });

	  connection.release();
	});

}

pais.ListarMonedas = function(id,callback)
{
	var q = 'SELECT monedas.*, monedas_has_paises.principal FROM monedas LEFT JOIN monedas_has_paises ON monedas_has_paises.monedas_idMoneda = monedas.idMoneda INNER JOIN paises ON paises.idPais = monedas_has_paises.paises_idPais WHERE paises.idPais = ? ORDER BY moneda';
	var par = [id];

	DB.getConnection(function(err, connection)
	{
		connection.query( q , par,  function(err, rows){
	  	
	  	if(err)	throw err;
	  	
	  	else callback(null, rows);
	  	
	  });

	  connection.release();
	});

}

pais.Nuevo = function(paisData,callback)
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

pais.AsignarMoneda = function(paismoneda,callback)
{
	var q = 'SELECT count(*) as cantidad FROM monedas_has_paises WHERE paises_idPais = ? AND monedas_idMoneda = ?';
	var par = paisMoneda //parametros

	DB.getConnection(function(err, connection)
	{
		connection.query( q , [paisMoneda.paises_idPais, paisMoneda.monedas_idMoneda] , function(err, row)
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

pais.Obtener = function(id,callback)
{
	var par = [id]
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

pais.ObtenerImpuesto = function(iso ,callback)
{
	var par = [iso]
	var q = 'SELECT impuesto FROM paises WHERE iso = ?';

	DB.getConnection(function(err, connection)
	{
		connection.query( q , par,  function(err, row){ 
	  	
	  	if(err)	throw err;
	  	
	  	else callback(null, row[0].impuesto);
	  	
	  });

	  connection.release();
	});
}
 
pais.Modificar = function(paisData, callback)
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

pais.Borrar = function(id, callback)
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