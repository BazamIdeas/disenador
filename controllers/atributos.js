var atributo = require('../modelos/atributosModelo.js');
var async    = require("async");


exports.Nuevo = function(req, res, next)
{
    var atributosData = {
        clave : req.body.clave,
        valor : req.body.valor,
        logos_idLogo: req.body.idLogo  
    };

    atributo.Guardar(atributosData, function(error, data) {
        if(!data && !data.insertId){
            res.status(500).json({"msg":"Algo ocurrio"})
        }else{
            res.status(200).json(data)
        }
    })
}

exports.CalificarAdministrador = function(req, res, next) {
    var atributosData = {
        clave : 'calificacion-admin',
        valor : req.body.valor,
        logos_idLogo: req.body.idLogo  
    };

    atributo.ObtenerPorClave(atributosData.clave, atributosData.logos_idLogo, function(error, data) {
        if(data && !data.length){
            atributo.Guardar(atributosData, function(error, data) {
                if(!data && !data.insertId){
                    res.status(500).json({"msg":"Algo ocurrio"})
                }else{
                    res.status(200).json(data)
                }
            })
        }else{
            res.status(418).json({"msg":"Ya existe la calificacion"})
        }
    });
}

exports.CalificarCliente = function(req, res, next) {


    async.series({

        calificacion: function(callback) {
            
            var atributosData = {
                clave : 'calificacion-cliente',
                valor : req.body.calificacion,
                logos_idLogo: req.body.idLogo  
            };
        
            atributo.ObtenerPorClave(atributosData.clave, atributosData.logos_idLogo, function(error, data) {
                
                //console.log(data)
                if(data && !data.length){

                    atributo.Guardar(atributosData, function(error, data) {
                        if(!data && !data.insertId){
                            callback({500:"Algo ocurrio"})
                        }else{
                            callback(null,data)
                        }
                    })

                }else{

                    callback(null,data)
                
                }
            });

        },
        
        comentario: function(callback) {

            var atributosComentario = {
                clave : 'comentario',
                valor : req.body.comentario,
                logos_idLogo: req.body.idLogo  
            };
        
            atributo.ObtenerPorClave(atributosComentario.clave, atributosComentario.logos_idLogo, function(error, data) {
                
                //console.log(data)
                if(data && !data.length){

                    atributo.Guardar(atributosComentario, function(error, data) {
                        if(!data && !data.insertId){
                            callback({500:"Algo ocurrio"})
                        }else{
                            callback(null,data)
                        }
                    })

                }else{

                    callback(null,data)
                
                }
            });

        },

        
        
    }, function(err, results) {
        
        if (err) res.status(Object.keys(err)[0]).json(err[0]);

        res.status(200).json(results.calificacion)
    });




}