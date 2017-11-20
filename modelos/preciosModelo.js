var DB=require('./db.js');
 
var precio = {};

// Datos de un precio segun el id
precio.datos = function(id,callback)
{ 
	var q = 'SELECT precios.*, monedas.*, planes.* FROM precios INNER JOIN planes on planes_idPlan = idPlan INNER JOIN monedas on monedas_idMoneda = idMoneda WHERE idPrecio = ?' 
	var par = [id] //parametros

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
/////////////////////////////////////// REVISION HASTA AQUI

precio.insertPrecio = function(planPrecio, callback)
{
	var q = 'INSERT INTO precios SET ? ' 
	var par = planPrecio ;//parametros

	DB.getConnection(function(err, connection)
	{
		connection.query( q , par , function(err, result){
	  	
	  	if(err)	throw err;

	  	//devolvemos la última id insertada
	  	else callback(null,{"result" : result.insertId}); 
	  	
	  });

	  connection.release();
	});
}

precio.updateprecio = function(idprecio, callback)
{
	var q = 'UPDATE precios SET status = 0 WHERE idPrecio = ?';
	var par = idprecio; //parametros

	DB.getConnection(function(err, connection)
	{
		connection.query( q , par , function(err, row){
	  	
	  	if(err)	throw err;

	  	else callback(null,{"msg" : row }); 
	  	
	  });

	  connection.release();

	});
}

module.exports = precio;