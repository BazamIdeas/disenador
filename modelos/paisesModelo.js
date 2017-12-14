var DB = require('./db.js');
 
//creamos un objeto para ir almacenando todo lo que necesitemos
var pais = {};

//obtenemos todos las Etiquetas
pais.Listar = function(callback)
{
	var q = `SELECT paises.*, monedas.*
				FROM paises
				INNER JOIN monedas_has_paises ON monedas_has_paises.paises_idPais = paises.idPais
				INNER JOIN monedas ON monedas_has_paises.monedas_idMoneda = monedas.idMoneda
				WHERE monedas_has_paises.principal = 1
				ORDER BY iso`;

	DB.getConnection(function(err, connection)
	{
		connection.query( q ,  function(err, rows){
	  	
	  		if(err)	throw err;
	  	
	  		else callback(null, rows);
	  		
	  		connection.release();
	  	});

	  	
	});

}

pais.ListarMonedas = function(id,callback)
{
	var q = `SELECT monedas.*, monedas_has_paises.principal
				FROM monedas
				LEFT JOIN monedas_has_paises ON monedas_has_paises.monedas_idMoneda = monedas.idMoneda
				INNER JOIN paises ON paises.idPais = monedas_has_paises.paises_idPais
				WHERE paises.idPais = ?
				ORDER BY moneda`;

	var par = [id];

	DB.getConnection(function(err, connection)
	{
		connection.query( q , par,  function(err, rows){
	  	
	  		if(err)	throw err;
	  	
	  		else callback(null, rows);

	  		connection.release();
	  	});

	  	
	});

}

pais.ObtenerPorIso = function(iso,callback)
{
	var q = `SELECT paises.*, monedas.*
				FROM paises
				INNER JOIN monedas_has_paises ON monedas_has_paises.paises_idPais = paises.idPais
				INNER JOIN monedas ON monedas.idMoneda = monedas_has_paises.monedas_idMoneda
				WHERE paises.iso = ?
				AND monedas_has_paises.principal = 1`; 

	DB.getConnection(function(err, connection)
	{
		connection.query( q , [iso], function(err, row){


		  	if(err)	throw err;

		  	else callback(null, row);

		  	connection.release();

		});
		
	});
}


pais.Nuevo = function(paisData,callback)
{

	var q = 'SELECT count(*) as cantidad FROM paises WHERE iso = ?';

	DB.getConnection(function(err, connection)
	{
		connection.query( q , [paisData.iso] , function(err, row)
		{
	  	 	//si existe la id del cliente a eliminar
		  	if (!row[0].cantidad)
		  	{

				var qq = 'INSERT INTO paises SET ? ' 
				var par = paisData //parametros

				DB.getConnection(function(err, connection)
				{
					connection.query( qq , par , function(err, result){
				  	
					  	if(err)	throw err;

					  	//devolvemos la última id insertada
					  	else callback(null,{"insertId" : result.insertId}); 
					  	
					  	connection.release();
				 	});

				  
				});
		  	}
		  	else callback(null,{"msg":"Ya existe este pais"});

		  	connection.release();
	  	});

	  
	});
}

pais.AsignarMoneda = function(paisMoneda,callback)
{
	var q = 'SELECT count(*) as cantidad FROM monedas_has_paises WHERE paises_idPais = ? AND monedas_idMoneda = ?';
	var par = paisMoneda //parametros

	DB.getConnection(function(err, connection)
	{
		connection.query( q , [paisMoneda.paises_idPais, paisMoneda.monedas_idMoneda] , function(err, row)
		{
		  	if (!row[0].cantidad)
		  	{
		  		var qq = 'INSERT INTO monedas_has_paises SET ?';
		  		DB.getConnection(function(err, connection)
		  		{
					connection.query( qq , par , function(err, result)
					{
				  	
				  		if(err)	throw err;

					  	//devolvemos el última id insertada
					  	else callback(null,{"insertId" : result}); 
				  		
				  		connection.release();
				 	});

				  	
				});

		  	}
		  	else callback(null,{"msg":"La moneda ya esta asignada"});
	  		
	  		connection.release();
	  	});

		
	});
}

pais.AsignarDolar = function(idPais,callback)
{
	var q = `SELECT j.cantidad, i.idMoneda 
				FROM (SELECT monedas.idMoneda, monedas.moneda 
						FROM monedas 
						WHERE monedas.moneda = "USD") as i,
					 (SELECT count(*) as cantidad 
					 	FROM monedas_has_paises 
					 	RIGHT JOIN monedas ON monedas.idMoneda = monedas_has_paises.monedas_idMoneda 
					 	WHERE monedas_has_paises.paises_idPais = ? 
					 	AND monedas.moneda = "USD") as j`;

	DB.getConnection(function(err, connection)
	{
		connection.query( q , [idPais] , function(err, row)
		{

			//console.log(row)
		  	if (!row[0].cantidad)
		  	{
		  		var qq = 'INSERT INTO monedas_has_paises SET ?';

		  		var par = {
		  			monedas_idMoneda : row[0].idMoneda,
		  			paises_idPais : idPais
		  		}

		  		DB.getConnection(function(err, connection)
		  		{
					connection.query( qq , par , function(err, result)
					{
				  	
				  		if(err)	throw err;

					  	//devolvemos el última id insertada
					  	else callback(null,{"insertId" : result}); 
				  		
				  		connection.release();
				 	});

				  	
				});

		  	}
		  	else callback(null,{"msg":"La moneda ya esta asignada"});
	  		
	  		connection.release();
	  	});

	
	});
}

pais.DesasignarMoneda = function(paisMoneda,callback)
{	
	var q = 'SELECT count(*) as cantidad FROM monedas_has_paises WHERE paises_idPais = ? AND monedas_idMoneda = ?';
	var par = paisMoneda //parametros

	DB.getConnection(function(err, connection)
	{
		connection.query( q , [paisMoneda.paises_idPais, paisMoneda.monedas_idMoneda] , function(err, row)
		{
	  	 	//si existe la id del cliente a eliminar
		  	if (row[0].cantidad)
		  	{
		  		var qq = 'DELETE FROM monedas_has_paises WHERE paises_idPais = ? AND monedas_idMoneda = ? ;';
		  		DB.getConnection(function(err, connection)
		  		{
					connection.query( qq , [paisMoneda.paises_idPais, paisMoneda.monedas_idMoneda] , function(err, result)
					{
						//console.log('this.sql', this.sql);
				  	
				  		if(err)	throw err;

					  	//devolvemos el última id insertada
					  	else callback(null,{"msg" : 'eliminado'}); 
				  	
				 		connection.release();
				 	});

				  	
				});

		  	}
		  	else callback(null,{"msg":row[0].cantidad});

		  	connection.release();
	  	});

	
	});
}

pais.ObtenerPorId = function(id,callback)
{
	var par = [id]
	var q = 'SELECT * FROM paises WHERE idPais = ?';

	DB.getConnection(function(err, connection)
	{
		connection.query( q , par,  function(err, row){ 
	  	
		  	if(err)	throw err;
		  	
		  	else callback(null, row);

		  	connection.release();
	  	});
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

		  	connection.release();
	  	
	  	});
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

		  	connection.release();
	  	});
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
				  		
				  		connection.release();
				 	});
				});

		  	}
		  	else callback(null,{"msg":"no existe esta Etiqueta"});

		  	connection.release();
	  	});

	  
	});
}

module.exports = pais;