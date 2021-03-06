var DB = require('./db.js');

//creamos un objeto para ir almacenando todo lo que necesitemos
var pedido = {};


//obtenemos todos los pedidos
pedido.getPedidos = function (callback) {
	var q = 'SELECT idPedido, fecha, pedidos.estado, precio, moneda, pedidos.impuesto, pedidos.descuento, pedidos.iso, plan, pasarela, idLogo, logo, nombreCategoria, idCliente, nombreCliente, correo, telefono, pais FROM pedidos INNER JOIN logos on logos_idLogo = idLogo INNER JOIN clientes on clientes_idCliente = idCliente INNER JOIN categorias on categorias_idCategoria = idCategoria INNER JOIN precios on precios_idPrecio = idPrecio INNER JOIN planes on planes_idPlan = idPlan INNER JOIN pasarelas ON pasarelas_idPasarela = idPasarela  INNER JOIN monedas ON monedas_idMoneda = idMoneda ORDER BY idPedido'

	DB.getConnection(function (err, connection) {
		connection.query(q, function (err, rows) {

			if (err) throw err;

			else callback(null, rows);

			connection.release();

		});


	});
}

pedido.ListarPorPais = function (iso, callback) {
	var q = 'SELECT idPedido, fecha, pedidos.estado, precio, moneda, pedidos.impuesto, pedidos.descuento, pedidos.iso, plan, pasarela, idLogo, logo, nombreCategoria, idCliente, nombreCliente, correo, telefono, pais FROM pedidos INNER JOIN logos on logos_idLogo = idLogo INNER JOIN clientes on clientes_idCliente = idCliente INNER JOIN  categorias on categorias_idCategoria = idCategoria INNER JOIN precios on precios_idPrecio = idPrecio INNER JOIN planes on planes_idPlan = idPlan  INNER JOIN pasarelas ON pasarelas_idPasarela = idPasarela INNER JOIN monedas ON monedas_idMoneda = idMoneda WHERE pedidos.iso = ? ORDER BY idPedido'

	DB.getConnection(function (err, connection) {
		connection.query(q, [iso], function (err, rows) {

			if (err) throw err;

			else callback(null, rows);

			connection.release();

		});


	});
}

//obtenemos un pedido por su id
pedido.getPedido = function (id, callback) {
	var q = `SELECT idPedido, fecha, pedidos.estado, precio, moneda, pedidos.impuesto, pedidos.descuento, pedidos.iso, plan, pasarela, idLogo, logo, nombreCategoria, idCliente, nombreCliente, correo, telefono, pais 
				FROM pedidos 
				INNER JOIN logos ON logos_idLogo = idLogo 
				INNER JOIN clientes ON clientes_idCliente = idCliente 
				INNER JOIN categorias ON categorias_idCategoria = idCategoria 
				INNER JOIN precios ON precios_idPrecio = idPrecio 
				INNER JOIN planes ON planes_idPlan = idPlan   
				INNER JOIN pasarelas ON pasarelas_idPasarela = idPasarela 
				INNER JOIN monedas ON monedas_idMoneda = idMoneda
				WHERE idPedido = ?`;

	var par = [id] //parametros

	DB.getConnection(function (err, connection) {
		connection.query(q, par, function (err, row) {

			if (err) throw err;

			else callback(null, row);

			connection.release();

		});


	});
}

//obtenemos los pedidos por id del cliente
pedido.getPedidosCliente = function (id, callback) {
	var q = 'SELECT idPedido, fecha, pedidos.estado, precio, moneda, pedidos.impuesto, pedidos.descuento, pedidos.iso, plan, pasarela, idLogo, logo, nombreCategoria, idCliente, nombreCliente, correo, telefono, pais FROM pedidos INNER JOIN logos on logos_idLogo = idLogo INNER JOIN clientes on clientes_idCliente = idCliente INNER JOIN  categorias on categorias_idCategoria = idCategoria INNER JOIN precios on precios_idPrecio = idPrecio INNER JOIN planes on planes_idPlan = idPlan INNER JOIN pasarelas ON pasarelas_idPasarela = idPasarela INNER JOIN monedas ON monedas_idMoneda = idMoneda WHERE idCliente = ? ORDER BY idPedido DESC'
	var par = [id] //parametros

	DB.getConnection(function (err, connection) {
		connection.query(q, par, function (err, rows) {

			if (err) throw err;

			else callback(null, rows);

			connection.release();

		});
	});
}


//añadir un nuevo pedido
pedido.insertPedido = function (pedidoData, callback) {
	var q = 'INSERT INTO pedidos SET ? '
	var par = pedidoData //parametros

	DB.getConnection(function (err, connection) {
		connection.query(q, par, function (err, result) {

			if (err) throw err;

			//devolvemos la última id insertada
			else callback(null, {
				"insertId": result.insertId
			});

			connection.release();

		});


	});
}

//actualizar un pedido
pedido.updatePedido = function (pedidoData, callback) {
	var q = 'UPDATE pedidos SET fecha = ?, estado = ? WHERE idPedido = ?';
	var par = pedidoData //parametros

	DB.getConnection(function (err, connection) {
		connection.query(q, par, function (err) {

			if (err) throw err;

			else callback(null, {
				"msg": "modificacion exitosa"
			});

			connection.release();

		});


	});
}

//actualizar estado del pedido
pedido.cambiarEstado = function (pedidoData, callback) {
	var q = 'UPDATE pedidos SET estado = ? WHERE idPedido = ?';
	var par = pedidoData //parametros

	DB.getConnection(function (err, connection) {
		connection.query(q, par, function (err) {

			if (err) throw err;

			else callback(null, {
				"msg": "modificacion exitosa"
			});

			connection.release();

		});

	});
}


//eliminar un pedido pasando la id a eliminar
pedido.deletePedido = function (id, callback) {
	var q = 'SELECT * FROM pedidos WHERE idPedido = ?';
	var par = [id] //parametros

	DB.getConnection(function (err, connection) {
		connection.query(q, par, function (err, row) {
			//si existe la id del pedido a eliminar
			if (row !== 'undefined' && row.length > 0) {
				var qq = 'DELETE FROM pedidos WHERE idPedido = ?';
				DB.getConnection(function (err, connection) {
					connection.query(qq, par, function (err, row) {

						if (err) throw err;

						else callback(null, {
							"msg": "eliminado"
						});

						connection.release();
					});


				});

			} else callback(null, {
				"msg": "no existe el pedido"
			});

			connection.release();
		});


	});
}


pedido.ObtenerPlanPorIDdeLogo = function (idLogo, callback) {

	var q = `SELECT planes.* 
				FROM logos 
				INNER JOIN pedidos ON logos.idLogo = pedidos.logos_idLogo
				INNER JOIN precios ON pedidos.precios_idPrecio = precios.idPrecio
				INNER JOIN planes ON precios.Planes_idPlan = planes.idPlan
				WHERE logos.idLogo = ? AND logos.estado = 'Descargable' 
				AND pedidos.estado = 'COMPLETADO'`;

	var par = [idLogo];

	DB.getConnection(function (err, connection) {
		connection.query(q, par, function (err, row) {
			if (row !== 'undefined' && row.length > 0) {


				callback(null, row)

			} else {

				callback(null, {
					"msg": "no existe el logo, pedido, precio o plan"
				});

			}

			connection.release();
		})
	})
}

pedido.ObtenerPrecioViejoPorIDdeLogo = function (idLogo, idPedido, callback) {

	var q = `SELECT precios.*, pedidos.idPedido
				FROM precios 
				INNER JOIN pedidos ON precios.idPrecio = pedidos.precios_idPrecio
				WHERE pedidos.idPedido NOT IN (?) AND pedidos.logos_idLogo = ? AND pedidos.estado = 'COMPLETADO'`;

	var par = [idPedido, idLogo];

	DB.getConnection(function (err, connection) {
		connection.query(q, par, function (err, row) {
			if (row !== undefined && row.length > 0) {

				callback(null, row)

			} else {

				callback(null, {
					"msg": "no existe el logo, pedido, precio o plan"
				});

			}

			connection.release();
		})
	})
}

//exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = pedido;