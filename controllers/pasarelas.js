var pasarela = require('../modelos/pasarelasModelo.js');
var moneda    = require('../modelos/monedasModelo.js');

exports.Listar = (req, res) =>
{		
	pasarela.Listar( (error, data) => {
		//si el usuario existe 
		if (typeof data !== 'undefined' && data.length > 0){
			res.status(200).json(data);
		}else{
			res.status(404).json({"msg":"No hay registro de pasarela en la base de datos"})
		}
	});
}

exports.ListarMonedas = (req, res) =>
{	
	var id = req.params.id;

	pasarela.ListarMonedas( id , (error, data) => {

		if (typeof data !== 'undefined' && data.length > 0){

			res.status(200).json(data);
		
		}else{

			res.status(404).json({"msg":"No hay resgitro de monedas para este pasarela en la base de datos"})
		}
	});
}

exports.Nuevo = (req,res) =>
{
	//creamos un objeto con los datos a insertar del cliente
	var pasarelaData = {
	   	pasarela : req.body.pasarela,
	};
		
	
	pasarela.Nuevo(pasarelaData, (error, data) => {
		//si la etiqueta se ha insertado correctamente mostramos su info
		if(data && data.insertId){
			
			var id = data.insertId;

			var pasarelaMoneda = {
				pasarelas_idPasarela : id,
				monedas_idMoneda     : req.body.idMoneda,
			}
			
			pasarela.AsignarMoneda(pasarelaMoneda, (error, data) => {
				//si la etiqueta se ha insertado correctamente mostramos su info
				if(data && data.insertId){
					res.status(200).json({'insertId': id});
				}else{
					res.status(500).json({"msg":"Algo ocurrio"})
				}
			});
		}else{
			res.status(404).json({"msg":"Ya existe el registro"})
		}
	});
}

exports.Modificar = (req,res) =>
{
	var id = req.body.idPasarela;

	pasarela.Obtener(id , (error, data) => {
		//si el usuario existe 
		if (typeof data !== 'undefined' && data.length > 0){
			//creamos un array con los datos a modificar del cliente
			var pasarelaData = [req.body.pasarela,req.body.idPasarela];
				
			pasarela.Modificar(pasarelaData, (error, data) => {

				if (typeof data !== 'undefined' && data.affectedRows) {
					res.status(200).json(data);
				}else{
					res.status(500).json({"msg":"Algo ocurrio"})
				}
			});
		
		}else{
			res.status(404).json({"msg":"No existe"})
		}
	});
}


exports.AsignarMoneda = (req,res) =>
{
	var pasarelaMoneda = {
		pasarelas_idPasarela : req.body.idPasarela,
		monedas_idMoneda     : req.body.idMoneda
	}

	pasarela.AsignarMoneda(pasarelaMoneda, (error, data) => {
		//si la etiqueta se ha insertado correctamente mostramos su info
		if(data && data.affectedRows){
			res.status(200).json(data);
		}else{
			res.status(500).json({"msg":"Algo ocurrio"})
		}
	});
}

exports.DesasignarMoneda = (req,res) =>
{
	var pasarelaMoneda = {
		pasarelas_idPasarela : req.body.idPasarela,
		monedas_idMoneda     : req.body.idMoneda
	}

	pasarela.DesasignarMoneda(pasarelaMoneda, (error, data) => {
		//si la etiqueta se ha insertado correctamente mostramos su info
		if(data && data.msg){
			res.status(200).json(data);
		}else{
			res.status(500).json({"msg":"Algo ocurrio"})
		}
	});
}

exports.Borrar = (req, res) => 
{
	var id = req.params.id;

	pasarela.Borrar(idPasarela, (error, data) => {
		res.status(200).json(data);
	});
}