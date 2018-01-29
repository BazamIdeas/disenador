angular.module("disenador-de-logos")

    /* Editor */

    .controller('cuentaController', ["$scope", "$state", "pedidosService", "clientesService", "$mdToast", "paisesValue", function ($scope, $state, pedidosService, clientesService, $mdToast, paisesValue) {

        var bz = this;

        bz.formulario = 1;

        bz.paises = paisesValue;

        //bz.pedidos = [];
        bz.facturacion = [];
        bz.datos = {};
        bz.datosEspejo = {};
        bz.datosMetodo = {};

        clientesService.datos(true).then(function (res) {

            if (res.facturacion) {
                bz.facturacion = angular.copy(res.facturacion);
                delete res.facturacion;
            }

            bz.datos = res;
        });


        bz.editar = function (datos) {

            bz.datosEspejo = angular.copy(datos);
            bz.formulario = 2;

        }


        bz.completado = true;

        bz.guardar = function (datos, valido) {

            if (valido && bz.completado) {

                bz.completado = false;

                clientesService.modificar(datos.nombreCliente, datos.telefono, datos.pais)

                    .then(function (res) {

                        bz.datos = angular.copy(datos);
                        bz.formulario = 1;

                        $mdToast.show($mdToast.base({
                            args: {
                                mensaje: '¡Datos modificados!',
                                clase: "success"
                            }
                        }));

                    })
                    .catch(function () {

                        $mdToast.show($mdToast.base({
                            args: {
                                mensaje: 'Un error ha ocurrido',
                                clase: "danger"
                            }
                        }));

                    })
                    .finally(function () {

                        bz.completado = true;

                    })

            }

        }


        bz.completadoMetodo = true;

        bz.guardarFacturacion = function (datos, valido) {

            if (valido && bz.completadoMetodo) {

                bz.completadoMetodo = false;

                clientesService.nuevaFacturacion(datos.nombre, datos.email).then(function (res) {

                    var facturacion = {
                        correo: datos.email,
                        idFacturacion: res.insertId,
                        medio: datos.nombre
                    };

                    bz.facturacion.push(facturacion);

                    $mdToast.show($mdToast.base({
                        args: {
                            mensaje: '¡Método agregado!',
                            clase: "success"
                        }
                    }));



                }).catch(function (res) {

                    $mdToast.show($mdToast.base({
                        args: {
                            mensaje: 'Un error ha ocurrido',
                            clase: "danger"
                        }
                    }));

                }).finally(function (res) {

                    bz.completadoMetodo = true;

                })

            }

        }


        bz.completadoBorrar = true;
        bz.eliminarFacturacion = function (idMetodo) {

            if (bz.completadoBorrar) {

                bz.completadoBorrar = false;

                clientesService.eliminarFacturacion(idMetodo).then(function (res) {

                    angular.forEach(bz.facturacion, function (valor, indice) {

                        if (valor.idFacturacion == idMetodo) {

                            bz.facturacion.splice(indice, 1);

                        }
                    })

                    $mdToast.show($mdToast.base({
                        args: {
                            mensaje: '¡Método eliminado!',
                            clase: "success"
                        }
                    }));

                }).catch(function (res) {

                    $mdToast.show($mdToast.base({
                        args: {
                            mensaje: 'Un error ha ocurrido',
                            clase: "danger"
                        }
                    }));

                }).finally(function (res) {

                    bz.completadoBorrar = true;

                })

            }

        }

        $scope.$on('sesionExpiro', function (event, data) {

            $state.go('principal.comenzar');

        });

    }])
