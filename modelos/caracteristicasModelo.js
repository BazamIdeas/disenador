var DB = require("./db.js");
 
var caracteristica = {};
 
caracteristica.Guardar = (caracteristicasData, callback) => 
{
	var q   = "INSERT INTO caracteristicas SET ?";
	var par = caracteristicasData;

	DB.getConnection(function(err, connection)
	{
		connection.query( q , par , function(err, result){
		
			if(err)	throw err;

			else callback(null,{"insertId" : result.insertId}); 
				
			connection.release();
		});
	});
};

caracteristica.ObtenerPorClave = (clave, idLogo, callback) =>
{
	var q   = "SELECT clave, valor FROM caracteristicas WHERE clave = ? AND planes_idPlan = ?";

	DB.getConnection(function(err, connection)
	{
		connection.query( q , [clave, idLogo] , function(err, rows){
		

			if(err)	throw err;

			else{
				callback(null, rows); 
			}

			connection.release();
		});
	});
};

caracteristica.ObtenerPorPlan = (idPlan, callback) =>
{
	var q   = "SELECT clave, valor, descripcion FROM caracteristicas WHERE planes_idPlan = ?";
  
	DB.getConnection(function(err, connection)
	{
		connection.query( q , [idPlan] , function(err, rows){
		

			if(err)	throw err;

			else{
				callback(null, rows); 
			}

			connection.release();
		});
	});
};

caracteristica.BorrarPorPlan = (idPlan, objetivos, callback) => 
{
	var qq = "DELETE FROM caracteristicas WHERE caracteristicas.planes_idPlanes = ? AND caracteristicas.clave IN(?)";
	DB.getConnection(function(err, connection)
	{
		connection.query( qq , [idPlan, objetivos] , function(err, row)
		{
			if(err)	throw err;

			else callback(null,{"affectedRows" : row.affectedRows }); 
		
			connection.release();
		}); 
	});
};

module.exports = caracteristica;