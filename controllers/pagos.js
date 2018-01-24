var pago = require('../modelos/pagosModelo.js');
var logo = require('../modelos/logosModelo.js');
var atributo = require('../modelos/atributosModelo.js');
var config = require('../configuracion.js');
var async    = require("async");

exports.SaldoPorCliente = function(req, res, next)
{
    var pagado = 0;
    var vendido = 0;

    var idCliente = req.idCliente ? req.idCliente : req.body.idCliente; 

    pago.ObtenerPorCliente(idCliente,function(error,data){
        
        if(typeof data !== 'undefined' && data.length){

            async.forEachOf(data, (pago,key,callback) => {

                pagado = pagado + pago.monto;

                callback();

            }, (err) => {
                
                if (err) res.status(402).json({});
                
                var par = { estado: "Vendido", clientes_idCliente: idCliente };

                logos.getLogosTipo(par, function(error,data){

                    if(typeof data !== 'undefined' && data.length){

                        async.forEachOf(data, (logo,key,callback) => {

                            atributo.ObtenerPorLogo(logo.idLogo, function(err, data){
                                
                                if (typeof data !== 'undefined' && data.length > 0){
                                    
                                    for(var key in data){
                                        
                                        if(data[key].clave == "calificacion-admin" && data[key].clave == "calificacion-cliente"){
                                            
                                            var cal = data[key].clave == "calificacion-admin" ? "moderador" : "cliente"; 
                                            vendido = vendido + configuracion.freelancer[cal][data[key].valor]
                                    
                                        }

                                    }
                                
                                }
                            
                            })

                            callback();

                        }, (err) => {

                            if (err) res.status(402).json({});

                            var data = {
                                pagado: pagado,
                                vendido: vendido,
                                deuda: pagado - vendido
                            }

                            res.status(200).json(deuda);

                        })

                    }else{

                        var deuda = {
                            pagado: pagado,
                            vendido: vendido,
                            deuda: pagado - vendido
                        }
            
                        res.status(200).json(deuda);

                    }
                })
            
            })

        }else{

            var deuda = {
                pagado: pagado,
                vendido: vendido,
                deuda: pagado - vendido
            }

            res.status(200).json(deuda);

        }
    })
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