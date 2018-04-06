var DB = require('./db.js');

var pago = {};

pago.ObtenerPorCliente = function(idCliente, callback) {
	
	var q = "SELECT * FROM pagos WHERE pagos.clientes_idCliente = ?"
	var par = [idCliente] //parametros

	DB.getConnection(function(err, connection)
	{
		connection.query( q , par , function(err, rows){
	  	
		  	if(err)	throw err;
		  	
		  	else callback(null, rows);

		  	connection.release();
	  	
	 	});
	});
}

pago.ObtenerPorCliente = function(idCliente, callback) {

    var q = `SELECT pagos.fecha, pagos.monto, facturacion.medio, facturacion.correo FROM pagos INNER JOIN facturacion ON pagos.facturacion_idFacturacion = facturacion.idFacturacion WHERE facturacion.clientes_idCliente = ?`;
	var par = [idCliente];
	
	DB.getConnection(function(err, connection)
	{
		connection.query( q , par, function(err, rows){
	  		if(err)	throw err;
	  		else callback(null, rows);
	  		connection.release();
	  	});	  	
	});
    
}

pago.Nuevo = function(datosPago, callback) {

    var q = `INSERT INTO pagos SET ?`;
	var par = datosPago;
	

    DB.getConnection(function(err, connection)
	{
        connection.query(q, par, function(err, result){
	  		if(err)	throw err;
	  		else callback(null,{"insertId" : result.insertId});
	  		connection.release(); 
        });
	});
}

module.exports = pago;