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

.service("pedidosService", ["$http", "$q", '$rootScope', function ($http, $q, $rootScope) {

    this.paypal = function (tipoPago, logoSVG, idElemento, tTarjeta = false, nTarjeta = false, expire_month = false, expire_year = false) {

        var defered = $q.defer();

        var promise = defered.promise;

        var datos = {
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



.service('clientesService', ['$http', '$q', '$window', '$rootScope', function ($http, $q, $window, $rootScope) {


    this.registrar = function (datos) {

        var defered = $q.defer();

        var promise = defered.promise;

        $http.post("/app/cliente", datos).then(function (res) {

                defered.resolve(res);

            })
            .catch(function (res) {

                defered.reject(res);
            })

        return promise;

    }

    this.login = function (datos) {

        var defered = $q.defer();

        var promise = defered.promise;

        $http.post("/app/cliente/login", datos)

        .then(function (res) {

                $window.localStorage.setItem('bzToken', JSON.stringify(res.data));
                $rootScope.objectoCliente = res.data;

                defered.resolve();

            })
            .catch(function (res) {
                $window.localStorage.removeItem('bzToken');
                defered.reject()
            })


        return promise;

    }

    this.autorizado = function () {

        if ($rootScope.objectoCliente) {

            return $rootScope.objectoCliente;

        } else {

            if ($window.localStorage.getItem('bzToken')) {

                $rootScope.objectoCliente = JSON.parse($window.localStorage.getItem('bzToken'));

                return $rootScope.objectoCliente;

            } else {

                return false;

            }

        }

    }

    this.salir = function () {

        $rootScope.objectoCliente = false;
        $window.localStorage.removeItem('bzToken');

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



/*********************/
/***** Logos *********/
/*********************/

.service("logosService", ["$http", "$q", function ($http, $q, clientesService) {


    this.guardarLogo = function (idLogo, estado, logo, tipoLogo,idElemento) {

        var defered = $q.defer();

        var promise = defered.promise;

        var datos = {
            idlogo: idLogo,
            estado: estado,
            logo: logo,
            tipoLogo: tipoLogo,
            idElemento: idElemento,
        }

        $http.post("/app/logo/guardar", datos).then(function (res) {

            defered.resolve(res);

        }).catch(function (res) {

            defered.reject(res);

        })


        return promise;

    }


    this.mostrarGuardados = function(){
        
         return $http.post("/app/logos/guardados/");

    }

    this.mostrarComprados = function(){
        
         return $http.post("/app/logos/descargables/");

    }

    this.descargarLogo = function (idLogo, ancho) {

        var defered = $q.defer();

        var promise = defered.promise;

        var datos = {
            idLogo: idLogo,
            ancho: ancho
        }

        $http.post("/app/logo/descargar/", datos).then(function (res) {

            defered.resolve(res);

        }).catch(function (res) {

            defered.reject(res);

        })

        return promise;

    }

}])

.factory('AuthInterceptor', function ($window, $q, $rootScope) {
    function salir() {
        $rootScope.objectoCliente = false;
        $window.localStorage.removeItem('bzToken');
    }
    function autorizado() {
        if ($rootScope.objectoCliente) {
            return $rootScope.objectoCliente;
        } else {
            if ($window.localStorage.getItem('bzToken')) {
                $rootScope.objectoCliente = JSON.parse($window.localStorage.getItem('bzToken'));
                return $rootScope.objectoCliente;
            } else {
                return false;
            }
        }
    }
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if (autorizado()) {
                config.headers.auth = autorizado().token;
            }
            return config || $q.when(config);
        },
        response: function (response) {
            if (response.status === 401 || response.status === 403) {
                salir();
            }
            return response || $q.when(response);
        }
    };
});