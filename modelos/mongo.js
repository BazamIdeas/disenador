const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
var cfg = require("../configuracion.js");

// Connection URL
const datos = cfg.mongo;

// Use connect method to connect to the server
var mongo = {
    
    connection: function(callback){ 
        MongoClient.connect(datos.url, function(err, client) {
            assert.equal(null, err);
            const db = client.db(datos.database);
            callback(db)
            client.close();
        });
    }
}

module.exports = mongo;