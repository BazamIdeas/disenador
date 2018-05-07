const Mongo = require('./mongo.js');
const Connection = Mongo.connection;
const objectId = Mongo.objectId;

let modelo = {}

modelo.ObtenerTodos = callback => 
{
    Connection(db => {
        const collection = db.collection('modelos');
        collection.aggregate([{
            $lookup: {
                from: 'tipos',
                localField: 'tipo',
                foreignField: '_id',
                as: 'tipo'
            }
        }]).toArray((err, docs) => {
            if (err) throw err;
            callback(null, docs);
        });
    })
}

modelo.ObtenerPorNombreyTipo = (nombre, tipo, callback) => 
{
    Connection(db => {
        const collection = db.collection('modelos');
        collection.aggregate([{
            $match: {
                'nombre': nombre
            }
        }, {
            $lookup: {
                from: 'tipos',
                localField: 'tipo',
                foreignField: '_id',
                as: 'tipo'
            }
        }, {
            $match: {
                'tipo.tipo': tipo
            }
        }]).toArray((err, docs) => {
            if (err) throw err;
            callback(null, docs);
        });
    })
}


modelo.ObtenerPorTipo = (_id, callback) => 
{
    Connection(db => {
        const collection = db.collection('modelos');
        collection.aggregate([{
            $match: {
                'tipo': objectId(_id)
            }
        }, { 
            $project : { 
                tipo : 0 
            } 
        }]).toArray((err, docs) => {
            if (err) throw err;
            callback(null, docs);
        });
    })
}

module.exports = modelo;