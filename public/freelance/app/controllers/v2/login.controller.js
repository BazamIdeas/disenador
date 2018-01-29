angular.module("disenador-de-logos")

    /* Editor */

    .controller('loginController', ["clientesService", "$state", "$mdToast", "$timeout", "paisesValue", function (clientesService, $state, $mdToast, $timeout, paisesValue) {

        var bz = this;

        bz.paises = paisesValue;

        bz.paisDefecto = null;

        clientesService.pais().then(function (res) {

            bz.paisDefecto = res.iso;

        })


        bz.datosRegistro = {};
        bz.datosLogin = {};


        bz.completadoLogin = true;

        bz.login = function (datos, valido) {

            if (valido && bz.completadoLogin) {

                bz.completadoLogin = false;


                clientesService.login(datos).then(function (res) {

                    if (clientesService.autorizado(true)) {

                        $mdToast.show($mdToast.base({
                            args: {
                                mensaje: '¡Bienvenido!',
                                clase: "success"
                            }
                        }));

                        $state.go("logos");

                    }

                }).catch(function () {

                    $mdToast.show($mdToast.base({
                        args: {
                            mensaje: 'Verifica tu Usuario y Contraseña',
                            clase: "danger"
                        }
                    }));


                }).finally(function () {


                    bz.completadoLogin = true;


                })

            };

        };


        bz.completadoRegistro = true;

        bz.registrar = function (datos, valido) {

            if (valido && bz.completadoRegistro) {

                bz.completadoRegistro = false;

                clientesService.registrar(datos.nombreCliente, datos.correo, datos.pass, datos.telefono, datos.pais).then(function (res) {

                    if (clientesService.autorizado(true)) {

                        $mdToast.show($mdToast.base({
                            args: {
                                mensaje: '¡Registro exitoso!',
                                clase: "success"
                            }
                        }));

                        $state.go("logos");

                    }

                }).catch(function () {

                    $mdToast.show($mdToast.base({
                        args: {
                            mensaje: 'Un error ha ocurrido',
                            clase: "danger"
                        }
                    }));


                }).finally(function () {

                    bz.completadoRegistro = true;

                })

            };

        }


    }])
