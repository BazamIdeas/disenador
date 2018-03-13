const Etiqueta = require('../modelos/etiquetasModelo.js');
const Idioma = require('../modelos/idiomasModelo.js');
const async = require('async');

exports.ObtenerTodos = (req, res) =>
{
	Etiqueta.ObtenerTodos((error, data) => { 
		if (data.length > 0) {
			res.status(200).json(data);
		} else {
			res.status(404).json({'msg':'No hay etiquetas en la base de datos'});
		}
	});
}

exports.GuardarEtiquetas = (req, res) =>
{
	const etiquetas = req.body.etiquetas;
	
	let insertIds = [];

	//Itera cada etiqueta
	async.forEachOf(etiquetas, (etiqueta, keyEtiqueta, callback) => {

		//Itera las traducciones de la etiqueta actual
		async.forEachOf(etiqueta.traducciones, (traduccion, keyTraduccion, callback) => {

			//Obtiene el idioma de la traduccion actual
			Idioma.ObtenerPorCodigo(traduccion.idioma, (err, data) => {
				if (data !== null) {
					//Sobreescribe el campo idioma de la etiqueta actual
					etiquetas[keyEtiqueta].traducciones[keyTraduccion].idioma = data._id;
					callback();
				
				} else {
					return callback({msg: "No existe el idioma"});
				}
			})
		}, err => { //Fin de each para las traducciones

			if (err) return callback(err);

			let etiquetaData = etiquetas[keyEtiqueta];
			etiquetaData.iconos = [];
	
			//Guardamos la etiqueta sobreescrita despues que termine el loop de sus traducciones
			Etiqueta.Guardar(etiquetaData, (err, data) => {
				if (typeof data !== 'undefined' && data.insertId) {
					insertIds.push(data.insertId);
					callback();
				} else {
					return callback(err);
				}
			})
		})

	}, err => { //Fin de each para las etiquetas

		if (err) {
			res.status(500).json(err);
		}else{
			res.status(200).json(insertIds);
		}

	})

}

exports.Actualizar = (req, res) =>
{
	const _id = req.body._id;
	const etiquetaData = req.body.etiqueta;

	Etiqueta.Actualizar(_id, etiquetaData, (err, data) => {
		if (typeof data !== 'undefined' && data.affectedRow) {
			res.status(200).json(data);
		} else {
			res.status(500).json({'msg':'Algo ocurrio'});
		}
	})
};

exports.AsignarIconos = (req, res) => 
{
	const _ids = req.body._ids;
	const idsIconos = req.body.iconos;

	let affectedRows = [];

	async.forEachOf(_ids, (id, key, callback) => {

		Etiqueta.AsignarIconos(id, idsIconos, (err, data) => {
			if (typeof data !== 'undefined' && data.affectedRow) {
				affectedRows.push(data.affectedRow);
				callback();
			} else {
				return callback(err);
			}
		})

	}, err => {
		if (err) res.status(500).json({'msg':'Algo ocurrio'});

		res.status(200).json(affectedRows);
	})
}

exports.DesasignarIcono = (req, res) => 
{
	const _id = req.body._id;
	const idIcono = req.body.idIcono;

	Etiqueta.DesasignarIcono(_id, idIcono, (err, data) => {
		if (typeof data !== 'undefined' && data.affectedRow) {
			res.status(200).json(data);
		} else {
			res.status(500).json({'msg':'Algo ocurrio'});
		}
	})
}

exports.Borrar = (req, res) => 
{
	const _id = req.body._id;

	Etiqueta.Borrar(_id, (err, data) => {
		if (typeof data !== 'undefined' && data.affectedRow) {
			res.status(200).json(data);
		} else {
			res.status(500).json({'msg':'Algo ocurrio'});
		}
	})
}