var elemento=require('../modelos/elementosModelo.js');
var async = require("async");

// FUNCION QUE DEVUELVE LOS ICONOS SEGUN 
exports.listaSegunPref = function(req, res, next) {
	
var datos2 = req.body
var datos = [];
var datoIncat = [];
var x;
for (x in datos2.preferencias){
    datos.push([datos2.preferencias[x].idPreferencia,datos2.preferencias[x].valor, datos2.categoria, datos2.tipo])
}
/*for (x in datos2.preferencias){
    datoIncat.push([datos2.categoria, datos2.tipo])
}*/
//var datoIncat = [ [ datos2.categoria, datos2.tipo]];
console.log(datos);
//console.log(datoIncat);
	var coincidencias = [];	
	async.each(datos,  function (dato,callback) {
		elemento.getElementos( dato, function(error, data)
		{
			if (typeof data !== 'undefined' && data.length > 0)
			{ 
				coincidencias = coincidencias.concat(data);
				callback();		
				console.log(coincidencias);
			}
			else
				callback();
		});
	},
	function(err){
		if (err)
			res.status(500);
		else{

				if (coincidencias.length < 12) {
					var exit = 1;
						async.each(datoIncat,  function (dato,callback){

							elemento.getElementosIncat( dato, function(error, data)
							{
						if (typeof data !== 'undefined' && data.length > 0)
							{ 
							for (var i = data.length - 1; i >= 0; i--) { // recorremos la data 
									var res = data[i].idElemento; // almacenamos el id del elemento
									var coin = 0; // declaramos una variable para saber y encontro o no
										for (var j = coincidencias.length - 1; j >= 0; j--) {  // recorremos la coincidencia 
								  			var ress = coincidencias[j].idElemento; // asignamos el id de la coincidencia
								  	console.log("data --->" + res + "considencia --->" + ress ); 
								  		if(res == ress)  { // verificamos si son iguales
								  			coin = 1; // cambiamos el valor de la variable
  												
								  		}// fin del if
								  		
								  		}// fin del for coincidencia

								  			if(coin == 0){ // verificamos si la variable no cambio de dato
								  				
								  				coincidencias = coincidencias.concat(data[i]);// concatenamos data con coincidencias
								  			}// fin del if
								  		
								  	}// fin del for data*/
									
									
				
							
							callback();
				
							}
								else
								callback();

								});

							}, 
								function(err){
								if (err)
							res.status(500);
							else{

						res.json(coincidencias)
							}
							});
				}
				else{
					res.json(coincidencias)

				}

	
		}
	}); 
}
// te quedaste a aqui
exports.listaElemCat =  function(req, res, next) {
		
		var cat = [ req.body.idCategoria, req.body.tipo] ;


		elemento.getElementosIncat(cat, function(error, data)
		{
		//si el pedido existe 
			if (typeof data !== 'undefined' && data.length > 0)
			{
				res.status(200).json(data);
			}
		//no existe
			else
			{
				res.status(404).json({"msg":"No Encontrado"})
			}
		});

	}

	exports.nuevoElemento =  function(req, res) {
		//id del pedido
		//var  req.body.nombredelcampo
		var elem = {
			idElemento : null,
			nombre : req.body.nombre,
			url : req.body.url,
			svg : req.body.svg,
			color : req.body.color,
			tipo : req.body.tipo,
			comprado : 0,
			categoria : req.body.categoria
		};

		elemento.insertElemento(elem, function(error, data)
		{
		//si el pedido existe 
			if (typeof data !== 'undefined' && data.length > 0)
			{
				res.status(200).json(data);
			}
		//no existe
			else
			{
				res.status(500).json(data)
			}
		});

	}

/*
exports.nuevoPedido =  function(req,res)
	{
		//creamos un objeto con los datos a insertar del pedido
		var pedidoData = {
			idPedido : null,
			fecha : req.body.fecha,
			estado : req.body.estado,
			tipo : req.body.tipo,
			elementos_idLogo : req.body.elementos_idLogo, // cambiar por id del elemento guardado
			clientes_idCliente : req.body.clientes_idCliente // cambiar por id del cliente guardado
		};
		pedido.insertPedido(pedidoData,function(error, data)
		{
			//si el pedido se ha insertado correctamente mostramos su info
			if(data && data.insertId)
			{
				res.status(201).json(data);
			}
			else
			{
				res.status(500).json({"msg":"Algo ocurrio"})
			}
		});
	}

	exports.modificarPedido =  function(req,res)
	{
		var idPedido = req.body.idPedido  // 

		pedido.getPedido(idPedido,function(error, data)
		{
		//si el pedido existe 
			if (typeof data !== 'undefined' && data.length > 0)
			{
				//creamos un array con los datos a modificar del pedido
				var pedidoData = [req.body.fecha, req.body.estado, req.body.tipo, req.body.elementos_idLogo, req.body.clientes_idCliente, idPedido];
					
				pedido.updatePedido(pedidoData,function(error, data)
				{
					//si el pedido se ha modificado correctamente
					if(data)
					{
						res.status(200).json(data);
					}
					else
					{
						res.status(500).json({"msg":"Algo ocurrio"})
					}
				});
			}
		//no existe
			else
			{
				res.status(404).json({"msg":"No existe"})
			}
		});
	}

exports.borrarPedido =  function(req, res, next) {
		//id del pedido
		var id = req.params.id;
		pedido.deletePedido(id,function(error, data)
		{
			res.status(200).json(data);
		});

	}
*/