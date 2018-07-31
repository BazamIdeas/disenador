var DB = require("./db.js");

//creamos un objeto para ir almacenando todo lo que necesitemos
var cliente = {};

cliente.verificarCliente = function (clienteData, callback) {
	var q = "SELECT idCliente, nombreCliente, correo, pass, foto FROM clientes WHERE correo = ?";

	var correo = clienteData[0];

	DB.getConnection(function (err, connection) {

		connection.query(q, correo, function (err, row) {
			if (typeof row !== "undefined" && row.length > 0) {

				callback(null, row);

			} else {

				callback(null, { "msg": "Correo Inexistente" });

			}

			connection.release();
		});
	});
};



//obtenemos todos los clientes
cliente.getClientes = function (callback) {
	var q = "SELECT nombreCliente, idCliente, correo, pass, telefono, pais, foto, bloqueado FROM clientes WHERE disenador = 0 ORDER BY idCliente";

	DB.getConnection(function (err, connection) {
		connection.query(q, function (err, rows) {

			if (err) throw err;

			else callback(null, rows);
			connection.release();
		});
	});
};

//obtenemos todos los clientes
cliente.getDisenadores = function (callback) {

	var q = "SELECT nombreCliente, idCliente, correo, pass, telefono, pais, foto, bloqueado FROM clientes WHERE disenador = 1 ORDER BY idCliente";

	DB.getConnection(function (err, connection) {
		connection.query(q, function (err, rows) {

			if (err) throw err;

			else callback(null, rows);
			connection.release();
		});
	});
};

//obtenemos un cliente por su id
cliente.getCliente = function (id, callback) {
	var q = "SELECT nombreCliente, idCliente, correo, pass, telefono, pais, foto FROM clientes WHERE idCliente = ?";
	var par = [id]; //parametros

	//console.log(par)
	DB.getConnection(function (err, connection) {
		connection.query(q, par, function (err, row) {

			if (err) throw err;

			else callback(null, row);

			connection.release();
		});
	});
};

cliente.getClienteByEmail = function (id, callback) {
	var q = "SELECT nombreCliente, idCliente, correo, pass, telefono, pais, foto FROM clientes WHERE correo = ?";
	var par = [id]; //parametros

	//console.log(par)
	DB.getConnection(function (err, connection) {
		connection.query(q, par, function (err, row) {

			if (err) throw err;

			else callback(null, row);

			connection.release();
		});
	});
};

//obtenemos un cliente por su email
cliente.getClienteEmail = function (correo, callback) {
	var q = "SELECT nombreCliente, idCliente, correo, pass, telefono, pais FROM clientes WHERE correo = ? ";
	var par = [correo]; //parametros

	DB.getConnection(function (err, connection) {
		connection.query(q, par, function (err, row) {

			if (err) throw err;

			else callback(null, row);

			connection.release();
		});
	});
};


//añadir un nuevo cliente
cliente.insertCliente = function (clienteData, callback) {
	var q = "SELECT idCliente FROM clientes WHERE correo = ? ";
	var correo = clienteData.correo;

	DB.getConnection(function (err, connection) {
		connection.query(q, correo, function (err, row) {

			if (row.length > 0) {
				callback(null, { "msg": "cliente ya registrado" });
			} else {
				var qq = "INSERT INTO clientes SET ? ";
				var par = clienteData; //parametros

				DB.getConnection(function (err, connection) {
					var q = connection.query(qq, par, function (err, result) {

						if (err) throw err;

						//devolvemos la última id insertada
						else callback(null, { "insertId": result.insertId });

						connection.release();

					});

					console.log(q.sql);

				});
			}
			connection.release();
		});

	});

};

//actualizar un cliente
cliente.updateCliente = function (body, passActual, callback) {
	if (typeof passActual !== "undefined" && passActual.length > 0 && typeof body.pass !== "undefined" && body.pass.length > 0) {

		var q = "SELECT * FROM clientes WHERE idCliente = ?";
		var par = [body.idCliente];

		DB.getConnection(function (err, connection) {
			connection.query(q, par, function (err, row) {
				//console.log(row)
				if (typeof row !== "undefined" && row.length > 0) {

					if (passActual == row[0].pass) {

						var qq = "UPDATE clientes SET nombreCliente = ?, pass = ?, telefono = ?, pais = ? WHERE idCliente = ?";

						var parqq = [body.nombreCliente, body.pass, body.telefono, body.pais, body.idCliente];

						DB.getConnection(function (err, connection) {
							connection.query(qq, parqq, function (err, row) {

								if (err) throw err;

								else callback(null, { "affectedRows": row.affectedRows });

								connection.release();
							});
						});

					} else {
						callback(null, { "msg": "Las contraseñan no coinciden" });
					}

				} else {
					callback(null, { "msg": "El usuario no se encuentra" });
				}
				connection.release();
			});

		});

	} else {


		q = "UPDATE clientes SET nombreCliente = ?, telefono = ?, pais = ? WHERE idCliente = ?";
		par = [body.nombreCliente, body.telefono, body.pais, body.idCliente];


		DB.getConnection(function (err, connection) {
			connection.query(q, par, function (err, row) {

				if (err) throw err;

				else callback(null, { "affectedRows": row.affectedRows });

				connection.release();
			});
		});

	}
};


//cambiar contraseña
cliente.changePassword = function (datos, callback) {
	var q = "UPDATE clientes SET pass = ? WHERE idCliente = ?";
	var par = datos; //parametros

	DB.getConnection(function (err, connection) {
		connection.query(q, par, function (err) {

			if (err) throw err;

			else callback(null, { "msg": "modificacion exitosa" });
			connection.release();
		});
	});
};


//eliminar un cliente pasando la id a eliminar
cliente.deleteCliente = function (id, callback) {
	var q = "SELECT * FROM clientes WHERE idCliente = ?";
	var par = [id]; //parametros

	DB.getConnection(function (err, connection) {
		connection.query(q, par, function (err, row) {
			//si existe la id del cliente a eliminar
			if (typeof row !== "undefined" && row.length > 0) {
				var qq = "DELETE FROM clientes WHERE idCliente = ?";
				DB.getConnection(function (err, connection) {
					connection.query(qq, par, function (err) {

						if (err) throw err;

						//devolvemos el última id insertada
						else callback(null, { "msg": "eliminado" });

						connection.release();
					});
				});

			}
			else callback(null, { "msg": "no existe el cliente" });

			connection.release();
		});
	});
};

//obtenemos un cliente por su id
cliente.obtenerIdCliente = function (uid, callback) {
	var q = "SELECT idCliente FROM clientes WHERE uid = ? ";
	var par = [uid]; //parametros

	DB.getConnection(function (err, connection) {
		connection.query(q, par, function (err, row) {

			if (err) throw err;

			else callback(null, row);

			connection.release();
		});

	});
};

cliente.Bloquear = function (id, callback) {

	var q = "SELECT * FROM clientes WHERE idCliente = ?";
	var par = [id]; //parametros

	DB.getConnection(function (err, connection) {
		connection.query(q, par, function (err, row) {
			//si existe la id del cliente a eliminar
			if (typeof row !== "undefined" && row.length > 0) {
				var bloqueado = !row[0].bloqueado ? 1 : row[0].bloqueado;
				var qq = "UPDATE clientes SET bloqueado = ? WHERE idCliente = ?";
				DB.getConnection(function (err, connection) {
					connection.query(qq, [bloqueado, id], function (err, row) {

						if (err) throw err;

						//devolvemos el última id insertada
						else callback(null, { "affectedRows": row.affectedRows });

						connection.release();
					});

				});

			}
			else callback(null, { "msg": "no existe el cliente" });

			connection.release();
		});


	});
};

cliente.Avatar = function (data, callback) {

	var q = "SELECT * FROM clientes WHERE idCliente = ?";

	DB.getConnection(function (err, connection) {
		connection.query(q, data[1], function (err, row) {
			//si existe la id del cliente a eliminar
			if (typeof row !== 'undefined' && row.length > 0) {
				var qq = 'UPDATE clientes SET foto = ? WHERE idCliente = ?';
				DB.getConnection(function (err, connection) {
					connection.query(qq, data, function (err, row) {
						if (err) throw err;

						else callback(null, { "affectedRows": row.affectedRows });

						connection.release();
					});


				});

			}
			else callback(null, { "msg": "no existe el cliente" });

			connection.release();
		});


	});
};


//exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = cliente;