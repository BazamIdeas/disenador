var DB = require('./db.js');
 
var precios = {};

// Datos de un precio segun el id
precios.datos = function(id,callback)
{ 
	var q = `SELECT precios.*, monedas.*, planes.* 
				FROM precios 
				INNER JOIN planes on planes_idPlan = idPlan 
				INNER JOIN monedas on monedas_idMoneda = idMoneda 
				WHERE idPrecio = ?`;

	var par = [id]

	DB.getConnection(function(err, connection)
	{
		connection.query( q , par , function(err, row)
		{
		  	
		  	if(err)	throw err;
		  	
		  	else callback(null, row);
		  	
		});

		connection.release();
	});
}


precios.ListarPorPlan = function(idPais,idPlan,callback)
{
	var q = `SELECT precios.*, monedas.*
				FROM precios 
				INNER JOIN monedas ON monedas.idMoneda = precios.monedas_idMoneda
				INNER JOIN monedas_has_paises ON monedas_has_paises.monedas_idMoneda = monedas.idMoneda
				INNER JOIN paises ON paises.idPais = monedas_has_paises.paises_idPais
				WHERE paises.idPais = ?
				AND precios.planes_idPlan = ?
				AND precios.status = 1
				ORDER BY moneda`;

	DB.getConnection(function(err, connection)
	{
		return connection.query( q , [idPais,idPlan], function(err, rows){

		  	if(err)	throw err;

		  	else callback(null, rows);

		  	connection.release();

		});
		
		
	});
}


precios.Nuevo = function(precioData, callback)
{
	var q = 'SELECT count(*) as cantidad FROM precios WHERE monedas_idMoneda = ? AND planes_idPlan = ? AND status = 1';

	DB.getConnection(function(err, connection)
	{
		connection.query( q , [precioData.monedas_idMoneda, precioData.planes_idPlan] , function(err, row)
		{	
			console.log(row[0].cantidad)
		  	if (!row[0].cantidad)
		  	{
				var q = 'INSERT INTO precios SET ? ' 
				var par = precioData ;//parametros

				DB.getConnection(function(err, connection)
				{
					connection.query( q , par , function(err, result){
				  	
				  		if(err)	throw err;

				  		else callback(null,{"result" : result.insertId}); 
				  	
				  	});

				  	connection.release();
				});

			}
			else callback(null, {"msg":"Ya existe un precio con la moneda"});
		});

		connection.release();
	});
}

precios.Bloquear = function(idPrecio, callback)
{
	var q = 'UPDATE precios SET status = 0 WHERE idPrecio = ?';
	var par = [idPrecio]; //parametros

	DB.getConnection(function(err, connection)
	{
		connection.query( q , par , function(err, row){
	  	
	  		if(err)	throw err;

	  		else callback(null,{"affectedRows" : row.affectedRows });
	  	
	  	});

	  connection.release();
	});
}

module.exports = precios;