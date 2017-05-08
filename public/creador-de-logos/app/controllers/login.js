angular.module("disenador-de-logos")

/* login */


.controller('loginController', ['$scope', '$http', '$rootScope', '$state', "$stateParams", "clientesService", function ($scope, $http, $rootScope, $state, $stateParams, clientesService) {


    this.salir = function () {
        clientesService.salir();
    }


    this.datos = {

        registrar: {},
        login: {}

    };

    this.registrar = function (datos) {

        /*  Auth.$createUserWithEmailAndPassword(datos.correo, datos.pass)
              .then(function (firebaseUser) {

                  console.error(firebaseUser);

              }).catch(function (error) {
                  console.error(error);
              });
              */

        clientesService.registrar(datos).then(function (res) {

            console.log("funciono")

        })

        .catch(function (res) {

            console.log("fallo")

        })

    }


    this.login = function (metodo, datos, valido) {

        if (valido) {
            
            clientesService.login(metodo, datos).then(function (res) {

                if ($stateParams.destino) {

                    if ($stateParams.origen == "editor" && $stateParams.destino == "metodo") {

                        $state.go($stateParams.destino, $stateParams.parametrosDestino);

                    } else {

                        $state.go($stateParams.destino);
                    }

                } else {
                    console.log("algo")

                }

            }).catch(function (res) {

                console.error("Authentication failed:", res);

            })
        }

    }

    this.mostrarForm = 1;



}])