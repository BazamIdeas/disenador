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
        "pago" : "cliente/logos/descargar/",
        "nopago" : "pago/incompleto/",
        "paypal" : {
            "host" : "api.sandbox.paypal.com",        
            "client_id" : "AVpLm3Mj781_AAa4M5gArCwllQ2LIv5WT6qccHJOjdbOMFOz_6fQmItQQbCWvXeeG3TS1qBA6a8_8NoV",  // your paypal application client id
            "client_secret" : "EO-vJ68bnGFvig7xhITyMgtSYH24fb6tJqYL7VPFEdJ38B6cz0R6m-Bo3GMhYyVtCBkh6KLzW4k1KDlD" // your paypal application secret id
        },
        "stripe" : {
            "publicKey":"pk_test_ODlU80cwnJ5Xr2an9L1XZByL",
            "privateKey":"sk_test_AWXWsWaLekEXZ8LpZUG0w8gd"
        },
        "db" : {
            connectionLimit : 10,
            host: '79.137.72.204',
            user: 'disena',
            password: 'Esbz89%9',
            database: 'disenadorlogodb'
        },
        "mongo": {
            url: "mongodb+srv://cis:unaclavemuysegura5000@bazam-cgzwr.mongodb.net/admin",
            database: 'disenador'
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
        "pago" : "cliente/logos/descargar/",
        "nopago" : "pago/incompleto/",
        "paypal" : {
            "host" : "api.sandbox.paypal.com",           
            "client_id" : "AVpLm3Mj781_AAa4M5gArCwllQ2LIv5WT6qccHJOjdbOMFOz_6fQmItQQbCWvXeeG3TS1qBA6a8_8NoV",  // your paypal application client id
            "client_secret" : "EO-vJ68bnGFvig7xhITyMgtSYH24fb6tJqYL7VPFEdJ38B6cz0R6m-Bo3GMhYyVtCBkh6KLzW4k1KDlD" // your paypal application secret id
        },
        "stripe" : {
            "publicKey":"pk_test_ODlU80cwnJ5Xr2an9L1XZByL",
            "privateKey":"sk_test_AWXWsWaLekEXZ8LpZUG0w8gd"
        },
        "db" : {
            connectionLimit : 10,
            host: '45.32.148.99',
            user: 'logoPro',
            password: '&rJ-fZ:1uZ24',
            database: 'testdisenadorlogodb'
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
    },
     "test" : {
        "servidor" : "Test",
        "secret":"unaclavemuysegura",
    	"seguridad" :true,
    	"puerto" : "4001",
    	"url": "http://test.logo.pro",
        "base": "/creador-de-logos/", 
        "dashboard": "cliente/logos/",
        "pago" : "cliente/logos/descargar/",
        "nopago" : "pago/incompleto/",
        "paypal" : {
            "host" : "api.sandbox.paypal.com",           
            "client_id" : "AVpLm3Mj781_AAa4M5gArCwllQ2LIv5WT6qccHJOjdbOMFOz_6fQmItQQbCWvXeeG3TS1qBA6a8_8NoV",  // your paypal application client id
            "client_secret" : "EO-vJ68bnGFvig7xhITyMgtSYH24fb6tJqYL7VPFEdJ38B6cz0R6m-Bo3GMhYyVtCBkh6KLzW4k1KDlD" // your paypal application secret id
        },
        "stripe" : {
            "publicKey":"pk_test_ODlU80cwnJ5Xr2an9L1XZByL",
            "privateKey":"sk_test_AWXWsWaLekEXZ8LpZUG0w8gd"
        },
        "db" : {
            connectionLimit : 10,
            host: '45.32.148.99',
            user: 'logoPro',
            password: '&rJ-fZ:1uZ24',
            database: 'testdisenadorlogodb'
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