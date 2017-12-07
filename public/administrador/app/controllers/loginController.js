angular.module("administrador")

    .controller('loginController', ['$scope', '$http', '$rootScope', '$state', "$stateParams", "clientesService", 'SweetAlert', 'notificacionService', function ($scope, $http, $rootScope, $state, $stateParams, clientesService, SweetAlert, notificacionService) {

        var bz = this;

        bz.loaderCargando = false;

        /* objeto datos vacios */
        bz.datosRegistro = {};
        bz.datosLogin = {};
        bz.olvido = {
            tipo: 'admin'
        };

        bz.rc = 1;

        /* FUNCION LOGIN */

        bz.login = function (datos, valido) {
            console.log(datos)
            if (valido) {
                bz.loaderCargando = true;
                clientesService.login(datos).then(function (res) {
                    SweetAlert.swal("Genial", "Ingreso Exitoso!", "success");
                    $state.go('cliente');
                }).catch(function (res) {
                    bz.loaderCargando = false;
                    SweetAlert.swal("Error al ingresar", "", "error");
                    console.error("Authentication failed:", res);
                })
            }
        }

        bz.forgotPass = function (datos, v) {
            if (v) {
                bz.loaderCargando2 = true;
                clientesService.forgotPass(datos).then(function (res) {
                    bz.rc = 2;
                    bz.loaderCargando2 = false;
                    notificacionService.mensaje('Codigo Enviado al correo.');
                }).catch(function (res) {
                    bz.loaderCargando = false;
                    console.error(res);
                })
            }
        }

        bz.confirmarToken = function (opcion, val) {

            if (opcion == 'cambiar') {
                if (val) {
                    clientesService.cambiarContrasena(bz.olvido).then(function (res) {
                        notificacionService.mensaje('Contrasena Cambiada!.');
                        datos = {
                            correo: bz.olvido.correo,
                            pass: bz.olvido.pass
                        };
                        bz.loaderCargando2 = false;
                        bz.login(datos, true);

                    }).catch(function (res) {
                        console.error(res);
                        bz.loaderCargando2 = false;
                    })
                }
            } else {

                clientesService.confirmarToken(bz.olvido.token).then(function (res) {
                    if (res) {
                        bz.rc = 3;
                        notificacionService.mensaje('Codigo confirmado.');
                    }
                }).catch(function (res) {
                    bz.loaderCargando = false;
                    console.error(res);
                })

            }
        }
    }])