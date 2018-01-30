var caracteristica = require('../modelos/caracteristicasModelo.js');
var async = require("async");


exports.Nuevo = function(req, res, next)
{
    var caracteristicasData = {
        clave : req.body.clave,
        valor : req.body.valor,
        descripcion : req.body.descripcion,
        planes_idPlan : req.body.idPlan  
    };

    caracteristica.Guardar(atributosData, function(error, data) {
        if(!data && !data.insertId){
            res.status(500).json({"msg":"Algo ocurrio"})
        }else{
            res.status(200).json(data)
        }
    })
}

exports.Nuevos = function(req, res, next)
{
    var caracteristicas = req.body.caracteristicas;
    var inserts_ids = [];

    async.forEachOf(caracteristicas, (carac, key, callback) => {

        var caracteristicasData = {
            clave : carac.clave,
            valor : carac.valor,
            descripcion : carac.descripcion,
            planes_idPlan : carac.idPlan  
        };

        caracteristica.Guardar(catacteristicasData, function(error, data) {
            console.log(data)
            if(data && data.insertId){
                inserts_ids.push(data.insertId);
                
            }
            
        })

        callback()

    }, function(err) {
        if (err) console.error(err.message);
        res.status(200).json({inserts_ids : inserts_ids})
    })
}