angular.module("administrador")

    .controller('loginController', ['$scope', '$http', '$rootScope', '$state', "$stateParams", "clientesService", 'SweetAlert', 'notificacionService', function ($scope, $http, $rootScope, $state, $stateParams, clientesService, SweetAlert, notificacionService) {

        var bz = this;

        bz.loaderCargando = false;

        /* objeto datos vacios */
        bz.datosRegistro = {};
        bz.datosLogin = {};
        bz.olvido = {
            tipo: 'usuario'
        };

        /* FUNCION LOGIN */

        this.login = function (datos, valido) {
            if (valido) {
                bz.loaderCargando = true;
                clientesService.login(datos).then(function (res) {
                    SweetAlert.swal("Genial", "Ingreso Exitoso!", "success");
                    $state.go('cliente')
                }).catch(function (res) {
                    bz.loaderCargando = false;
                    SweetAlert.swal("Error al ingresar", "", "error");
                    console.error("Authentication failed:", res);
                })
            }
        }

        this.forgotPass = function (datos) {
            bz.loaderCargando = true;
            clientesService.forgotPass(datos).then(function (res) {
                console.log(res)
            }).catch(function (res) {
                bz.loaderCargando = false;
                console.error(res);
            })
        }
    }])