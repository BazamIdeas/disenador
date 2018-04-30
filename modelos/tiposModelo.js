const Mongo = require('./mongo.js');
const Connection = Mongo.connection;
const objectId = Mongo.objectId;

let tipo = {}

tipo.ObtenerTodos = callback => 
{
    Connection(db => {
        const collection = db.collection('tipos');
        collection.find({}).toArray((err, docs) => {
            if (err) throw err;
            callback(null, docs);
        });
    })
}

module.exports = tipo;