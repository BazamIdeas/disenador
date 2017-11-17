var DB=require('./DB.js');
 
//creamos un objeto para ir almacenando todo lo que necesitemos
var precio = {};

precio.getPrecio = function(id,callback)
{ 
	var q = 'SELECT precio, moneda, plan, idPlan FROM precios, planes WHERE planes_idPlan = idPlan AND idPrecio= ? ' 
	var par = [id] //parametros

	DB.getConnection(function(err, connection)
	{
		connection.query( q , par , function(err, row){
	  	
	  	if(err)	throw err;
	  	
	  	else callback(null, row);
	  	
	  });

	  connection.release();
	});
}
 

module.exports = precio;