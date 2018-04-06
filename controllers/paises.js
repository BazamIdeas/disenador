var pais = require("../modelos/paisesModelo.js");

exports.Listar = (req, res) => {
	pais.Listar((error, data) => {

		if (typeof data !== "undefined" && data.length > 0) {
			res.status(200).json(data);
		} else {
			res.status(404).json({ "msg": "No hay resgitro de pais en la base de datos" });
		}
	});

};

exports.ListarMonedas = (req, res) => {
	var id = req.params.id;

	pais.ListarMonedas(id, (error, data) => {

		if (typeof data !== "undefined" && data.length > 0) {
			res.status(200).json(data);
		} else {
			res.status(404).json({ "msg": "No hay resgitro de monedas para este pais en la base de datos" });
		}
	});
};

exports.ListarPlanes = (req, res) => {
	var iso = req.params.iso;

	pais.ListarPlanes(iso, (error, data) => {

		if (typeof data !== "undefined" && data.length > 0) {
			res.status(200).json(data);
		} else {
			res.status(404).json({ "msg": "No hay resgitro de planes para este pais en la base de datos" });
		}
	});
};

exports.Obtener = (req, res) => {
	var iso = "AR";

	pais.Obtener(iso, (error, data) => {

		if (typeof data !== "undefined" && data.length > 0) {
			res.status(200).json(data[0]);
		} else {
			res.status(500).json({ "msg": "Algo ocurrio" });
		}
	});
};

exports.Nuevo = (req, res) => {
	//creamos un objeto con los datos a insertar del cliente
	var paisData = {
		iso: req.body.iso,
		nombre: req.body.nombre,
		impuesto: req.body.impuesto
	};


	pais.Nuevo(paisData, (error, p) => {

		if (p && p.insertId) {

			var id = p.insertId;

			var paisMoneda = {
				paises_idPais: id,
				monedas_idMoneda: req.body.idMoneda,
				principal: 1
			};

			pais.AsignarMoneda(paisMoneda, (error) => {

				if (!error) {

					pais.AsignarDolar(id, (error) => {

						if (!error) {

							res.status(200).json({ "insertId": id });

						} else {

							res.status(500).json({ "msg": "Algo ocurrio 1" });

						}

					});

				} else {

					res.status(500).json({ "msg": "Algo ocurrio 2" });

				}
			});

		} else {
			res.status(500).json({ "msg": "Algo ocurrio 3" });
		}
	});
};

exports.Modificar = (req, res) => {
	var id = req.body.idPais; // cambiar por valor de sesion o por parametro

	pais.ObtenerPorId(id, (error, data) => {

		if (typeof data !== "undefined" && data.length > 0) {

			var paisData = [req.body.impuesto, req.body.idPais];

			pais.Modificar(paisData, (error, data) => {

				if (data) {
					res.status(200).json(data);
				} else {
					res.status(500).json({ "msg": "Algo ocurrio" });
				}
			});
			//console.log(paisData);
		} else {
			res.status(404).json({ "msg": "No existe" });
		}
	});
};


exports.AsignarMoneda = (req, res) => {
	var paisMoneda = {
		paises_idPais: req.body.idPais,
		monedas_idMoneda: req.body.idMoneda
	};

	pais.AsignarMoneda(paisMoneda, (error, data) => {

		if (data && data.insertId) {
			res.status(200).json(data);
		} else {
			res.status(500).json({ "msg": "Algo ocurrio" });
		}
	});
};

exports.DesasignarMoneda = (req, res) => {
	var paisMoneda = {
		paises_idPais: req.body.idPais,
		monedas_idMoneda: req.body.idMoneda
	};

	pais.DesasignarMoneda(paisMoneda, (error, data) => {

		if (data) {
			res.status(200).json(data);
		} else {
			res.status(500).json({ "msg": data });
		}

	});
};



exports.Borrar = (req, res) => {
	var id = req.params.id;

	pais.Borrar(id, (error, data) => {
		res.status(200).json(data);
	});

};