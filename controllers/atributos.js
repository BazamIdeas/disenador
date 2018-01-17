var atributo = require('../modelos/atributosModelo.js');

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
        clave : 'calificacion-cliente',
        valor : req.body.valor,
        logos_idLogo: req.body.idLogo  
    };

    atributo.ObtenerPorClave(atributosData.clave, function(error, data) {
        if(!data && !data.insertId){
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
    var atributosData = {
        clave : 'calificacion-cliente',
        valor : req.body.valor,
        logos_idLogo: req.body.idLogo  
    };

    atributo.ObtenerPorClave(atributosData.clave, function(error, data) {
        if(!data && !data.insertId){
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