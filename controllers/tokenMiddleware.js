
var jwt = require('jwt-simple');
var moment = require('moment');

exports.aad = function(req,res){

	
	
		var jwt = require('jwt-simple');
		var moment = require ('moment');
		var z = jwt.decode(req.token,'misecretoken');
		res.status(200).send(z);
	/*
	*/
	

}


exports.auntentificarToken = function(req,res,next){
	
			if(typeof req.token !== 'undefined' && req.token.length > 0){
				
				var token = req.token;
				var z = jwt.decode(token,'misecretoken');
			
					if(z.exp <= moment().unix()){
						
						res.status(403).send('super sesion expirada');
					
							}else{
					
								res.status(200).send(z);
				
							}
								
							}else{

				

	var payload = {
					sub:req.datos,
					iat:moment().unix(),
					exp:moment().add(1,'days').unix()
				};
				var x = jwt.encode(payload,'misecretoken');
				res.status(200).send(x);
			}
		}



exports.prueba = function(req,res){	
	
		var token = req.token;
		var z = jwt.decode(token,'misecretoken');

	res.status(200).send(z);

}


