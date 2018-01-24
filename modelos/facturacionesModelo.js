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

facturacion.Actualizar = function(idFacturacion, datosFacturacion, callback) {
    
    var q = `UPDATE facturacion SET ? WHERE facturacion.idFacturacion = ?`;
    var par = datosFacturacion;

    DB.getConnection(function(err, connection)
	{
        connection.query(q, [par,idFacturacion], function(err, result){
	  		if(err)	throw err;
	  		else callback(null,{"affectedRows" : result.affectedRows});
	  		connection.release(); 
        });
	});
}

facturacion.Eliminar = function(idFacturacion, callback) {
    
    var q = `SELECT * FROM facturacion WHERE facturacion.idFacturacion = ?`;
    var qq = `DELETE * FROM facturacion WHERE facturacion.idFacturacion = ?`;

    DB.getConnection(function(err, connection)
	{
		connection.beginTransaction(function(err) {
			if (err) { throw err; }

			connection.query(q, [idFacturacion], function(err, row){
				if (err) { 
					connection.rollback(function() {
						throw err;
					});
				}
				if (typeof row !== 'undefined' && row.length > 0){
					
					connection.query(qq, [idFacturacion], function(err, result){
						if (err) { 
							connection.rollback(function() {
								throw err;
							});
						}
						
						connection.commit(function(err) {
							if (err) {
							  return connection.rollback(function() {
								throw err;
							  });
							}
							return callback(null,{"affectedRows" : result.affectedRows});
						});
						connection.release(); 
					});

				}

				connection.rollback(function() {
					return callback(null,{"msg":"no existe estos datos de Facturacion"})
				});
			});
		});
	});
}

module.exports = facturacion;