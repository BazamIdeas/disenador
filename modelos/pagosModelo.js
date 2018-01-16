var DB = require('./db.js');

var pago = {};

pago.ObtenerPoCliente = function(idCliente, callback) {

    var q = `SELECT * FROM pagos WHERE clientes_idCliente = ?`;
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