var DB = require('./db.js');

var facturacion = {};

facturacion.ObtenerPorCliente = function(idCliente, callback) {
    
    var q = `SELECT * FROM facturacion WHERE clientes_idCliente = ?`;
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

facturacion.Nuevo = function(datosFacturacion, callback) {
    
    var q = `INSERT INTO facturacion SET ?`;
    var par = datosFacturacion;

    DB.getConnection(function(err, connection)
	{
        connection.query(q, par, function(err, result){
	  		if(err)	throw err;
	  		else callback(null,{"insertId" : result.insertId});
	  		connection.release(); 
        });
	});
}

module.exports = facturacion;