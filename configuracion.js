
var node_env = process.env.NODE_ENV || 'desarrollo';

var configuracion = {
    "produccion" : {
        "secret":"unaclavemuysegura",
    	"seguridad" : true,
    	"puerto" : "4001",
    	"url": "front.liderlogo.info",
    	"dashboard": "/creador-de-logos#!/area-del-cliente",
        "paypal" : {
        "host" : "api.sandbox.paypal.com",
        "port" : "",            
        "client_id" : "AVpLm3Mj781_AAa4M5gArCwllQ2LIv5WT6qccHJOjdbOMFOz_6fQmItQQbCWvXeeG3TS1qBA6a8_8NoV",  // your paypal application client id
        "client_secret" : "EO-vJ68bnGFvig7xhITyMgtSYH24fb6tJqYL7VPFEdJ38B6cz0R6m-Bo3GMhYyVtCBkh6KLzW4k1KDlD" // your paypal application secret id
      }
    },

    "desarrollo" : {
        "secret":"unaclavemuysegura",
    	"seguridad" :true,
    	"puerto" : "8080",
    	"url": "http://localhost:8080",
    	"dashboard": "/app/prueba",
    	"paypal" : {
        "host" : "api.sandbox.paypal.com",
        "port" : "",            
        "client_id" : "AVpLm3Mj781_AAa4M5gArCwllQ2LIv5WT6qccHJOjdbOMFOz_6fQmItQQbCWvXeeG3TS1qBA6a8_8NoV",  // your paypal application client id
        "client_secret" : "EO-vJ68bnGFvig7xhITyMgtSYH24fb6tJqYL7VPFEdJ38B6cz0R6m-Bo3GMhYyVtCBkh6KLzW4k1KDlD" // your paypal application secret id
      }
    }
}


module.exports = configuracion[node_env];