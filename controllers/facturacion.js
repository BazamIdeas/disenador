var facturacion = require('../modelos/facturacionesModelo.js');

exports.Nuevo = function(req, res, next)
{
    var datosFacturacion = {
        medio: req.body.medio,
        correo: req.body.correo,
        clientes_idCliente: req.body.idCliente 
    }

    facturacion.Nuevo(datosFacturacion, function(error,data){
        if(typeof data !== 'undefined' && data.insertId){
            res.status(200).json(data);
        }else{
            res.status(500).json({msg:"Algo ocurrio"})
        }
    })
}

exports.Actualizar = function(req, res, next)
{
    var datosFacturacion = {
        medio: req.body.medio,
        correo: req.body.correo,
    }

    facturacion.Actualizar(idFacturacion, datosFacturacion, function(error,data){
        if(typeof data !== 'undefined' && data.affectedRows){
            res.status(200).json(data);
        }else{
            res.status(500).json({msg:"Algo ocurrio"})
        }
    })
}