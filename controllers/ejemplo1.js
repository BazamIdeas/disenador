var mysql   = require("mysql");

var pool = mysql.createPool({
    connectionLimit : 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'semillero'
});


var DB = (function () {

    function _query(query, params, callback) {
        pool.getConnection(function (err, connection) {
            if (err) {
                connection.release();
                throw err;
            }

            connection.query(query, params, function (err, rows) {
                connection.release();
                if (!err) {
                    callback(rows);
                }
            });

            connection.on('error', function (err) {
                connection.release();
                throw err;
            });
        });
    };

    return {
        query: _query
    };
})();

module.exports = DB;