var DB=require('./DB.js');
 
//creamos un objeto para ir almacenando todo lo que necesitemos
var planes = {};
 

//obtenemos todos las Etiquetas

planes.getPlanes = function(callback)
{
	var q = 'SELECT planes.plan, planes.idPlan, precios.idPrecio, precios.precio,precios.moneda FROM planes INNER JOIN precios ON planes.idPlan = precios.planes_idPlan WHERE precios.status = 1 ORDER BY planes.idPlan';

	DB.getConnection(function(err, connection)
	{
		connection.query( q ,  function(err, rows){
	  	
	  	if(err)	throw err;
	  	
	  	else callback(null, rows);
	  	
	  });

	  connection.release();
	});

}

/*planes.getPlanesPrecio = function(idPlan, callback)
{
	var q = 'SELECT precio, moneda FROM precios WHERE planes_idPlan = ? '
	var id = [idPlan];
//console.log(id)
	DB.getConnection(function(err, connection)
	{
		connection.query( q , id,   function(err, rows){
	  	
	  	if(err)	throw err;
	  	
	  	else callback(null, rows);
	  	
	  });

	  connection.release();
	});

}*/


planes.insertPlan = function(planNombre, callback)
{
	var q = 'INSERT INTO planes SET ? ' 
	var par = planNombre; //parametros

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

planes.getselectPlanes = function(callback)
{
	var q = 'SELECT * FROM planes  ORDER BY plan';

	DB.getConnection(function(err, connection)
	{
		connection.query( q ,  function(err, rows){
	  	
	  	if(err)	throw err;
	  	
	  	else callback(null, rows);
	  	
	  });

	  connection.release();
	});

}

planes.insertPrecio = function(planPrecio, callback)
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
/*planes.buscarPrecios = function(buscarPrecio, callback)
{
	
	var q = 'SELECT * FROM precios ';
	var id = buscarPrecio;
	console.log(id)
	DB.getConnection(function(err, connection)
	{
		connection.query( q ,   function(err, rows){
	  	
	  	if(err)	throw err;
	  	
	  	else callback(null, rows);
	  	
	  });

	  connection.release();
	});

}*/

planes.getPrecio = function(idprecio,callback)
{ 
	var q = 'SELECT precio, moneda, planes_idPlan FROM precios WHERE idPrecio= ? ' 
	var par = [idprecio] //parametros

	DB.getConnection(function(err, connection)
	{
		connection.query( q , par , function(err, row){
	  	
	  	if(err)	throw err;
	  	
	  	else callback(null, row);
	  	
	  });

	  connection.release();
	});
}
 




planes.updateprecio = function(idprecio, callback)
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
/*



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

*/


module.exports = planes;