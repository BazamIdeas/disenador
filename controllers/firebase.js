var admin = require("firebase-admin");
var cliente=require('../modelos/clientesModelo.js');
var configuracion = require("../configuracion.js");
var serviceAccount = require("../disenador-d5b62fb393d6.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://disenador-c5d8f.firebaseio.com"
});


/*var config = {
    apiKey: "AIzaSyCs7eX86t3KIQm4H-32pd8_hOwsGNGmpo0",
    authDomain: "disenador-c5d8f.firebaseapp.com",
    databaseURL: "https://disenador-c5d8f.firebaseio.com",
    projectId: "disenador-c5d8f",
    storageBucket: "disenador-c5d8f.appspot.com",
    messagingSenderId: "1055336431388"

firebase.initializeApp(config);
};*/






exports.crearCliente = function (req, res) {

    var email = req.body.correo;
    var pass = req.body.pass;



    //var serviceAccount = require("./prueba-064cb79dba28.json");

    admin.auth().createUserWithEmailAndPassword(email, pass)
        .then(user => res.status(200).send('exito'))
        .catch(error => res.status(500).send('error'));


}


exports.autenticarCliente = function (req, res) {
    var email = req.body.correo;
    var pass = req.body.pass;

    firebase.auth().signInWithEmailAndPassword(email, pass)
        .then(user => res.status(200).send(user))
        .catch(error => res.status(500).send(error));
}

exports.comprobarEstadoCliente = function (req, res, next) {

    if (configuracion.seguridad){
    var token = req.body.token;
    console.log(token)

    admin.auth().verifyIdToken(req.body.token)
        .then(function (decodedToken) {
            var uid = decodedToken.uid
            console.log(uid)
            cliente.obtenerIdCliente(uid,function(error, data)
            {
            //si el cliente existe 
            if (typeof data !== 'undefined' && data.length > 0)
            {
                
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
        req.idCliente = 3;
        next();
    }
}





exports.salirSesionCliente = function (req, res) {
    var email = req.body.correo;
    var pass = req.body.pass;
    firebase.auth().signOut().then(function () {
        res.status(200).send('sesion destruida');
    }, function (error) {
        res.status(500).send(error);
    });


}


/*
exports.prueba = function(){

	var email = req.body.correo;
 	var pass = req.body.pass;
 	
 	var admin = require("firebase-admin");
	
	


	admin.initializeApp({
  credential: admin.credential.cert({
    projectId: "prueba-b81ec",
    clientEmail: "prueba@prueba-b81ec.iam.gserviceaccount.com.iam.gserviceaccount.com",
    privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCpRknpvRsKuDuY\n-----END PRIVATE KEY-----\n"
  }),
  databaseURL: "https://prueba-b81ec.firebaseio.com"
});
	admin.initializeApp({
	  credential: admin.credential.cert(serviceAccount),
	  databaseURL: "https://prueba-b81ec.firebaseio.com"
	});
admin.auth().createUserWithEmailAndPassword(email,password).then(function(userRecord) {
    res.status(200).send('fionoo');
    console.log("Successfully created new user:", userRecord.uid);
  }).catch(function(error) {

  	res.status(500).send('fallo!');
    console.log("Error creating new user:", error);
  });

}
*/
