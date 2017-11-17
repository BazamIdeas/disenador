var DB = require('./db.js');
 
//creamos un objeto para ir almacenando todo lo que necesitemos
var pasarela = {};

//obtenemos todos las Etiquetas
pasarela.Listar = function(callback)
{
	var q = 'SELECT pasarelas.* FROM pasarelas ORDER BY pasarela';

	DB.getConnection(function(err, connection)
	{
		connection.query( q ,  function(err, rows){
	  	
	  	if(err)	throw err;
	  	
	  	else callback(null, rows);
	  	
	  });

	  connection.release();
	});

}

pasarela.ListarMonedas = function(id,callback)
{
	var q = 'SELECT monedas.* FROM monedas LEFT JOIN pasarelas_has_monedas ON pasarelas_has_monedas.monedas_idMoneda = monedas.idMoneda INNER JOIN pasarelas ON pasarelas.idPasarela = pasarelas_has_monedas.pasarelas_idPasarela WHERE pasarelas.idPasarela = ? ORDER BY moneda';
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

pasarela.Nuevo = function(paisData,callback)
{
	var q = 'INSERT INTO pasarelas SET ? ' 
	var par = pasarelaData //parametros

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

pasarela.AsignarMoneda = function(paismoneda,callback)
{
	var q = 'SELECT count(*) as cantidad FROM pasarelas_has_monedas WHERE pasarelas_idPasarela = ? AND monedas_idMoneda = ?';
	var par = pasarelaMoneda //parametros

	DB.getConnection(function(err, connection)
	{
		connection.query( q , [pasarelaMoneda.pasarelas_idPasarela, pasarelaMoneda.monedas_idMoneda] , function(err, row)
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

pasarela.Obtener = function(id,callback)
{
	var par = ([id]) ? [id] : ["null"] //parametro
	var q = 'SELECT * FROM pasarelas WHERE idPasarela = ?';

	DB.getConnection(function(err, connection)
	{
		connection.query( q , par,  function(err, row){ 
	  	
	  	if(err)	throw err;
	  	
	  	else callback(null, row);
	  	
	  });

	  connection.release();
	});
}
 
pasarela.Modificar = function(paisData, callback)
{
	var q = 'UPDATE pasarelas SET pasarela = ? WHERE idPasarela = ?';
	var par = pasarelaData //parametros

	DB.getConnection(function(err, connection)
	{
		connection.query( q , par , function(err, row){
	  	
	  	if(err)	throw err;

	  	else callback(null,{"msg" : row }); 
	  	
	  });

	  connection.release();
	});
}

pasarela.Borrar = function(id, callback)
{
	var q = 'SELECT * FROM pasarelas WHERE idPais = ?';
	var par = [id] //parametros

	DB.getConnection(function(err, connection)
	{
		connection.query( q , par , function(err, row)
		{
	  	 	//si existe la id del cliente a eliminar
		  	if (typeof row !== 'undefined' && row.length > 0)
		  	{
		  		var qq = 'DELETE FROM pasarelas WHERE idPais = ?';
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

module.exports = pasarela;