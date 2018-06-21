//const Connection = global.__mongoClient;
const objectId = require('./mongo.js').objectId;

let tipo = {}

tipo.ObtenerTodos = callback => 
{
    __mongoClient(db => {
        const collection = db.collection('tipos');
        collection.find().toArray((err, docs) => {
            if (err) throw err;
            callback(null, docs);
        });
    })
}

module.exports = tipo;