const Pieza = require('../modelos/piezasModelo.js');
const Modelo = require('../modelos/modelosModelo.js');
const Tipo = require('../modelos/tiposModelo.js');
const async = require("async");

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

exports.ObtenerTodoPorUsuario = (req, res) =>
{
	Tipo.ObtenerTodos((err, tipos) => { 
		if (tipos.length) {
            
            async.forEachOf(tipos, (tipo, keyTipo, callback) => {

                Modelo.ObtenerPorTipo(tipo._id, (err, modelos) => {
                    
                    if (modelos.length) {

                        async.forEachOf(modelos, (modelo, keyModelo, callback) => {

                            Pieza.ObtenerPorModeloyUsuario(modelo._id, req.idCliente, (err, piezas) => {
                                if (piezas.length) {

                                    delete modelos[keyModelo]._id;
                                    modelos[keyModelo].piezas = piezas;
                                    callback();

                                } else {
                                    callback();
                                }
                            })

                        }, (err) => {

                            delete tipos[keyTipo]._id;
                            tipos[keyTipo].modelos = modelos;
                            callback()

                        })

                    } else {
                        callback();
                    }
                })

            }, (err) => {

                res.status(200).json(tipos);

            })

		} else {
			res.status(404).json({'msg':'No hay modelos en la base de datos'});
		}
	})
}


exports.ObtenerPiezaPorUsuario = (req, res) =>
{
    const _id = req.params._id

    Pieza.ObtenerPorIDyUsuario(_id, req.idCliente, (err, piezas) => {
        if (piezas.length) {
            res.status(200).json(piezas[0]);
        } else {
            res.status(404).json({'msg':'No hay piezas en la base de datos'});
        }
    })
}

exports.Guardar = (req, res) => 
{
	const tipo = req.body.tipo;
	const modelo = req.body.modelo;
	const pieza = req.body.pieza;
	pieza.cliente = req.idCliente;

	Modelo.ObtenerPorNombreyTipo(modelo, tipo, (err, data) => {

		if (data.length) {
            
            pieza.modelo = data[0]._id
            pieza.tipo = data[0].tipo[0]._id

            Pieza.Guardar(pieza, (err, data) => {
                if (typeof data !== 'undefined' && data.insertId) {
					res.status(200).json({
                        insertId: data.insertId
                    });
				} else {
					res.status(500).json({
                        'msg': 'Hubo un error'
                    });
				}
            })

		} else {
			res.status(404).json({
				'msg': 'No hay modelos en la base de datos'
			});
		}
	})
}