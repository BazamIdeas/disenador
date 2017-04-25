angular.module("disenador-de-logos")


/*-------------------------- Services --------------------------*/


.service('categoriasService', ["$http", function ($http) {


    this.listaCategorias = $http.get("/app/categorias");


    }])



.service('preferenciasService', ["$http", function ($http) {


    this.listaPreferencias = $http.get("/app/preferencias");


    }])


.service('elementosService', ["$http", function ($http) {

    this.listaSegunPref = function (datos) {

        return $http.post("/app/elementos/busqueda", datos)

        .then(function (res) {

            return res;

        }, function (res) {
            console.log("error");


        })

        .catch(function (res) {
            console.log("catch");


        })
    }
    }])




.service("pedidosService", ["$http", "$q", function ($http, $q) {


    this.nuevoPedido = function (logoSVG, idPagoPaypal, idCliente, idElemento) {
        
        var defered = $q.defer();
        
        var promise = defered.promise;
        
       
       
        datos = {
            idPago: idPagoPaypal,
            idCliente: idCliente,
            idElemento: idElemento,
            logo: logoSVG
        }

        $http.post("/pedido", datos).then(function(res){
            
            
             defered.resolve(res);
            
        }).catch(function(res){
            
             deferred.reject(res);
            
        })

        
        return promise;

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
