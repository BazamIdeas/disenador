var Modelo = require('../modelos/modelosModelo.js');

exports.ObtenerTodos = (req, res) =>
{
	Modelo.ObtenerTodos((err, data) => { 
		if (data.length > 0) {
			res.status(200).json(data);
		} else {
			res.status(404).json({'msg':'No hay modelos en la base de datos'});
		}
	});
}

exports.ObtenerPorTipo = (req, res) => 
{
	const id = req.params.id;

	Modelo.ObtenerPorTipo(id, (err, data) => {
		if (data.length > 0) {
			res.status(200).json(data);
		} else {
			res.status(404).json({
				'msg': 'No hay modelos en la base de datos'
			});
		}
	})
}