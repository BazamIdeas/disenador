const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

const config = require("../configuracion/configuracion.js");

const datos = config.mongo;

function connect() {
    return MongoClient.connect(datos.url, { poolSize: 10 })
}

exports.startConnection = async function() {
    try {
        let client = await connect();
        const db = client.db(datos.database);
        return function (cb) {
            cb(db)
        }
    } catch (err) {
        throw err
    }
}

exports.objectId = id => {
    return new ObjectId(id);
}
