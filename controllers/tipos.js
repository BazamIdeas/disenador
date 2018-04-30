const Tipo = require('../modelos/tiposModelo.js');

exports.ObtenerTodos = (req, res) =>
{
	Tipo.ObtenerTodos((err, data) => { 
		if (data.length > 0) {
			res.status(200).json(data);
		} else {
			res.status(404).json({'msg':'No hay tipos en la base de datos'});
		}
	});
}