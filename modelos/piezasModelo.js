//const Connection = global.__MongoClient;
const objectId = require('./mongo.js').objectId;

let pieza = {}

pieza.ObtenerTodos = callback => 
{
    __mongoClient(db => {
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
    __mongoClient(db => {
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

pieza.ObtenerPorModeloyLogo = (modelo, logo, callback) => 
{
    __mongoClient(db => {
        const collection = db.collection('piezas');
        collection.aggregate([{
            $match: {
                'modelo': objectId(modelo),
                'logo': logo
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
    
    __mongoClient(db => {

        const collection = db.collection('piezas');

        if (piezaData._id) {

            collection.findOneAndUpdate({
                '_id': objectId(piezaData._id),
                'cliente': piezaData.cliente
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

            piezaData = {
                caras: piezaData.caras,
                nombre: piezaData.nombre,
                modelo: piezaData.modelo,
                tipo: piezaData.tipo,
                logo: piezaData.logo,
                cliente: piezaData.cliente
            };

            collection.insertOne(piezaData, (err, doc) => {
                if (err) callback(err);
                callback(null, {
                    'insertId': doc.ops[0]
                });
            });
        }
        
    })
}


pieza.Borrar = (_id, cliente, callback) => 
{
    __mongoClient(db => {
        const collection = db.collection('piezas');
        collection.findOneAndDelete({
            '_id': objectId(_id),
            'cliente': cliente
        }, (err, doc) => {
            if (err) callback(err);
            callback(null, {
                'affectedRow': doc.value
            });
        });
    })
}



module.exports = pieza;