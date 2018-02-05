angular.module("disenador-de-logos")

    /* Editor */

    .controller('logosController', ["$scope", "$window", "$state", "logosService", "$base64", "$mdToast", "clientesService", function ($scope, $window, $state, logosService, $base64, $mdToast, clientesService) {

        var bz = this;

        bz.base64 = $base64;

        bz.opcionMostrar = "vendidos";

        bz.borradores = [];
        bz.pendientes = [];
        bz.aprobados = [];
        bz.vendidos = [];

        bz.salto = {
            comprados: 0,
            pendientes: 0,
            aprobados: 0,
            vendidos: 0
        };

        bz.cantidad = {

            comprados: 0,
            pendientes: 0,
            aprobados: 0,
            vendidos: 0,

        }

        bz.terminados = {

            borradores: false,
            pendientes: false,
            aprobados: false,
            vendidos: false,

        }

        console.log(bz.terminados)

        //BORRADORES
        logosService.listarPorEstado('Borrador').then(function (res) {

            bz.borradores = res;
            bz.cantidad.borradores = bz.borradores.length;
            bz.terminados.borradores = true;
            console.log(bz.terminados)

        }).catch(function (res) {
            bz.terminados.borradores = true;
        })


        //POR APROBARSE
        logosService.listarPorEstado('Por Aprobar').then(function (res) {

            bz.pendientes = res;
            bz.cantidad.pendientes = bz.pendientes.length;
            bz.terminados.pendientes = true;
            console.log(bz.terminados)            

        }).catch(function (res) {
            bz.terminados.pendientes = true;
        });


        //APROBADOS
        logosService.listarPorEstado('Aprobado').then(function (res) {

            bz.aprobados = res;
            bz.cantidad.aprobados = bz.aprobados.length;
            bz.terminados.aprobados = true;
            console.log(bz.terminados) 

        }).catch(function (res) {
            bz.terminados.aprobados = true;
        });


        //VENDIDOS
        logosService.listarPorEstado('Vendido').then(function (res) {

            bz.vendidos = res;
            bz.cantidad.vendidos = bz.vendidos.length;
            bz.terminados.vendidos = true; 
            console.log(bz.terminados)

        }).catch(function (res) {
            bz.terminados.vendidos = true; 
        });




        bz.modificarSalto = function (accion, objetivo) {

            if (accion) {

                if (bz[objetivo][bz.salto[objetivo] + 9]) {

                    bz.salto[objetivo] = bz.salto[objetivo] + 9;
                }

            } else if ((bz.salto[objetivo] - 9) >= 0) {

                bz.salto[objetivo] = bz.salto[objetivo] - 9;
            }

        }


        bz.borradoCompleto = true;

        bz.borrarLogo = function (idLogo) {
            if (bz.borradoCompleto) {

                bz.borradoCompleto = false;

                logosService.borrarLogo(idLogo).then(function (res) {

                    angular.forEach(bz.borradores, function (valor, indice) {
                        if (valor.idLogo == idLogo) {
                            bz.borradores.splice(indice, 1);
                        }
                    });

                    $mdToast.show($mdToast.base({
                        args: {
                            mensaje: 'El logo fue borrado exitosamente!',
                            clase: "success"
                        }
                    }));

                }).catch(function () {

                     $mdToast.show($mdToast.base({
                        args: {
                            mensaje: 'Un error ha ocurrido',
                            clase: "danger"
                        }
                    }));

                }).finally(function () {

                    bz.borradoCompleto = true;

                })
            }
        }


        bz.buscarAtributo = function (lista, objetivo) {

            var idFuente = null;

            angular.forEach(lista, function (atributo, llave) {

                if (atributo.clave == objetivo) {

                    idFuente = atributo.valor;

                }

            })

            return idFuente;
        }




        bz.facturacion = [];
        bz.datos = {};

        clientesService.datos(true).then(function (res) {

            if (res.facturacion) {
                bz.facturacion = angular.copy(res.facturacion);
                delete res.facturacion;
            }

            bz.datos = res;
        });





        $scope.$on('sesionExpiro', function (event, data) {

            $state.go('principal.comenzar');

        });

    }])

    