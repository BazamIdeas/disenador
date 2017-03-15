var DB=require('./DB.js');
 
//creamos un objeto para ir almacenando todo lo que necesitemos
var elemento = {};
 

elemento.getElementos = function( datos, callback)
{
	var q = 'SELECT elementos.idElemento, elementos.nombre, elementos.url FROM elementos INNER JOIN elementos_has_preferencias ON elementos_has_preferencias.elementos_idElemento = elementos.idElemento WHERE elementos_has_preferencias.preferencias_idPreferencia = ? AND elementos_has_preferencias.valor = ? AND elementos.categorias_idCategoria = ? AND elementos.tipo = ?' ;

	DB.getConnection(function(err, connection)
	{ //cmienzo del for
		
		connection.query( q ,datos, function(err, rows){

	  	if(err)	throw err;
	  	
	  	else 
	  	callback(null, rows);
	  	
	  });

	  connection.release();
	});
}



/*elemento.getElementosIncat = function(callback)
{
	
	var datos = [
    {id:'1', valor:'2', cat:'1'},
    {id:'2', valor:'1', cat:'1'},
    {id:'2', valor:'2', cat:'1'}
    
    
];
var q = [];
    for (var i = datos.length - 1; i >= 0; i--){
   
    	 
    	
    
            q = 'SELECT elementos.idElemento, elementos.nombre, elementos.url FROM elementos INNER JOIN elementos_has_preferencias ON elementos_has_preferencias.elementos_idElemento = elementos.idElemento WHERE elementos_has_preferencias.preferencias_idPreferencia = '+ datos[i].id +' AND elementos_has_preferencias.valor = '+ datos[i].valor +' AND elementos.categorias_idCategoria = '+ datos[i].cat ;

    }	

	

	DB.getConnection(function(err, connection)
	{
		connection.query( q ,datos, function(err, rows){
	  	
	  	if(err)	throw err;
	  	
	  	else callback(null, rows);
	  	
	  });

	  connection.release();
	});
} */      //fin de la funcion para la condicion 


/*
//obtenemos un pedido por su id
pedido.getPedido = function(id,callback)
{ 
	var q = 'SELECT fecha, estado, tipo, elementoss_idLogo, clientes_idCliente FROM pedidos WHERE idPedido = ? ' 
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
	var q = 'UPDATE pedidos SET fecha = ?, estado = ?,  tipo = ?, elementoss_idLogo = ?, clientes_idCliente = ? WHERE idPedido = ?';
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

 
//exportamos el objeto para tenerlo disponible en la zona de rutas*/
module.exports = elemento;