var DB=require('./DB.js');
 
//creamos un objeto para ir almacenando todo lo que necesitemos
var planes = {};
 

//obtenemos todos las Etiquetas

planes.getPlanes = function(callback)
{
	var q = 'SELECT planes.plan, precios.idPrecio, precios.precio,precios.moneda, precios.isoPais, planes.info FROM planes INNER JOIN precios ON planes.idPlan = precios.planes_idPlan WHERE precios.status = 1 and planes.status = 1 ORDER BY planes.idPlan';

	DB.getConnection(function(err, connection)
	{
		connection.query( q,  function(err, rows){
	  	
	  	if(err)	throw err;
	  	
	  	else callback(null, rows);
	  	
	  });

	  connection.release();
	});

}

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

planes.getPlanesWithPrices = function(callback)
{
	var q =  'SELECT * FROM planes INNER JOIN precios ON planes.idPlan = precios.planes_idPlan WHERE precios.status = 1 and planes.status = 1 ORDER BY planes.plan';

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
//nuevos modelos de planes
planes.getPlanprecio= function(planId, callback)
{ 	
	var q = 'SELECT * FROM precios WHERE planes_idPlan = ? ' ;
	var par = planId ;//parametros
	DB.getConnection(function(err, connection)
	{
		connection.query( q , par, function(err, row){
	  	
	  	if(err)	throw err;
	  	
	  	else callback(null, row);
	  	
	  });
 
	  connection.release();
	});
}

planes.cambiarEstado = function(dato, callback)
{
	var q = 'UPDATE planes SET status = ? WHERE idPlan = ?';
	var par = dato; //parametros

	DB.getConnection(function(err, connection)
	{
		connection.query( q , par , function(err, row){
	  	
	  	if(err)	throw err;

	  	else callback(null,{"msg" : row }); 
	  	
	  });

	  connection.release();

	});
}

planes.cambiarNombre = function(dato, callback)
{
	var q = 'UPDATE planes SET plan = ?, info = ? WHERE idPlan = ?';
	var par = dato; //parametros

	DB.getConnection(function(err, connection)
	{
		connection.query( q , par , function(err, row){
	  	
	  	if(err)	throw err;

	  	else callback(null,{"msg" : row }); 
	  	
	  });

	  connection.release();

	});
}


module.exports = planes;