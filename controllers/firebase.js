
var firebase = require("firebase");
	var config = {
 			apiKey: "AIzaSyCGZ1F7ECeL2D9M0RyqjwqigoCjqo0vu0o",
 			authDomain: "prueba-b81ec.firebaseapp.com",
 	 		databaseURL: "https://prueba-b81ec.firebaseio.com"
 
		};

	firebase.initializeApp(config);





exports.crearCliente = function(req,res){	

	var email = req.body.correo;
 	 var pass = req.body.pass;



	//var serviceAccount = require("./prueba-064cb79dba28.json");

	firebase.auth().createUserWithEmailAndPassword(email, pass)
    .then(user => res.status(200).send('exito') )
    .catch(error => res.status(500).send('error') );

		
	}


exports.autenticarCliente = function(req,res){
	var email = req.body.correo;
 	 var pass = req.body.pass;

	firebase.auth().signInWithEmailAndPassword(email, pass)
	.then(user => res.status(200).send(user))
	.catch(error => res.status(500).send(error));
	}	

exports.comprobarEstadoCliente=function(req,res){

}

exports.salirSesionCliente = function(req,res){
	var email = req.body.correo;
 	 var pass = req.body.pass;
firebase.auth().signOut().then(function() {
   res.status(200).send('sesion destruida');
}, function(error) {
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