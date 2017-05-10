angular.module("disenador-de-logos")

/* login */


.controller('loginController', ['$scope', '$http', '$rootScope', '$state', "$stateParams", "clientesService", "SweetAlert", function ($scope, $http, $rootScope, $state, $stateParams, clientesService, SweetAlert) {

    var bz = this;

    this.datos = {

        registrar: {},
        login: {}

    };
    
    bz.loaderCargando = false;
    this.registrar = function (datos) {

        /*  Auth.$createUserWithEmailAndPassword(datos.correo, datos.pass)
              .then(function (firebaseUser) {

                  console.error(firebaseUser);

              }).catch(function (error) {
                  console.error(error);
              });
              */


        bz.loaderCargando = true;
        clientesService.registrar(datos).then(function (res) {
            console.log(res + 'funciono')
        })

        .catch(function (res) {

            SweetAlert.swal("Error al registrar", "Revisa tu conexion a internet!", "error");

        })

    }


    this.login = function (metodo, datos, valido) {
        if (valido) {
            bz.loaderCargando = true;
            clientesService.login(metodo, datos).then(function (res) {


                if ($stateParams.destino) {

                    if ($stateParams.origen == "editor" && $stateParams.destino == "metodo") {

                        $state.go($stateParams.destino, $stateParams.parametrosDestino);

                    } else {

                        $state.go($stateParams.destino);
                    }

                } else {
                    SweetAlert.swal({
                            title: "Te has logueado con Exito", //Bold text
                            text: "A donde deseas ir?", //light text
                            type: "success", //type -- adds appropiriate icon
                            showCancelButton: true, // displays cancel btton
                            confirmButtonColor: "#283593",
                            cancelButtonColor: "#283593",
                            confirmButtonText: "Mis logos",
                            cancelButtonText: "Comenzar!",
                            closeOnConfirm: true,
                            closeOnCancel: true
                        },
                        function (isConfirm) { //Function that triggers on user action.
                            if (isConfirm) {
                                $state.go('dashboard')
                            } else {
                                $state.go('comenzar')
                            }
                        })
                }

            }).catch(function (res) {
                SweetAlert.swal("Error al ingresar", "Revisa tu conexion a internet!", "error");
                console.error("Authentication failed:", res);

            })
        }

    }

    this.mostrarForm = 1;



}])
