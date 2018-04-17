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
            if (!valido) return notificacionService.mensaje('Verifica los campos del formulario.');

            bz.peticion = true;
            bz.loaderCargando = true;

            clientesService.login(datos).then(function (res) {
                SweetAlert.swal("Genial", "Ingreso Exitoso!", "success");
                $state.go('app.cliente');
            }).catch(function () {
                bz.loaderCargando = false;
                SweetAlert.swal("Error al ingresar", "", "error");
            }).finally(function () {
                bz.peticion = false;
            })

        }

        bz.forgotPass = function (datos, v) {
            if (!v) return notificacionService.mensaje('Verifica los campos del formulario.');

            bz.peticion = true;
            bz.loaderCargando2 = true;

            clientesService.forgotPass(datos).then(function () {
                bz.rc = 2;
                bz.loaderCargando2 = false;
                notificacionService.mensaje('Codigo Enviado al correo.');
            }).catch(function () {
                bz.loaderCargando = false;
            }).finally(function () {
                bz.peticion = false;
            })

        }

        bz.confirmarToken = function (opcion, val) {

            if (opcion == 'cambiar') {
                if (!val) return;
                bz.peticion = true;
                clientesService.cambiarContrasena(bz.olvido).then(function (res) {
                    notificacionService.mensaje('Contrasena Cambiada!.');
                    var datos = {
                        correo: bz.olvido.correo,
                        pass: bz.olvido.pass
                    };
                    bz.loaderCargando2 = false;
                    bz.login(datos, true);

                }).catch(function (res) {
                    bz.loaderCargando2 = false;
                }).finally(function () {
                    bz.peticion = false;
                })

            } else {
                bz.peticion = true;
                clientesService.confirmarToken(bz.olvido.token).then(function (res) {
                    if (res) {
                        bz.rc = 3;
                        notificacionService.mensaje('Codigo confirmado.');
                    }
                }).catch(function (res) {
                    bz.loaderCargando = false;
                }).finally(function () {
                    bz.peticion = false;
                })

            }
        }
    }])