var DB = require("./db.js");

//creamos un objeto para ir almacenando todo lo que necesitemos
var elemento = {};

elemento.datosElemento = function (id, callback) {
	var q = "SELECT * FROM elementos WHERE idElemento = ?";

	DB.getConnection(function (err, connection) {

		connection.query(q, id, function (err, rows) {

			if (err) throw err;

			else
				callback(null, rows);
			connection.release();
		});


	});
};


elemento.ListarFuentes = function (callback) {
	var q = "SELECT * FROM elementos WHERE tipo = \"FUENTE\" ORDER BY RAND() LIMIT 100";

	DB.getConnection(function (err, connection) {

		connection.query(q, function (err, rows) {

			if (err) throw err;

			else
				callback(null, rows);
			connection.release();
		});

	});
};


elemento.getElementsByTags = function (tags, idCat, limit, callback) {

	var q = "SELECT * FROM elementos WHERE elementos.idElemento IN (?) "; 
	
	var par = [tags, limit]

	if (idCat > 0) {
		par.splice(1, 0, idCat);
		q = q + "AND elementos.categorias_idCategoria = ? ";
	}

	q = q + "ORDER BY elementos.idElemento LIMIT ?";

	DB.getConnection(function (err, connection) {

		connection.query(q, par, function (err, rows) {

			if (err) throw err;

			else
				callback(null, rows);
			connection.release();
		});


	});
};


elemento.getElementos = function (datos, callback) {
	var q = "SELECT * FROM elementos INNER JOIN elementos_has_preferencias ON elementos_has_preferencias.elementos_idElemento = elementos.idElemento WHERE elementos_has_preferencias.preferencias_idPreferencia = ? AND elementos_has_preferencias.valor = ? AND elementos.categorias_idCategoria = ? AND elementos.tipo = ? GROUP BY idElemento ORDER BY RAND() LIMIT ?";

	DB.getConnection(function (err, connection) { //cmienzo del for

		connection.query(q, datos, function (err, rows) {

			if (err) throw err;

			else
				callback(null, rows);
			connection.release();
		});


	});
};

elemento.getElementosIncat = function (datos, callback) {


	var q = "SELECT * FROM elementos  WHERE ";
	
	if (datos[0] > 0) {
		q = q + "elementos.categorias_idCategoria = ? ";
	} else {
		q = q + "elementos.categorias_idCategoria != ? ";
	}
	
	q = q + "AND elementos.tipo = ? GROUP BY idElemento ORDER BY RAND() LIMIT ?";

	DB.getConnection(function (err, connection) { //cmienzo del for

		connection.query(q, datos, function (err, rows) {

			if (err) throw err;

			else
				callback(null, rows);
			connection.release();
		});


	});
};


elemento.getElementosCat = function (datos, callback) {
	var q = "SELECT * FROM elementos  WHERE elementos.categorias_idCategoria = ? AND elementos.tipo = ? GROUP BY idElemento";

	DB.getConnection(function (err, connection) { //cmienzo del for

		connection.query(q, datos, function (err, rows) {

			if (err) throw err;

			else
				callback(null, rows);
			connection.release();
		});


	});
};

elemento.getIniciales = function (datos, callback) {
	var q = "SELECT * FROM elementos INNER JOIN categorias ON idCategoria = categorias_idCategoria  WHERE nombreCategoria = ? AND elementos.nombre = ? GROUP BY idElemento ORDER BY RAND() LIMIT 12";

	DB.getConnection(function (err, connection) { //cmienzo del for

		connection.query(q, datos, function (err, rows) {

			if (err) throw err;

			else
				callback(null, rows);
			connection.release();
		});
	});
};

// insertar  te quedaste aqui
elemento.insertElemento = function (datos, callback) {
	var q = "INSERT INTO elementos SET ? ";
	var elemen = datos; //parametros

	DB.getConnection(function (err, connection) {
		connection.query(q, elemen, function (err, result) {

			if (err) throw err;

			//devolvemos la última id insertada
			else callback(null, {
				"insertId": result.insertId
			});
			connection.release();
		});


	});
};
elemento.getElementosInpref = function (datos, callback) {
	var q = "INSERT INTO elementos_has_preferencias SET ? ";
	var elePrefer = datos;

	DB.getConnection(function (err, connection) {


		connection.query(q, elePrefer, function (err, result) {

			if (err) throw err;

			else
				callback(null, {
					"insertId": result.insertId
				});

			connection.release();
		});


	});
};

elemento.ModificarPreferencias = function (datos, callback) {
	var q = "UPDATE elementos_has_preferencias SET valor = ? WHERE elementos_idElemento = ? AND preferencias_idPreferencia = ?";
	var elePrefer = datos;

	DB.getConnection(function (err, connection) {


		connection.query(q, elePrefer, function (err, result) {

			if (err) throw err;

			else
				callback(null, {
					"affectedRows": result.affectedRows
				});

			connection.release();
		});


	});
};

elemento.insertFuente = function (datos, callback) {
	var q = "INSERT INTO elementos SET ? ";
	var fuen = datos; //parametros

	DB.getConnection(function (err, connection) {
		connection.query(q, fuen, function (err, result) {

			if (err) throw err;

			//devolvemos la última id insertada
			else callback(null, {
				"insertId": result.insertId
			});
			connection.release();
		});


	});
};

elemento.cambiarEstado = function (data, callback) {
	var q = "UPDATE elementos SET comprado = ? WHERE idElemento = ?";
	var par = data; //parametros

	DB.getConnection(function (err, connection) {
		connection.query(q, par, function (err) {

			if (err) throw err;

			else callback(null, {
				"msg": "modificacion exitosa"
			});
			connection.release();
		});


	});
};

elemento.datosElementoPorLogo = function (idLogo, callback) {
	var q = 'SELECT elementos.* FROM elementos INNER JOIN logos ON elementos.idElemento = logos.elementos_idElemento WHERE logos.idLogo = ?';

	DB.getConnection(function (err, connection) {

		connection.query(q, idLogo, function (err, rows) {

			if (err) throw err;

			else
				callback(null, rows);
			connection.release();
		});


	});
}

//exportamos el objeto para tenerlo disponible en la zona de rutas*/
module.exports = elemento;