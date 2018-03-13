const Idioma = require('../modelos/idiomasModelo.js');

exports.ObtenerTodos = (req, res) =>
{
	Idioma.ObtenerTodos((err, data) => { 
		if (data.length > 0) {
			res.status(200).json(data);
		} else {
			res.status(404).json({'msg':'No hay idiomas en la base de datos'});
		}
	});
}

exports.Guardar = (req, res) =>
{
	const idiomaData = {
        codigo: req.body.codigo,
        nombre: req.body.nombre
    }

    Idioma.ObtenerPorCodigo(idiomaData.codigo, (err, data) => {
        if (data === null) {
            Idioma.Guardar(idiomaData, (err, data) => {
                if (typeof data !== 'undefined' && data.insertId) {
                    res.status(200).json(data);
                } else {
                    res.status(500).json({msg: 'Algo ocurrio'});
                }
            })
        } else {
            res.status(400).json({msg: 'Ya esiste el registro'});
        }
    })

}

exports.Actualizar = (req, res) =>
{
	const _id = req.body._id;
	const idiomaData = {
        codigo: req.body.codigo,
        nombre: req.body.nombre
    }

    Idioma.ObtenerPorCodigo(_id, (err, data) => {
        if (data === null) {
            Idioma.Actualizar(_id, idiomaData, (err, data) => {
                if (data !== null && data.affectedRow) {
                    res.status(200).json(data);
                } else {
                    res.status(500).json({'msg':'Algo ocurrio'});
                }
            })
        } else {
            res.status(404).json({msg: 'Ya esiste el registro'});
        }
    })
}

exports.Borrar = (req, res) => 
{
	const _id = req.body._id;

	Idioma.Borrar(_id, (err, data) => {
		if (data !== null && data.affectedRow) {
			res.status(200).json(data);
		} else {
			res.status(500).json({'msg':'Algo ocurrio'});
		}
	})
}