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

pieza.ObtenerPorIDyUsuario = (_id, cliente, callback) => 
{
    Connection(db => {
        const collection = db.collection('piezas');
        collection.aggregate([{
            $match: {
                '_id': objectId(_id),
                'cliente': cliente
            }
        }, {
            $lookup: {
                from: 'modelos',
                localField: 'modelo',
                foreignField: '_id',
                as: 'modelo'
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

        collection.count({
            '_id': objectId(piezaData._id),
            'cliente': cliente
        }, (err, count) => {
            if (count) {

                collection.findOneAndUpdate({
                    '_id': objectId(piezaData._id)
                }, {
                    $set: {
                        caras: piezaData.caras,
                        nombre: piezaData.nombre,
                        modelo: piezaData.modelo,
                        tipo: piezaData.tipo
                    }
                }, (err, doc) => {
                    if (err) throw err;
                    callback(null, {
                        'affectedRow': doc.value
                    });
                });

            } else {

                delete piezaData._id;
            
                collection.insertOne(piezaData, (err, doc) => {
                    if (err) callback(err);
                    callback(null, {
                        'insertId': doc.insertedId
                    });
                });

            } 
        })
        
    })
}


pieza.Borrar = (_id, cliente, callback) => 
{
    Connection(db => {
        const collection = db.collection('piezas');
        collection.findOneAndDelete({
            '_id': objectId(_id),
            'cliente': cliente
        }, (err, doc) => {
            if (err) throw err;
            callback(null, {
                'affectedRow': doc.value
            });
        });
    })
}



module.exports = pieza;