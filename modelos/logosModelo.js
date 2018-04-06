var DB=require('./db.js');
 
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

logo.getLogoPorId = function(id, callback)
{
	var q = 'SELECT * FROM logos WHERE idLogo = ?' 

	DB.getConnection(function(err, connection)
	{
		connection.query( q , [id], function(err, rows){
	  	
		  	if(err)	throw err;
		  	
		  	else callback(null, rows);

		  	connection.release();
	  	
		  });
		  
		  
	});
}

logo.getLogosPorAprobar = function(par,callback)
{
	var q = 'SELECT * FROM logos WHERE estado = "Por Aprobar" ORDER BY idLogo'  

	DB.getConnection(function(err, connection)
	{
		connection.query( q , par, function(err, rows){
	  	
		  	if(err)	throw err;
		  	
		  	else callback(null, rows);

		  	connection.release();
	  	});
	});
}

logo.getLogosAprobados = function(id, idCategoria, callback)
{
	var q = 'SELECT logos.* FROM logos INNER JOIN elementos ON logos.elementos_idElemento = elementos.idElemento INNER JOIN categorias ON elementos.categorias_idCategoria = categorias.idCategoria WHERE logos.estado = "Aprobado" AND logos.destacado = 0 AND logos.idLogo > ? AND categorias.idCategoria > ? ORDER BY logos.idLogo LIMIT 12';  

	DB.getConnection(function(err, connection)
	{
		connection.query(q, [id, idCategoria], function(err, rows){
	  	
		  	if(err)	throw err;
		  	
		  	else callback(null, rows);

		  	connection.release();
	  	});
	});
}

logo.getLogosAprobadosPorCliente = function(id,callback)
{
	var q = 'SELECT * FROM logos WHERE estado = "Aprobado" AND clientes_idCliente = ? ORDER BY idLogo';  

	DB.getConnection(function(err, connection)
	{
		connection.query(q, [id], function(err, rows){
	  	
		  	if(err)	throw err;
		  	
		  	else callback(null, rows);

		  	connection.release();
	  	});
	});
}

logo.getLogosVendidosPorCliente = function(id,callback)
{
	var q = 'SELECT * FROM logos WHERE estado = "Vendido" AND clientes_idCliente = ? ORDER BY idLogo';  

	DB.getConnection(function(err, connection)
	{
		connection.query(q, [id], function(err, rows){
	  	
		  	if(err)	throw err;
		  	
		  	else callback(null, rows);

		  	connection.release();
	  	});
	});
}

logo.getLogosAprobadosDestacados = function(callback)
{
	var q = 'SELECT * FROM logos WHERE estado = "Aprobado" and destacado = 1 ORDER BY RAND() LIMIT 12';  

	DB.getConnection(function(err, connection)
	{
		connection.query( q , function(err, rows){
	  	
		  	if(err)	throw err;
		  	
		  	else callback(null, rows);

		  	connection.release();
	  	});
	});
}


//obtenemos los logos guardados o comprados por un cliente
logo.getLogosTipo = function(par,callback)
{
	var q = 'SELECT * FROM logos WHERE estado = ? and clientes_idCliente = ? ORDER BY idLogo DESC'  

	DB.getConnection(function(err, connection)
	{
		connection.query( q , par, function(err, rows){
	  	
		  	if(err)	throw err;
		  	
		  	else callback(null, rows);

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
		connection.query( q , par , function(err){
	  	
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
		connection.query( q , par , function(err){
	  	
		  	if(err)	throw err;

		  	else callback(null,{"msg" : "modificacion exitosa"}); 
		  	
		  	connection.release();
		});

	  
	});
}

logo.Destacar = function(logoData, callback)
{
	var q = 'UPDATE logos SET destacado = ? WHERE idLogo = ?';
	var par = logoData 
	
	DB.getConnection(function(err, connection)
	{
		connection.query( q , par , function(err){
	  	
		  	if(err)	throw err;

		  	else callback(null,{"msg" : "modificacion exitosa"}); 
		  	
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

logo.getLogo = function(par,callback)
{ 
	var q = 'SELECT * FROM logos WHERE clientes_idCliente = ? AND idLogo = ?';
	DB.getConnection(function(err, connection)
	{
		connection.query( q , par , function(err, row){
	  	    //console.log(row)
		  	if(err)	throw err;
		  	
		  	else callback(null, row);

		  	connection.release();
	  	});
	});
}

 
//exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = logo;