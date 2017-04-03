var mysql   = require("mysql");

var pool = mysql.createPool({
    connectionLimit : 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'disenadorlogodb'
});
 /*
var pool = mysql.createPool({
    connectionLimit : 10,
    host: 'localhost',
    user: 'disena',
    password: 'Esbz89%9',
    database: 'disenadorlogodb'
});
*/
module.exports = pool;