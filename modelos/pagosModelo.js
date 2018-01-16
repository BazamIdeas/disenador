var DB = require('./db.js');

var pago = {};

pago.Listar = function(idCliente, callback) {
    var par = [idCliente];
    
    var q = `SELECT * FROM pagos WHERE clientes.idCliente = ?`;

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
    var par = datosPago;

    var q = `INSERT INTO pagos SET ?`;

    DB.connection.query(q, par, function(err, rows){
        
    })
}
