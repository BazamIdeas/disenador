var DB=require('./DB.js');
 
//creamos un objeto para ir almacenando todo lo que necesitemos
var cliente = {};
 

//obtenemos todos los clientes
cliente.getClientes = function(callback)
{
	var q = 'SELECT nombreCliente, idCliente, correo, pass FROM clientes ORDER BY idCliente' 

	DB.getConnection(function(err, connection)
	{
		connection.query( q ,  function(err, rows){
	  	
	  	if(err)	throw err;
	  	
	  	else callback(null, rows);
	  	
	  });

	  connection.release();
	});
}

//obtenemos un cliente por su id
cliente.getCliente = function(id,callback)
{ 
	var q = 'SELECT nombreCliente, idCliente, correo, pass FROM clientes WHERE idCliente = ? ' 
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
cliente.insertCliente = function(clienteData,callback)
{
	var q = 'INSERT INTO clientes SET ? ' 
	var par = clienteData //parametros

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
cliente.updateCliente = function(clienteData, callback)
{
	var q = 'UPDATE clientes SET nombreCliente = ?, correo = ?,  pass = ? WHERE idCliente = ?';
	var par = [clienteData] //parametros

	DB.getConnection(function(err, connection)
	{
		connection.query( q , par , function(err, row){
	  	
	  	if(err)	throw err;

	  	//devolvemos el última id insertada
	  	else callback(null,{"idInsertado" : result.insertId}); 
	  	
	  });

	  connection.release();
	});
}

 
//eliminar un cliente pasando la id a eliminar
cliente.deleteCliente = function(id, callback)
{
	var q = 'SELECT * FROM clientes WHERE idCliente = ?';
	var par = [id] //parametros

	DB.getConnection(function(err, connection)
	{
		connection.query( q , par , function(err, row)
		{
	  	 	//si existe la id del cliente a eliminar
		  	if(row)
		  	{
		  		var qq = 'DELETE FROM clientes WHERE idCliente = ?';
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
		  	else callback(null,{"msg":"no existe el cliente"});
	  	});

	  connection.release();
	});
}

 
//exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = cliente;