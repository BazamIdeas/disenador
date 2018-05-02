const Mongo = require('./mongo.js');
const Connection = Mongo.connection;
const objectId = Mongo.objectId;

let modelo = {}

modelo.ObtenerTodos = callback => 
{
    Connection(db => {
        const collection = db.collection('etiquetas');
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

modelo.ObtenerPorTipo = (_id, callback) => 
{
    Connection(db => {
        const collection = db.collection('modelos');
        collection.aggregate([{
            $match: {
                'tipo': objectId(_id)
            }
        }, {
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

module.exports = modelo;