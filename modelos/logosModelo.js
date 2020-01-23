const DB = require('./db.js');
const objectId = require('./mongo.js').objectId;
 
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
	if (idCategoria > 0) {
		var q = 'SELECT logos.*, categorias.padre FROM logos INNER JOIN categorias ON logos.categorias_idCategoria = categorias.idCategoria WHERE logos.estado = "Aprobado" AND logos.idLogo > ? AND categorias.idCategoria = ? ORDER BY logos.idLogo LIMIT 12';  
	} 

	else {
		var q = 'SELECT logos.*, categorias.padre  FROM logos INNER JOIN categorias ON logos.categorias_idCategoria = categorias.idCategoria WHERE logos.estado = "Aprobado" AND logos.idLogo > ? AND categorias.idCategoria > ? ORDER BY logos.idLogo LIMIT 12';  
	}

	DB.getConnection(function(err, connection)
	{
		connection.query(q, [id, idCategoria], function(err, rows){
	  	
		  	if(err)	throw err;
		  	
		  	else callback(null, rows);

		  	connection.release();
	  	});
	});
}


const getFeaturedByIDs = (ids, excludeIds) => {

	let connPromise = new Promise((resolve, reject) => {

		DB.getConnection( (err, connection) => {

			if(err){
				reject(err);
				return;
			}

			resolve(connection);

		});

	})

	let promise = new Promise( async (resolve, reject) => {

		try {

			let  connection = await connPromise;
			
			connection.query('SELECT logos.idLogo, logos.logo AS svg, logos.noun FROM logos WHERE idLogo IN (?) AND logos.idLogo NOT IN (?) LIMIT 8', [ids, excludeIds], (err, logosPorID) => {

				connection.release();

				if (err) {
					reject(err);
					return;
				}

				resolve(logosPorID);
			});
		} catch (e) {
			reject(e);
		}
		
	
	})

	return promise;

}

const getFeaturedBySubcat = (idSubcategoria, max, excludeIds) => {

	let connPromise = new Promise((resolve, reject) => {

		DB.getConnection( (err, connection) => {

			connection.release();

			if(err){
				reject(err);
				return;
			}

			resolve(connection);

		});

	})

	let promise = new Promise( async (resolve, reject) => {

		try {

			if(!idSubcategoria){
				resolve([]);
				return;
			}

			let  connection = await connPromise;

			connection.query('SELECT logos.idLogo, logos.logo AS svg, logos.noun FROM logos WHERE ? IS NOT NULL and categorias_idCategoria = ? AND logos.idLogo NOT IN (?) LIMIT ?', [idSubcategoria /*TODO:*/, idSubcategoria, excludeIds, max], (err, logosPorSubCat) => {

				connection.release();

				if (err) {
					reject(err);
					return;
				}

				resolve(logosPorSubCat);
			});
							
		} catch (e) {
			reject(e);
		}
		
	
	})

	return promise;
	
}

const getFeaturedByCat = (idCategoria, max, excludeIds) => {

	let connPromise = new Promise((resolve, reject) => {

		DB.getConnection( (err, connection) => {

			if(err){
				reject(err);
				return;
			}

			resolve(connection);

		});

	})
	
	let promise = new Promise( async (resolve, reject) => {

		try{

			let connection = await connPromise;

			connection.query('SELECT logos.idLogo, logos.logo AS svg, logos.noun FROM logos INNER JOIN categorias ON logos.categorias_idCategoria = categorias.idCategoria WHERE logos.estado = "Aprobado" AND categorias.padre = ? AND logos.idLogo NOT IN (?) LIMIT ?', [idCategoria, excludeIds, max], (err, logosPorCat) => {
				
				connection.release()

				if(err) {
					reject(err);
					return; 
				}
				
				resolve(logosPorCat); 
				
			});


		} catch(e) {

			reject(e)
		}
		
	})

	return promise;
	
}



logo.listaLogosAprobadosPorTagCatSub = function (ids, idTag, idSubcategoria, idCategoria, callback) {

	__mongoClient(db => {
		const logos = db.collection('logos');

		logos.aggregate([{
			$match: {
				'etiquetas': objectId(idTag)
			}
		}, {
			$project: { idLogo: 1 }
		}]).toArray( async (err, docs) => {
			
			if (err) return callback(err);

			if (docs.length) {
				
				docs = docs.map(el => el.idLogo);

			} else{

				docs = [0];
			}

			try {

				let logosPorID = await getFeaturedByIDs(docs, ids);

				if (logosPorID.length > 8) {

					return callback(null, logosPorID.slice(0,8));

				}

				let resto =  8 - logosPorID.length

				let logosPorSubCat = await getFeaturedBySubcat(idSubcategoria, resto, ids);

				if (logosPorSubCat.length > resto - 1)  {

					return callback(null, logosPorID.concat(logosPorSubCat));
				}

				resto -= logosPorSubCat.length;

				let logosPorCat = await getFeaturedByCat(idCategoria, resto, ids);

				return callback(null, logosPorID.concat(logosPorSubCat).concat(logosPorCat));

			} catch (e){
				
				return callback(e);
				
			}


			/*
			DB.getConnection( (err, connection) => {


			
				let query = 'SELECT * FROM logos WHERE idLogo IN (?) ORDER BY RAND() LIMIT 12'

				connection.query(query, [docs], (err, logosPorID) => {
					if (err) return callback(err);

					if (logosPorID.length > 11) {

						return callback(null, logosPorID);

					} else {
						/*
						let resto =  12 - logosPorID.length

						query = 'SELECT * FROM logos WHERE ? IS NOT NULL and categorias_idCategoria = ? ORDER BY RAND() LIMIT ?'

						connection.query(query, [idCategoria, idSubcategoria, resto], (err, logosPorSubCat) => {
							if (err) return callback(err);

							if (logosPorSubCat.length > resto - 1) {

								return callback(null, logosPorID.concat(logosPorSubCat));
							
							} else {
								
								resto = logosPorSubCat.length - resto;

								query = 'SELECT * FROM logos INNER JOIN categorias ON logos.categorias_idCategoria = categorias.idCategoria WHERE logos.estado = "Aprobado" AND logos.idLogo > ? AND categorias.padre = ? ORDER BY RAND() LIMIT ?'

								connection.query(query, [idCategoria, resto], (err, logosPorCat) => {
									if (err) return callback(err);

									if (logosPorCat.length > resto - 1) {

										return callback(null, logosPorID.concat(logosPorSubCat).concat(logosPorCat));

									} else {

										return callback(null, logosPorID.concat(logosPorSubCat).concat(logosPorCat));

									}

									connection.release();
								});

								

							}

							connection.release();
						});
					
					}

					connection.release();
				});

			});

			*/

		})
	})

}


logo.getLogosAprobadosCatPadre = function (id, idCategoria, callback) {

	var q = 'SELECT logos.*, categorias.idCategoria, categorias.nombreCategoria  FROM logos  INNER JOIN categorias ON logos.categorias_idCategoria = categorias.idCategoria WHERE logos.estado = "Aprobado" AND logos.idLogo > ? AND categorias.padre = ? ORDER BY logos.idLogo LIMIT 12';


	DB.getConnection(function (err, connection) {
		connection.query(q, [id, idCategoria], function (err, rows) {

			if (err) throw err;

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