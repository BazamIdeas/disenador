const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const tunnel = require('tunnel-ssh');

const config = require("../configuracion/configuracion.js");

let node_env = process.env.NODE_ENV || 'desarrollo';

node_env = node_env == 'desarrollo' ? 'test' : node_env

const datos = config.mongo;

const connection = {
    test: callback => { 
        var server = tunnel(datos.tunnel, function(error, server){
            MongoClient.connect(datos.url, (err, client) => {
                if (err) throw err;
                const db = client.db(datos.database);
                callback(db)
                client.close();
            })
        })

        server.on('error', function(err){
            console.error('Algo malo paso:', err);
        });

    },

    produccion: callback => { 
        MongoClient.connect(datos.url, (err, client) => {
            if (err) throw err;
            const db = client.db(datos.database);
            callback(db)
            client.close();
        })
    }
}

const mongo = {
    connection: connection[node_env],
    objectId: id => {
        return new ObjectId(id);
    }
}

module.exports = mongo;