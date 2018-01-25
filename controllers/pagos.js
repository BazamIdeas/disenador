var pago = require('../modelos/pagosModelo.js');
var logo = require('../modelos/logosModelo.js');
var atributo = require('../modelos/atributosModelo.js');
var config = require('../configuracion.js');
var async    = require("async");

exports.SaldoPorCliente = function(req, res, next)
{
    var pagado = 0;
    var vendido = 0;
    var deuda = 0;

    var idCliente = req.idCliente ? req.idCliente : req.body.idCliente; 
    var par = ["Vendido",idCliente];

    async.series({

        pagado: function(callback) {
            pago.ObtenerPorCliente(idCliente,function(error,data){
                console.log("pagado")
                if(typeof data !== 'undefined' && data.length){

                    for(var key in data){

                        pagado = pagado + data[key].monto;

                    }

                }

                callback(null, pagado);

            });
        },
        
        vendido: function(callback) {
            logo.getLogosTipo(par, function(error,data){
                
                if(typeof data !== 'undefined' && data.length){

                    for(var key in data){
                    
                        atributo.ObtenerPorLogo(data[key].idLogo, function(err, data){
                            console.log(data)
                            if (typeof data !== 'undefined' && data.length > 0){

                                var cal = {};
                                for(var key in data){

                                    if(data[key].clave == "calificacion-admin"){

                                        cal.moderador = data[key].valor;
                                        vendido = vendido + config.freelancer["moderador"][data[key].valor];
                                    }
                                    
                                    if(data[key].clave == "calificacion-cliente"){
                                        cal.cliente = data[key].valor;
                                    }

                                }
                                
                                if(cal.cliente){
                                    vendido = vendido + config.freelancer["cliente"][cal.cliente];
                                }else{
                                    vendido = vendido + config.freelancer["moderador"][cal.moderador];
                                }

                                callback(null, vendido);
                                
                            }

                        });
                    }

                }

            });
        }
        
    }, function(err, results) {
        
        console.log(2)
        
        if (err) res.status(500).json({msg: "Algo ocurrio"});

        var data = {
            pagado: results.pagado,
            vendido: results.vendido,
            deuda: results.vendido - results.pagado
        }

        res.status(200).json(data);
    });
}

exports.Nuevo = function(req, res, next)
{
    var datosPago = {
        fecha: req.body.fecha,
        monto: req.body.monto,
        clientes_idCliente: req.body.idCliente 
    }

    pago.Nuevo(datosPago, function(error,data){
        if(typeof data !== 'undefined' && data.insertId){
            res.status(200).json(data);
        }else{
            res.status(500).json({msg:"Algo ocurrio"})
        }
    })
}