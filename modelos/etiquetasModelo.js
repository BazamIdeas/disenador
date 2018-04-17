const Mongo = require('./mongo.js');
const Connection = Mongo.connection;
const objectId = Mongo.objectId;

let etiqueta = {}

etiqueta.ObtenerTodos = callback => 
{
    Connection(db => {
        const collection = db.collection('etiquetas');
        collection.aggregate([{
            $unwind: '$traducciones'
        }, {
            $lookup: {
                from: 'idiomas',
                localField: 'traducciones.idioma',
                foreignField: '_id',
                as: 'idioma'
            }
        }, {
            $unwind: '$idioma'
        }, {
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

etiqueta.ObtenerPorIcono = (id, callback) => 
{
    Connection(db => {
        const collection = db.collection('etiquetas');
        collection.aggregate([{
            $match: {
                'iconos': +id
            }
        }, {
            $lookup: {
                from: 'idiomas',
                localField: 'traducciones.idioma',
                foreignField: '_id',
                as: 'idioma'
            }
        }, {
            $unwind: '$idioma'
        }]).toArray((err, docs) => {
            if (err) throw err;
            callback(null, docs);
        });
    })
}

etiqueta.Guardar = (etiquetaData, callback) => 
{
    etiquetaData.traducciones.forEach((traduccion, key) => {
        etiquetaData.traducciones[key].idioma = objectId(traduccion.idioma);
    })

    Connection(db => {
        const collection = db.collection('etiquetas');
        collection.insertOne(etiquetaData, (err, doc) => {
            if (err) throw err;
            callback(null, {
                'insertId': doc.insertedId
            });
        });
    })
}

etiqueta.Actualizar = (_id, etiquetaData, callback) => 
{
    delete etiquetaData._id;

    etiquetaData.traducciones.forEach((el, key) => {
        delete etiquetaData.traducciones[key].codigo;
        delete etiquetaData.traducciones[key].nombre;

        etiquetaData.traducciones[key]._id = objectId(etiquetaData.traducciones[key]._id);
    })

    Connection(db => {
        const collection = db.collection('etiquetas');
        collection.findOneAndUpdate({
            '_id': objectId(_id)
        }, {
            $set: {
                traducciones: etiquetaData.traducciones
            }
        }, (err, doc) => {
            if (err) throw err;
            callback(null, {
                'affectedRow': doc.value
            });
        });
    })
}

etiqueta.AsignarIconos = (_id, iconos, callback) => 
{
    Connection(db => {
        const collection = db.collection('etiquetas');
        collection.findOneAndUpdate({
            '_id': objectId(_id)
        }, {
            $addToSet: {
                'iconos': {
                    $each: iconos
                }
            }
        }, (err, doc) => {
            if (err) throw err;
            callback(null, {
                'affectedRow': doc.value
            });
        });
    })
}

etiqueta.DesasignarIcono = (_id, icono, callback) => 
{
    Connection(db => {
        const collection = db.collection('etiquetas');
        collection.findOneAndUpdate({
            '_id': objectId(_id)
        }, {
            $pull: {
                'iconos': icono
            }
        }, {
            multi: true,
        }, (err, doc) => {
            if (err) throw err;
            callback(null, {
                'affectedRow': doc.value
            });
        });
    })
}

etiqueta.Borrar = (_id, callback) => 
{
    Connection(db => {
        const collection = db.collection('etiquetas');
        collection.findOneAndDelete({
            '_id': objectId(_id)
        }, (err, doc) => {
            if (err) throw err;
            callback(null, {
                'affectedRow': doc.value
            });
        });
    })
}

etiqueta.Analizar = (tags, callback) => 
{
    let iconos = [];

    Connection(db => {
        const collection = db.collection('etiquetas');
        collection.aggregate([{
            $unwind: '$traducciones'
        }, {
            $match: {
                'traducciones.valor': {
                    '$in': tags
                }
            }
        }, {
            $addFields: {
                valor: '$traducciones.valor'
            }
        }, {
            $project: {
                traducciones: false
            }
        }]).toArray((err, docs) => {
            if (err) throw err;

            else {

                docs.forEach(doc => doc.iconos.forEach(i => iconos.push(i)))

                Array.prototype.sortByFrequency = function() {
                    return function () {
                        var frequency = {};
                    
                        this.forEach(function(value) { frequency[value] = 0; });
                    
                        var uniques = this.filter(function(value) {
                            return ++frequency[value] == 1;
                        });
                    
                        return uniques.sort(function(a, b) {
                            return frequency[b] - frequency[a];
                        });
                    }
                }();

                /*Array.prototype.unique = function (a) {
                    return function () {
                        return this.filter(a)
                    }
                }((a, b, c) => c.indexOf(a, b + 1) < 0)*/

                callback(null, iconos.sortByFrequency());
            }
        })
    })
}

module.exports = etiqueta;