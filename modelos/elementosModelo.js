var DB=require('./DB.js');
 
//creamos un objeto para ir almacenando todo lo que necesitemos
var elemento = {};
 

elemento.getElementos = function( datos, callback)
{
	var q = 'SELECT  * FROM elementos INNER JOIN elementos_has_preferencias ON elementos_has_preferencias.elementos_idElemento = elementos.idElemento WHERE elementos_has_preferencias.preferencias_idPreferencia = ? AND elementos_has_preferencias.valor = ? AND elementos.categorias_idCategoria = ? AND elementos.tipo = ? GROUP BY idElemento ORDER BY RAND() LIMIT 12' ;

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

elemento.getElemento = function(id,callback)
{ 
	var q = 'SELECT  * FROM elementos  WHERE idElemento = ?' 
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

elemento.getElementoLogo = function(id,callback)
{ 
	var q = 'SELECT  * FROM elementos INNER JOIN logos on elementos_idElemento = idElemento WHERE idLogo = ?' 
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

elemento.getElementosIncat = function( datos, callback)
{
	var q = 'SELECT * FROM elementos  WHERE elementos.categorias_idCategoria = ? AND elementos.tipo = ? GROUP BY idElemento ORDER BY RAND() LIMIT 12' ;

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
// insertar  te quedaste aqui
elemento.insertElemento = function(datos,callback)
{
	var q = 'INSERT INTO elementos SET ? ' 
	var elemen = datos //parametros

	DB.getConnection(function(err, connection)
	{
		connection.query( q , elemen , function(err, result){
	  	
	  	if(err)	throw err;

	  	//devolvemos la última id insertada
	  	else callback(null,{"insertId" : result.insertId}); 
	  	
	  });

	  connection.release();
	});
}

elemento.insertFuente = function(datos,callback)
{
	var q = 'INSERT INTO elementos SET ? ' 
	var fuen = datos //parametros

	DB.getConnection(function(err, connection)
	{
		connection.query( q , fuen , function(err, result){
	  	
	  	if(err)	throw err;

	  	//devolvemos la última id insertada
	  	else callback(null,{"insertId" : result.insertId}); 
	  	
	  });

	  connection.release();
	});
}

elemento.cambiarEstado = function(data, callback)
{
	var q = 'UPDATE elementos SET comprado = ? WHERE idElemento = ?';
	var par = data //parametros

	DB.getConnection(function(err, connection)
	{
		connection.query( q , par , function(err, row){
	  	
	  	if(err)	throw err;

	  	else callback(null,{"msg" : "modificacion exitosa"}); 
	  	
	  });

	  connection.release();
	});
}
 
//exportamos el objeto para tenerlo disponible en la zona de rutas*/
module.exports = elemento;