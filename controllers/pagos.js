var pago = require('../modelos/pagosModelo.js');
var logo = require('../modelos/logosModelo.js');
var atributo = require('../modelos/atributosModelo.js');
var config = require('./configuracion.js');
var async    = require("async");

exports.SaldoPorCliente = function(req, res, next)
{
    var pagado = 0;
    var vendido = 0;
    var deuda = 0;

    var idCliente = req.idCliente ? req.idCliente : req.body.idCliente; 
    var par = { estado: "Vendido", clientes_idCliente: idCliente };

    async.series({

        pagado: function(callback) {
            pago.ObtenerPorCliente(idCliente,function(error,data){
        
                if(typeof data !== 'undefined' && data.length){

                    for(var key in data){

                        pagado = pagado + data[key].monto;

                    }

                }

                callback(null, pagado);

            });
        },
        
        vendido: function(callback) {
            logos.getLogosTipo(par, function(error,data){

                if(typeof data !== 'undefined' && data.length){

                    for(var key in data){
                    
                        atributo.ObtenerPorLogo(data[key].idLogo, function(err, data){
                                
                            if (typeof data !== 'undefined' && data.length > 0){

                                for(var key in data){
                                        
                                    if(data[key].clave == "calificacion-admin" && data[key].clave == "calificacion-cliente"){
                                        
                                        var cal = data[key].clave == "calificacion-admin" ? "moderador" : "cliente"; 
                                        vendido = vendido + configuracion.freelancer[cal][data[key].valor]
                                
                                    }

                                }

                            }

                        });
                    }

                }

                callback(null, vendido);

            });
        }
        
    }, function(err, results) {
        
        if (err) res.status(500).json({msg: "Algo ocurrio"});

        var data = {
            pagado: results.pagado,
            vendido: results.vendido,
            deuda: results.pagado - results.vendido
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