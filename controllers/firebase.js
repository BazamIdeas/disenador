var admin = require("firebase-admin");
var cliente=require('../modelos/clientesModelo.js');
var configuracion = require("../configuracion.js");
var serviceAccount = require("../disenador-d5b62fb393d6.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://disenador-c5d8f.firebaseio.com"
});


exports.comprobarEstado = function (req, res, next) {

    if (configuracion.seguridad){
        var token = req.body.token
    console.log(req.body)

    admin.auth().verifyIdToken(token)
        .then(function (decodedToken) {
            
            var uid = decodedToken.uid
            console.log(uid)
            cliente.obtenerIdCliente(uid,function(error, data)
            {
            //si el cliente existe 
            if (typeof data !== 'undefined' && data.length > 0)
            {
                req.idCliente = data[0].idCliente;
                next()
            }
        //no existe
            else
            {
                res.status(404).json({"msg":"error de uid"})
            }
             });         
            // ...
        }).catch(function (error) {
            res.status(500).json(error);
        });
    }
    else{
        req.idCliente = 1;
        req.idUsuario = 1;
        next();
    }
}



exports.comprobar = function (req, res, next) {

    console.log('Cookies: ', req.cookies)
}






