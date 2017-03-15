var jwt = require('jwt-simple');
var moment = require ('moment');
var auth = require('./usuarios.js');

exports.auntentificarToken = function(req,res,next){

	if(!req.z){
		res.send('no tienes autorizacion');
		console.log('no tienes autorizacion');
	}

	var token = header.authorization.split(" ")[1];
	var payload = jwt.decode(token,"misecretoken")
	if(payload.exp < moment().unix()){
		res.send('super sesion expirada');
	}

	req.user = payload.sub
	next();

}



