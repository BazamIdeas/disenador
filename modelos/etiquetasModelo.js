const Mongo = require('./mongo.js');
const ObjectId = require('mongodb').ObjectID;

let etiqueta = {}

etiqueta.ObtenerTodos = (callback) => {
    Mongo.connection((db) => {
        const collection = db.collection('etiquetas');
        collection.aggregate([{ 
            $unwind: '$traducciones' 
        },{
            $lookup: {
                from: 'idiomas',
                localField: 'traducciones.idioma',
                foreignField: '_id',
                as: 'idioma'
            }
        },{
            $group: {
                _id: '$_id',
                traducciones: { 
					$push: { 
						idioma: '$idioma', 
						valor: '$traducciones.valor' 
					} 
				}
            }
        }]).toArray((err, docs) => {
            if (err) throw err;
            callback(null, docs);
        });
    })
}

etiqueta.ObtenerPorIcono = (id, callback) => {
    Mongo.connection((db) => {
        const collection = db.collection('etiquetas');
        collection.aggregate([{
            $match: { 'iconos': id }
        },{
            $lookup: {
                from: 'idiomas',
                localField: 'traducciones.idioma',
                foreignField: '_id',
                as: 'idioma'
            }
        },{ 
            $unwind: '$idioma' 
        }]).toArray((err, docs) => {
            if (err) throw err;
            callback(null, docs);
        });
    })
}

etiqueta.Guardar = (etiquetaData, callback) => {
    etiquetaData.traducciones.forEach((traduccion, key) => {
        etiquetaData.traducciones[key].idioma = new ObjectId(traduccion.idioma);
    })

    Mongo.connection((db) => {
        const collection = db.collection('etiquetas');
        collection.insertOne(etiquetaData, (err, doc) => {
            if (err) throw err;
            callback(null, { 'insertId': doc.insertedId });
        });
    })
}

etiqueta.Actualizar = (_id, etiquetaData, callback) => {
    Mongo.connection((db) => {
        const collection = db.collection('etiquetas');
        collection.findOneAndUpdate({ '_id': new ObjectId(_id) }, { $set: etiquetaData }, (err, doc) => {
            if (err) throw err;
            callback(null, { 'affectedRow': doc.value });
        });
    })
}

etiqueta.AsignarIconos = (_id, iconos, callback) => {
    Mongo.connection((db) => {
        const collection = db.collection('etiquetas');
        collection.findOneAndUpdate({ '_id': new ObjectId(_id) }, {
            $addToSet: {
                'iconos': {
                    $each: iconos
                }
            }
        }, (err, doc) => {
            if (err) throw err;
            callback(null, { 'affectedRow': doc.value });
        });
    })
}

etiqueta.DesasignarIcono = (_id, icono, callback) => {
    Mongo.connection((db) => {
        const collection = db.collection('etiquetas');
        collection.findOneAndUpdate({ '_id': new ObjectId(_id) }, {
            $pull: {
                'iconos': icono
            }
        }, (err, doc) => {
            if (err) throw err;
            callback(null, { 'affectedRow': doc.value });
        });
    })
}

etiqueta.Borrar = (id, callback) => {
    Mongo.connection((db) => {
        const collection = db.collection('etiquetas');
        collection.findOneAndDelete({ '_id': new ObjectId(id) }, (err, doc) => {
            if (err) throw err;
            callback(null, { 'affectedRow': doc.value });
        });
    })
}

etiqueta.Analizar = (tags, callback) =>
{
	let iconos = [];

	Mongo.connection((db) => {
		const collection = db.collection('etiquetas');
		collection.aggregate([{ 
            $unwind: '$traducciones' 
        },{
			$match: { 
				'traducciones.valor': { '$in': tags } 
			}
		},{
			$addFields: { valor: '$traducciones.valor' }
		},{
			$project: { traducciones: false }
		}]).toArray((err, docs) => {
			if (err) throw err;

			else {

				docs.forEach((doc) => doc.iconos.forEach((i) => iconos.push(i) ) )
			
				Array.prototype.unique = function(a) { 
                    return function() { 
                        return this.filter(a) 
                    }
				}(function(a, b, c) { return c.indexOf(a, b+1) < 0 })

				iconos = iconos.unique();

				callback(null, iconos);
			}
		})
	})
}

module.exports = etiqueta;