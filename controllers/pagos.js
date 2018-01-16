var pago = require('../modelos/pagosModelo.js');

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