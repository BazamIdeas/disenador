angular.module("disenador-de-logos")


/*-------------------------- Services --------------------------*/


/***************************/
/*******CATEGORIAS**********/
/***************************/

.service('categoriasService', ["$http", function ($http) {


    this.listaCategorias = $http.get("/app/categorias");


    }])



/***************************/
/******PREFERENCIAS*********/
/***************************/

.service('preferenciasService', ["$http", function ($http) {


    this.listaPreferencias = $http.get("/app/preferencias");


    }])


/***************************/
/*********ELEMENTOS*********/
/***************************/



.service('elementosService', ["$http", function ($http) {

    this.listaSegunPref = function (datos) {

        return $http.post("/app/elementos/busqueda", datos)

        .then(function (res) {

            return res;

        })

        .catch(function (res) {
            console.log("catch");


        })
    }
    }])


/*********************/
/********PEDIDOS******/
/*********************/

.service("pedidosService", ["$http", "$q", "Auth",  function ($http, $q, Auth) {

    this.idCliente = 1;

    this.paypal = function (tipoPago, logoSVG, idElemento, tTarjeta = false, nTarjeta = false, expire_month = false, expire_year = false) {

        var defered = $q.defer();

        var promise = defered.promise;


        datos = {
            token: Auth.$getAuth().Pd,
            idElemento: idElemento,
            logo: logoSVG,
            idPrecio: 1,
            localidad: 'nulo',
            tipoLogo: "Logo y nombre",
            tipoPago: tipoPago
        }

        if (tipoPago == "credit_card") {

            datos.tTarjeta = tTarjeta;
            datos.nTarjeta = nTarjeta;
            datos.expire_month = expire_month;
            datos.expire_year = expire_year;

        }

        $http.post("/app/pedido", datos).then(function (res) {

            
            defered.resolve(res);

        }).catch(function (res) {

            defered.reject(res);

        })


        return promise;

    }


}])

/***************************************/
/***************CLIENTES****************/
/***************************************/



.service('clientesService', ['$http', '$q', 'Auth', function ($http, $q, Auth) {


    this.registrar = function (datos) {

        var defered = $q.defer();

        var promise = defered.promise;

        Auth.$createUserWithEmailAndPassword(datos.correo, datos.pass)
            .then(function (firebaseUser) {
                
                datos.uid = firebaseUser.uid;
            
                $http.post("/app/cliente", datos).then(function (res) {

                        defered.resolve(res);

                    })
                    .catch(function (res) {

                        defered.reject(res);
                    })


            }).catch(function (res) {
                defered.reject(res)
            });

        return promise;


    }

    this.login = function (metodo, datos = false) {

        var defered = $q.defer();

        var promise = defered.promise;


        Auth.$signInWithEmailAndPassword(datos.correo, datos.pass).then(function (firebaseUser) {

            defered.resolve(firebaseUser);

        })

        .catch(function (res) {

            defered.reject(res);

        })

        return promise;

    }


    this.salir = function () {

        Auth.$signOut()

    }


}])



/*--------------------------- Factories aislados ------------------*/

.factory('compararLogosFactory', [function () {

    var logos = {

        comparar: [],
        comprar: ""

    };

    var informacion = {

        definir: function (valor, tipo) {

            if (tipo == "comprar") {

                logos.comprar = valor;

            } else if (tipo == "comparar")

            {
                logos.comparar.push(valor)
            }



        },

        obtener: function (tipo) {

            if (tipo == "comprar") {

                return logos.comprar;

            } else if (tipo == "comparar") {
                return logos.comparar;
            }
        }

    }

    return informacion;



    }])

.factory('compartirFactory', [function () {
    var estados = [];
    var informacion = {
        definir: function (nombre, valor) {
            estados[nombre] = valor;
        },
        obtener: function (nombre) {
            return estados[nombre];
        }
    }
    return informacion;
    }])

.factory('crearLogoFactory', [function () {

    var logos = [];

    var crear = function (iconos, fuentes) {

        angular.forEach(iconos, function (icono, indice) {

            angular.forEach(fuentes, function (fuente, indice) {

                var logo = {

                    icono: icono,
                    fuente: fuente

                };

                logos.push(logo);

            })

        })

        return logos;

    }

    return crear;

    }])

.factory('LS', ['$window', '$rootScope', function ($window, $rootScope) {
    return {
        definir: function (llave, valor) {
            $window.localStorage.setItem(llave, JSON.stringify(valor));
            return this;
        },
        obtener: function (llave) {
            return $window.localStorage.getItem(llave);
        }
    };

    }])

.factory("Auth", ["$firebaseAuth",
                      function ($firebaseAuth) {
        return $firebaseAuth();
                      }])


/*********************/
/***** Logos *********/
/*********************/

.service("logosService", ["$http", "$q", "Auth", function ($http, $q, Auth) {
    

    this.guardarLogo = function (idLogo, estado, logo, tipoLogo, firebaseUser, idElemento) {
        
        var defered = $q.defer();

        var promise = defered.promise;
        
        var datos = {
            idlogo: idLogo,
            estado: estado,
            logo: logo,
            tipoLogo: tipoLogo,
            token: firebaseUser.Pd,
            idElemento: idElemento,
        }

        $http.post("/app/logo/guardar", datos).then(function (res) {


            defered.resolve(res);

        }).catch(function (res) {

            defered.reject(res);

        })


        return promise;

    }


    this.mostrarGuardados = function (token) {

        var defered = $q.defer();

        var promise = defered.promise;
        

        $http.post("/app/logos/guardados", {token: token}).then(function (res) {


            defered.resolve(res);

        }).catch(function (res) {

            defered.reject(res);

        })


        return promise;

    }

    this.mostrarComprados = function (token) {

        var defered = $q.defer();

        var promise = defered.promise;

        $http.post("/app/logos/descargables", {token: token}).then(function (res) {


            defered.resolve(res);

        }).catch(function (res) {

            defered.reject(res);

        })

        return promise;
    }

}])
