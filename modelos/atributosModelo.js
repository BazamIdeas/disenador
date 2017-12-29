var DB = require('./db.js');
 
var atributo = {};
 
atributo.Guardar = (atributosData, callback) => 
{
	var q   = "INSERT INTO atributos SET ?";
	var par = atributosData;

	DB.getConnection(function(err, connection)
	{
		connection.query( q , par , function(err, result){
	  	
	  		if(err)	throw err;

	  		else callback(null,{"insertId" : result.insertId}); 
	  		
	  		connection.release();
	  	});
	});
}

atributo.ObtenerPorLogo = (idLogo, callback) =>
{
	var q   = "SELECT clave, valor FROM atributos WHERE logos_idLogo = ?";

	DB.getConnection(function(err, connection)
	{
		connection.query( q , [idLogo] , function(err, rows){
	  

	  		if(err)	throw err;

	  		else{
	  			callback(null, rows); 
	  		}

	  		connection.release();
	  	});
	});
}

atributo.BorrarPorLogo = (idLogo,callback) => 
{
	var qq = 'DELETE FROM atributos WHERE logos_idLogo = ?';
	DB.getConnection(function(err, connection)
	{
		connection.query( qq , [idLogo] , function(err, row)
		{
	  		if(err)	throw err;

		  	else callback(null,{"affectedRows" : row.affectedRows }); 
	  		
	  		connection.release();
	 	});
	});
}

module.exports = atributo;