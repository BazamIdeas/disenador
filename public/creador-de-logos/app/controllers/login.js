angular.module("disenador-de-logos")

/* login */


.controller('loginController', ['$scope', '$http', '$rootScope', '$state', "$stateParams", "clientesService", "SweetAlert", function ($scope, $http, $rootScope, $state, $stateParams, clientesService, SweetAlert) {

    var bz = this;

    bz.loaderCargando = false;

    /* objeto datos vacios */
    this.datos = {

        registrar: {},
        login: {}

    }; 
    
    /* FUNCION REGISTRAR */
    
     this.registrar = function (datos) {

        bz.loaderCargando = true;
        clientesService.registrar(datos).then(function (res) {
            console.log(res + 'funciono')
        })

        .catch(function (res) {

            SweetAlert.swal("Error al registrar", "Revisa tu conexion a internet!", "error");

        })

    }
     
    /* FUNCION LOGIN */
    
    this.login = function (datos, valido) {

        if (valido) {

            bz.loaderCargando = true;

            clientesService.login(datos).then(function (res) {

                if ($stateParams.destino) {
                    

                    if ($stateParams.origen == "editor" && $stateParams.destino == "metodo") {

                        $state.go($stateParams.destino, $stateParams.parametrosDestino);

                    } else if ($stateParams.origen == "editor" && $stateParams.destino == "editor") {
                        
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
