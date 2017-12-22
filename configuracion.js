var node_env = process.env.NODE_ENV || 'desarrollo';

var configuracion = {
    "produccion" : {
        "servidor" : "Produccion",
        "secret":"unaclavemuysegura",
    	"seguridad" : true,
    	"puerto" : "4001",
    	"url": "front.liderlogo.info",
        "base" "/creador-de-logos",
    	"dashboard": "/creador-de-logos/area-del-cliente",
        "pago" : "/creador-de-logos#!/pago/completo/",
        "nopago" : "/creador-de-logos#!/pago/incompleto/",
        "paypal" : {
            "host" : "api.sandbox.paypal.com",        
            "client_id" : "AVpLm3Mj781_AAa4M5gArCwllQ2LIv5WT6qccHJOjdbOMFOz_6fQmItQQbCWvXeeG3TS1qBA6a8_8NoV",  // your paypal application client id
            "client_secret" : "EO-vJ68bnGFvig7xhITyMgtSYH24fb6tJqYL7VPFEdJ38B6cz0R6m-Bo3GMhYyVtCBkh6KLzW4k1KDlD" // your paypal application secret id
        },
        "db" : {
            connectionLimit : 10,
            host: '79.137.72.204',
            user: 'disena',
            password: 'Esbz89%9',
            database: 'disenadorlogodb'
        }
    },

    "desarrollo" : {
        "servidor" : "Desarrollo",
        "secret":"unaclavemuysegura",
    	"seguridad" :true,
    	"puerto" : "8080",
    	"url": "http://localhost:8080",
        "base" "/creador-de-logos",
    	"dashboard": "/creador-de-logos/area-del-cliente",
        "pago" : "/creador-de-logos#!/pago/completo/",
        "nopago" : "/creador-de-logos#!/pago/incompleto/",
    	"paypal" : {
            "host" : "api.sandbox.paypal.com",           
            "client_id" : "AVpLm3Mj781_AAa4M5gArCwllQ2LIv5WT6qccHJOjdbOMFOz_6fQmItQQbCWvXeeG3TS1qBA6a8_8NoV",  // your paypal application client id
            "client_secret" : "EO-vJ68bnGFvig7xhITyMgtSYH24fb6tJqYL7VPFEdJ38B6cz0R6m-Bo3GMhYyVtCBkh6KLzW4k1KDlD" // your paypal application secret id
        },
        "db" : {
            connectionLimit : 10,
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'disenadorlogodb'
        }
    }
}

module.exports = configuracion[node_env];