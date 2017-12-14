var DB=require('./DB.js');
 
//creamos un objeto para ir almacenando todo lo que necesitemos
var logo = {};
 

//obtenemos todos los logos
logo.getLogos = function(callback)
{
	var q = 'SELECT * FROM logos ORDER BY idLogo' 

	DB.getConnection(function(err, connection)
	{
		connection.query( q ,  function(err, rows){
	  	
		  	if(err)	throw err;
		  	
		  	else callback(null, rows);

		  	connection.release();
	  	
	 	 });
	});
}

//obtenemos los logos guardados o comprados por un cliente
logo.getLogosTipo = function(par,callback)
{
	var q = 'SELECT * FROM logos WHERE estado = ? and clientes_idCliente = ? ORDER BY idLogo'  

	DB.getConnection(function(err, connection)
	{
		connection.query( q , par, function(err, rows){
	  	
		  	if(err)	throw err;
		  	
		  	else callback(null, rows);

		  	connection.release();
	  	});
	});
}

//obtenemos un logo por su id
logo.getLogo = function(id,callback)
{ 
	var q = 'SELECT estado, tipoLogo, logo, clientes_idCliente, elementos_idElemento FROM logos WHERE idLogo = ? ' 
	var par = [id] //parametros

	DB.getConnection(function(err, connection)
	{
		connection.query( q , par , function(err, row){
	  	
		  	if(err)	throw err;
		  	
		  	else callback(null, row);

		  	connection.release();
	  	});
	});
}
 

//añadir un nuevo logo
logo.insertLogo = function(logoData,callback)
{
	var q = 'INSERT INTO logos SET ? ' 
	var par = logoData //parametros

	DB.getConnection(function(err, connection)
	{
		connection.query( q , par , function(err, result){
	  	
		  	if(err)	throw err;

		  	//devolvemos la última id insertada
		  	else callback(null,{"insertId" : result.insertId}); 
	  		
	  		connection.release();
	 	 });
	});
}

//actualizar un logo
logo.updateLogo = function(logoData, callback)
{
	var q = 'UPDATE logos SET logo = ? WHERE idLogo = ?';
	var par = logoData //parametros

	DB.getConnection(function(err, connection)
	{
		connection.query( q , par , function(err, row){
	  	
		  	if(err)	throw err;

		  	else callback(null,{"msg" : "modificacion exitosa"}); 
		  	
		  	connection.release();
		});

	  
	});
}

//comprar un logo Guardado
logo.cambiarEstado = function(logoData, callback)
{
	var q = 'UPDATE logos SET estado = ? WHERE idLogo = ?';
	var par = logoData //parametros
	
	DB.getConnection(function(err, connection)
	{
		connection.query( q , par , function(err, row){
	  	
		  	if(err)	throw err;

		  	else callback(null,{"msg" : "modificacion exitosa"}); 
		  	
		  	connection.release();
		});

	  
	});
}
 
//eliminar un logo pasando la id a eliminar
logo.deleteLogo = function(id, callback)
{
	var q = 'SELECT * FROM logos WHERE idLogo = ?';
	var par = [id] //parametros

	DB.getConnection(function(err, connection)
	{
		connection.query( q , par , function(err, row)
		{
	  	 	//si existe la id del logo a eliminar
		  	if(row !== 'undefined' && row.length > 0)
		  	{
		  		var qq = 'DELETE FROM logos WHERE idLogo = ?';
		  		DB.getConnection(function(err, connection)
		  		{
					connection.query( qq , par , function(err, row)
					{
				  	
				  		if(err)	throw err;

					  	else callback(null,{"msg" : "eliminado"}); 
				  		
				  		connection.release();
				 	});
				});

		  	}
		  	else callback(null,{"msg":"no existe el logo"});

		  	connection.release();
	  	});
 
	});
}

logo.Borrar = (id, callback) => 
{
	var q = 'SELECT * FROM logos WHERE idLogo = ?';
	var par = [id] //parametros

	DB.getConnection(function(err, connection)
	{
		connection.query( q , par , function(err, row)
		{
	  	 	//si existe la id del logo a eliminar
		  	if(row !== 'undefined' && row.length > 0)
		  	{
		  		var qq = 'DELETE FROM logos WHERE idLogo = ?';
		  		DB.getConnection(function(err, connection)
		  		{
					connection.query( qq , par , function(err, row)
					{
				  	
				  		if(err)	throw err;

					  	else callback(null,{"affectedRows" : row.affectedRows }); 
				  		
				  		connection.release();
				 	});
				});

		  	}
		  	else callback(null,{"msg":"no existe el logo"});

		  	connection.release();
	  	});
 
	});
}
 
//exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = logo;