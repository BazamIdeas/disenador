var DB=require('./DB.js');
 
//creamos un objeto para ir almacenando todo lo que necesitemos
var pedido = {};
 

//obtenemos todos los pedidos
pedido.getPedidos = function(callback)
{
	var q = 'SELECT fecha, estado, tipo, logos_idLogo, clientes_idCliente FROM pedidos ORDER BY idPedido' 

	DB.getConnection(function(err, connection)
	{
		connection.query( q ,  function(err, rows){
	  	
	  	if(err)	throw err;
	  	
	  	else callback(null, rows);
	  	
	  });

	  connection.release();
	});
}

//obtenemos un pedido por su id
pedido.getPedido = function(id,callback)
{ 
	var q = 'SELECT fecha, estado, tipo, logos_idLogo, clientes_idCliente FROM pedidos WHERE idPedido = ? ' 
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
 

//añadir un nuevo pedido
pedido.insertPedido = function(pedidoData,callback)
{
	var q = 'INSERT INTO pedidos SET ? ' 
	var par = pedidoData //parametros

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

//actualizar un pedido
pedido.updatePedido = function(pedidoData, callback)
{
	var q = 'UPDATE pedidos SET nombrepedido = ?, correo = ?,  pass = ? WHERE idPedido = ?';
	var par = pedidoData //parametros

	DB.getConnection(function(err, connection)
	{
		connection.query( q , par , function(err, row){
	  	
	  	if(err)	throw err;

	  	else callback(null,{"msg" : "modificacion exitosa"}); 
	  	
	  });

	  connection.release();
	});
}

 
//eliminar un pedido pasando la id a eliminar
pedido.deletePedido = function(id, callback)
{
	var q = 'SELECT * FROM pedidos WHERE idPedido = ?';
	var par = [id] //parametros

	DB.getConnection(function(err, connection)
	{
		connection.query( q , par , function(err, row)
		{
	  	 	//si existe la id del pedido a eliminar
		  	if(row !== 'undefined' && row.length > 0)
		  	{
		  		var qq = 'DELETE FROM pedidos WHERE idPedido = ?';
		  		DB.getConnection(function(err, connection)
		  		{
					connection.query( qq , par , function(err, row)
					{
				  	
				  		if(err)	throw err;

					  	else callback(null,{"msg" : "eliminado"}); 
				  	
				 	 });

				  	connection.release();
				});

		  	}
		  	else callback(null,{"msg":"no existe el pedido"});
	  	});

	  connection.release();
	});
}

 
//exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = pedido;