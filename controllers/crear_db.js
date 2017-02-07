/*var mysql = require('mysql');
var connection = mysql.createConnection({

	host: 'localhost',
	user: 'root',
	password: ''

});


connection.connect();
*/
var db=require('./ejemplo1.js');

db.query('SELECT * FROM user',function(err,fields){

	if(err){

		connection.end();
		throw err;
	}

console.log(fields);

});
