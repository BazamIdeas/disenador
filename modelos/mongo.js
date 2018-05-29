const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const tunnel = require('tunnel-ssh');

const config = require("../configuracion/configuracion.js");

const datos = config.mongo;

const mongo = {
    connection: callback => { 
        MongoClient.connect(datos.url, (err, client) => {
            if (err) throw err;
            const db = client.db(datos.database);
            callback(db)
            //client.close();
        })
    },
    objectId: id => {
        return new ObjectId(id);
    }
}

module.exports = mongo;