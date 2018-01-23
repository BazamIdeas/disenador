angular.module("disenador-de-logos")



    .controller('logosGaleriaController', ["$scope", "$state", "$base64", "logosService", "clientesService", "$mdToast", "$timeout", function ($scope, $state, $base64, logosService, clientesService, $mdToast, $timeout) {

        var bz = this;

        bz.base64 = $base64;
        bz.aprobados = [];

        logosService.mostrarAprobados().then(function (res) {

            bz.aprobados = res;

        }).catch(function () {



        }).finally(function () {


        })


        bz.buscarAtributo = function (lista, objetivo) {

            var idFuente = null;

            angular.forEach(lista, function (atributo, llave) {

                if (atributo.clave == objetivo) {

                    idFuente = atributo.valor;

                }

            })

            return idFuente;
        }

        bz.obtenerMetas = function (filtrar) {

            var metas = [];

            angular.forEach(filtrar, function (meta, llave) {

                angular.forEach(asdas, function () {

                    if (meta.clave != objetivo) {

                        idFuente = atributo.valor;

                    }

                })


            })

            return metas;
        }

        bz.avanzar = function (indiceLogo) {

            bz.logoSeleccionado = indiceLogo;

            if (!clientesService.autorizado()) {

                bz.mostrarModalLogin = true;

            } else {
                var aprobado = null;
                
                angular.forEach(bz.aprobados,function(valor, llave){
                    
                    if(valor.idLogo == indiceLogo){
                        
                        aprobado = valor;
                    }                    
                    
                })
                if(aprobado){
                    $state.go("editor", {
                        status: true,
                        datos: {
                            logo: {
                                icono: {
                                    idElemento: aprobado.elementos_idElemento,
                                    svg: aprobado.logo
                                }
                            },
                            idLogoPadre: aprobado.idLogo,
                            fuentes: {
                                logosGaleria: bz.buscarAtributo(aprobado.atributos, 'logosGaleria'),
                                eslogan: bz.buscarAtributo(aprobado.atributos, 'eslogan')
                            }
                        }
                    })
                }

            }

        }




        bz.datosLogin = {};

        bz.completadoLogin = true;

        bz.login = function (datos, valido) {

            if (valido) {

                bz.completadoLogin = false;

                clientesService.login(datos).then(function (res) {

                    if (clientesService.autorizado(true)) {

                        $mdToast.show({
                            hideDelay: 0,
                            position: 'top right',
                            controller: ["$scope", "$mdToast", function ($scope, $mdToast) {
                                var temporizador = $timeout(function () {

                                    $mdToast.hide();

                                }, 2000)

                                $scope.closeToast = function () {
                                    $timeout.cancel(temporizador)
                                    $mdToast.hide();

                                }
                            }],
                            templateUrl: 'toast-success-login.html'
                        });

                        bz.mostrarModalLogin = false;
                        bz.avanzar(bz.logoSeleccionado);
                    }

                }).catch(function () {

                    $mdToast.show({
                        hideDelay: 0,
                        position: 'top right',
                        controller: ["$scope", "$mdToast", function ($scope, $mdToast) {

                            var temporizador = $timeout(function () {

                                $mdToast.hide();

                            }, 2000)

                            $scope.closeToast = function () {
                                $timeout.cancel(temporizador)
                                $mdToast.hide();
                            }
                            }],
                        templateUrl: 'toast-danger-login.html'
                    });

                }).finally(function (res) {

                    bz.completadoLogin = true;

                });


            };

        };



        bz.completadoRegistro = true;

        bz.registrar = function (datos, valido) {

            if (valido && bz.completadoRegistro) {

                bz.completadoRegistro = false;

                clientesService.registrar(datos.nombreCliente, datos.correo, datos.pass, datos.telefono, datos.pais).then(function (res) {

                    if (clientesService.autorizado(true)) {

                        $mdToast.show({
                            hideDelay: 0,
                            position: 'top right',
                            controller: ["$scope", "$mdToast", function ($scope, $mdToast) {

                                var temporizador = $timeout(function () {

                                    $mdToast.hide();

                                }, 2000)

                                $scope.closeToast = function () {
                                    $timeout.cancel(temporizador)
                                    $mdToast.hide();

                                }
                            }],
                            templateUrl: 'toast-success-registro.html'
                        });

                        bz.mostrarModalLogin = false;
                        bz.avanzar(bz.logoSeleccionado);

                    }

                }).catch(function () {

                    $mdToast.show({
                        hideDelay: 0,
                        position: 'top right',
                        controller: ["$scope", "$mdToast", function ($scope, $mdToast) {

                            var temporizador = $timeout(function () {

                                $mdToast.hide();

                            }, 2000)

                            $scope.closeToast = function () {
                                $timeout.cancel(temporizador)
                                $mdToast.hide();

                            }
                        }],
                        templateUrl: 'toast-danger-registro.html'
                    });


                }).finally(function () {

                    bz.completadoRegistro = true;

                })

            };

        }


    }])
