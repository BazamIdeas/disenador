var DB = require('./DB.js');

var usuario = {};

usuario.getUsuarios=function(callback){

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

usuario.getUsuario = function(id,callback)
{ 
	var q = 'SELECT nombreUser, idUsuario, correo, pass FROM usuarios WHERE idUsuario = ? ' 
	var par = [id] //parametros

	DB.getConnection(function(err, connection)
	{
		connection.query( q , par , function(err, row){
	  	
	  	if(err)	throw err;
	  	
	  	else callback(null, row);
	  	
	  });

	  connection.release();
	});
}
 

//añadir un nuevo cliente
usuario.insertUsuario = function(usuarioData,callback)
{
	var q = 'INSERT INTO usuarios SET ? ' 
	var par = usuarioData //parametros

	DB.getConnection(function(err, connection)
	{
		connection.query( q , par , function(err, result){
	  	
	  	if(err)	throw err;

	  	//devolvemos la última id insertada
	  	else callback(null,{"insertId" : result.insertId}); 
	  	
	  });

	  connection.release();
	});
}

//actualizar un cliente
usuario.updateUsuario = function(clienteData, callback)
{
	var q = 'UPDATE usuarios SET nombreUser = ?, correo = ?,  pass = ? WHERE idUsuario = ?';
	var par = clienteData //parametros

	DB.getConnection(function(err, connection)
	{
		connection.query( q , par , function(err, row){
	  	
	  	if(err)	throw err;

	  	else callback(null,{"msg" : "modificacion exitosa"}); 
	  	
	  });

	  connection.release();
	});
}

 
//eliminar un cliente pasando la id a eliminar
usuario.deleteUsuario = function(id, callback)
{	
	var q = 'SELECT * FROM usuarios WHERE idUsuario = ?';
	var par = [id] //parametros

	DB.getConnection(function(err, connection)
	{
		connection.query( q , par , function(err, row)
		{
	  	 	//si existe la id del cliente a eliminar
		  	if (typeof row !== 'undefined' && row.length > 0)
		  	{
		  		var qq = 'DELETE FROM usuarios WHERE idUsuario = ?';
		  		DB.getConnection(function(err, connection)
		  		{
					connection.query( qq , par , function(err, row)
					{
				  	
				  		if(err)	throw err;

					  	//devolvemos el última id insertada
					  	else callback(null,{"msg" : 'eliminado'}); 
				  	
				 	 });

				  	connection.release();
				});

		  	}
		  	else callback(null,{"msg":"no existe el usuario"});
	  	});

	  connection.release();
	});
}

module.exports = usuario;

