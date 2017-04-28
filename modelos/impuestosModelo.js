var DB=require('./DB.js');
 
//creamos un objeto para ir almacenando todo lo que necesitemos
var impuesto = {};
 

impuesto.getImpuesto = function(localidad,callback)
{
	var par = ([localidad]) ? [localidad] : ["null"] //parametro
	var q = 'SELECT * FROM impuestos WHERE localidad = ?';

	DB.getConnection(function(err, connection)
	{
		connection.query( q , par,  function(err, row){ 
	  	
	  	if(err)	throw err;
	  	
	  	else callback(null, row);
	  	
	  });

	  connection.release();
	});

}

module.exports = impuesto;