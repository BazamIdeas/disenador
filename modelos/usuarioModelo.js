var DB = require('./DB.js');

var usuarios = {};

usuarios.getUsuarios=function(callback){

	var q = 'SELECT nombreUser, idUsuario, correo, pass FROM usuarios ORDER BY idUsuario' ;

		DB.getConnection(function(err, connection)
		{
			connection.query( q ,  function(err, rows){
		  	
		  	if(err)	throw err;
		  	
		  	else callback(null, rows);
		  	
		  });

		  connection.release();
		});


};