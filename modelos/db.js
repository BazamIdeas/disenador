var mysql   = require("mysql");

var node_env = 'produccion';

console.log(process.env.NODE_ENV)

var datos = {
    "desarrollo":{
        connectionLimit : 20,
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'disenadorlogodb'
    },
    "produccion": {
        connectionLimit : 10,
        host: '79.137.72.204',
        user: 'disena',
        password: 'Esbz89%9',
        database: 'disenadorlogodb'
    }
};

var pool = mysql.createPool({
    connectionLimit : datos[node_env].connectionLimit,
    host: datos[node_env].host,
    user: datos[node_env].user,
    password: datos[node_env].password,
    database: datos[node_env].database
});

module.exports = pool;