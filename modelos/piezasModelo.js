const Mongo = require('./mongo.js');
const Connection = Mongo.connection;
const objectId = Mongo.objectId;

let pieza = {}

pieza.ObtenerTodos = callback => 
{
    Connection(db => {
        const collection = db.collection('piezas');
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


pieza.ObtenerPorModeloyUsuario = (modelo, cliente, callback) => 
{
    Connection(db => {
        const collection = db.collection('piezas');
        collection.aggregate([{
            $match: {
                'modelo': objectId(modelo),
                'cliente': cliente
            }
        }, { 
            $project : {
                modelo : 0 , 
                tipo : 0 
            } 
        }]).toArray((err, docs) => {
            if (err) throw err;
            callback(null, docs);
        });
    })
}


pieza.Guardar = (piezaData, callback) => 
{
    piezaData.modelo = objectId(piezaData.modelo);
    piezaData.tipo = objectId(piezaData.tipo);

    Connection(db => {
        const collection = db.collection('piezas');
        collection.insertOne(piezaData, (err, doc) => {
            if (err) callback(err);
            callback(null, {
                'insertId': doc.insertedId
            });
        });
    })
}



module.exports = pieza;