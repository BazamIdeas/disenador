var node_env = process.env.NODE_ENV || 'desarrollo';

var configuracion = {
    "produccion" : {
        "servidor" : "Produccion",
        "secret":"unaclavemuysegura",
    	"seguridad" : true,
    	"puerto" : "4001",
    	"url": "http://front.liderlogo.info",
        "base": "/creador-de-logos/",
    	"dashboard": "cliente/logos",
        "pago" : "pago/completo/",
        "nopago" : "pago/incompleto/",
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
        },
        freelancer: {
            moderador: {
                1: 2.99,
                2: 3.99,
                3: 4.99,
                4: 5.99,
                5: 6.99
            },
            cliente: {
                1: 2.99,
                2: 3.99,
                3: 4.99,
                4: 5.99,
                5: 6.99	
            },
            minimo: 300.99
        }
    },

    "desarrollo" : {
        "servidor" : "Desarrollo",
        "secret":"unaclavemuysegura",
    	"seguridad" :true,
    	"puerto" : "8080",
    	"url": "http://localhost:8080",
        "base": "/creador-de-logos/",
    	"dashboard": "cliente/logos/",
        "pago" : "pago/completo/",
        "nopago" : "pago/incompleto/",
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
        },
        "mongo": {
            url: "mongodb+srv://cis:unaclavemuysegura5000@bazam-cgzwr.mongodb.net/admin",
            database: 'disenador'
        },
        freelancer: {
            moderador: {
                1: 2,
                2: 3,
                3: 4,
                4: 5,
                5: 6,
            },
            cliente: {
                1: 2,
                2: 3,
                3: 4,
                4: 5,
                5: 6,	
            },
            minimo: 300
        }
    }
}


module.exports = configuracion[node_env];