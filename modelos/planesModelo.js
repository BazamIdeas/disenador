var DB=require('./db.js');
 
//creamos un objeto para ir almacenando todo lo que necesitemos
var planes = {};

planes.ListarPorPais = function(idPais, callback)
{
	var q = `SELECT planes.*
				FROM planes
				INNER JOIN precios ON precios.planes_idPlan = planes.idPlan
				INNER JOIN monedas ON monedas.idMoneda = precios.monedas_idMoneda
				INNER JOIN monedas_has_paises ON monedas_has_paises.monedas_idMoneda = monedas.idMoneda
				INNER JOIN paises ON paises.idPais = monedas_has_paises.paises_idPais
				WHERE planes.status = 1
				AND paises.idPais = ?
				GROUP BY planes.idPlan
				`;

	DB.getConnection(function(err, connection)
	{
		return connection.query( q , [idPais], function(err, rows){

		  	if(err)	throw err;

		  	else callback(null, rows);

		  	connection.release();
		});
	});	
}

planes.Listar = function(callback)
{
	var q = 'SELECT * FROM planes ORDER BY plan';

	DB.getConnection(function(err, connection)
	{
		connection.query( q ,  function(err, rows){
	  	
	  		if(err)	throw err;
	  	
	  		else callback(null, rows);

	  		connection.release();
	 	});	
	});
}

planes.ListarPrecios = function(id,callback)
{
	var q =  `SELECT precios.*, monedas.* FROM precios
				INNER JOIN monedas ON monedas.idMoneda = precios.monedas_idMoneda
				WHERE precios.status = 1
				AND precios.planes_idPlan = ?
				ORDER BY precios.idPrecio`;

	DB.getConnection(function(err, connection)
	{
		connection.query( q , [id], function(err, rows){
	  	
	  		if(err)	throw err;
	  	
	  		else callback(null, rows);

	  		connection.release();
	  	
	  	});	  	
	});
}

planes.Nuevo = function(planNombre, callback)
{
	var q = 'INSERT INTO planes SET ? ' 
	var par = planNombre; //parametros

	DB.getConnection(function(err, connection)
	{
		connection.query( q , par , function(err, result){
	  	
	  		if(err)	throw err;

	  		//devolvemos la última id insertada
	  		else callback(null,{"insertId" : result.insertId}); 

	  		connection.release();
	  	});
  	
	});
}

planes.Bloquear = function(idPlan, callback)
{
	var q = "SELECT count(*) as cantidad, planes.* FROM planes WHERE idPlan = ?";

	DB.getConnection(function(err, connection)
	{
		connection.query( q , [idPlan] , function(err, row){
	  	
	  		if(row[0].cantidad){

	  			var i = row[0].status ? 0 : 1;
	  			var qq = 'UPDATE planes SET status = ? WHERE idPlan = ?';

				DB.getConnection(function(err, connection)
				{
					connection.query( qq , [i , idPlan] , function(err, row_qq){

						if(err)	throw err;

	  					else callback(null,{"affectedRows" : row_qq.affectedRows });

	  					connection.release();
					});
					
				});			

	  		}
	  		else callback(null,{'msg' : 'No se encontro plan' }); 

	  		connection.release();
	  	
	  	});
	});
}

planes.Modificar = function(planData, callback)
{
	var q = 'UPDATE planes SET plan = ?, info = ? WHERE idPlan = ?';
	var par = planData; //parametros

	DB.getConnection(function(err, connection)
	{
		connection.query( q , par , function(err, row){
	  	
		  	if(err)	throw err;

		  	else callback(null, {"affectedRows" : row.affectedRows }); 

		  	connection.release();
	  	
		});
	});
}

planes.ObtenerPlan = function(idPlan, callback){

	var q = `SELECT planes.*
				FROM planes
				INNER JOIN precios ON precios.planes_idPlan = planes.idPlan
				INNER JOIN monedas ON monedas.idMoneda = precios.monedas_idMoneda
				INNER JOIN monedas_has_paises ON monedas_has_paises.monedas_idMoneda = monedas.idMoneda
				INNER JOIN paises ON paises.idPais = monedas_has_paises.paises_idPais
				WHERE planes.status = 1
				AND planes.idPlan = ?
				GROUP BY planes.idPlan
				`;

	DB.getConnection(function(err, connection)
	{
		connection.query( q , [idPlan] , function(err, row){
	  	
		  	if(err)	throw err;

			  else callback(null, row); 

		  	connection.release();
		});
	});	
}

module.exports = planes;