var DB=require('./DB.js');
 
//creamos un objeto para ir almacenando todo lo que necesitemos
var cliente = {};
 
cliente.verificarCliente = function(clienteData,callback)
{
	var q = 'SELECT correo FROM clientes WHERE correo = ?' ;
	
	var correo = clienteData[0];
	var pass = clienteData[1];

		  		
		DB.getConnection(function(err, connection)
		{			
		
			connection.query( q ,correo, function(err, row){
		 	 if (typeof row !== 'undefined' && row.length > 0)

		  		{ 
		  				
		  		var q2 = 'SELECT nombreCliente FROM clientes WHERE correo = ? AND pass = ?' ;
		   		
		   			connection.query( q2 ,clienteData, function(err, row2){

						if(err){
							throw err;
		  	
		  					}else if(row2.length > 0){ 
		  				
		  						callback(null,row2);
		  				
		  						}else{

		  							callback(null,{"msg":"La contraseña no coincide con este correo"});
		  				
		  						}
		  					
		  							});
		  	
		  					}else{
		  				 
		  				 		callback(null,{"msg":"Correo Inexistente"});
		  				
		  					     }

		  });

		  connection.release();

		  
		});

	}



//obtenemos todos los clientes
cliente.getClientes = function(callback)
{
	var q = 'SELECT nombreCliente, idCliente, correo, pass, telefono, pais FROM clientes ORDER BY idCliente' 

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
	var q = 'SELECT nombreCliente, idCliente, correo, pass, telefono, pais FROM clientes WHERE idCliente = ? ' 
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
	var q = 'SELECT idCliente FROM clientes WHERE correo = ? ' 
	var correo = clienteData.correo

	DB.getConnection(function(err, connection)
	{
		connection.query( q , correo, function(err, row){
	  	
	  	if (typeof row !== 'undefined' && row.length > 0){
	  		callback(null,{"msg" : 'cliente ya registrado'});
	  	}
	  	
	  	else{
	  			var qq = 'INSERT INTO clientes SET ? ' 
				var par = clienteData //parametros

				DB.getConnection(function(err, connection)
				{
					connection.query( qq , par , function(err, result){
				  	
				  	if(err)	throw err;

				  	//devolvemos la última id insertada
				  	else callback(null,{"insertId" : result.insertId}); 
	  	
				  });

				  connection.release();
				});
	  		} 
	  	
	  });

	  connection.release();
	});

}

//actualizar un cliente
cliente.updateCliente = function(clienteData, callback)
{
	var q = 'UPDATE clientes SET nombreCliente = ?, correo = ?,  pass = ?, telefono = ?, pais = ? WHERE idCliente = ?';
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
cliente.deleteCliente = function(id, callback)
{
	var q = 'SELECT * FROM clientes WHERE idCliente = ?';
	var par = [id] //parametros

	DB.getConnection(function(err, connection)
	{
		connection.query( q , par , function(err, row)
		{
	  	 	//si existe la id del cliente a eliminar
		  	if (typeof row !== 'undefined' && row.length > 0)
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