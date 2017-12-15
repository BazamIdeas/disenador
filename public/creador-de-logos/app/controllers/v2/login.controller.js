angular.module("disenador-de-logos")

    /* Editor */

    .controller('loginController', ["clientesService", "$state", "$mdToast", "$timeout", "paisesValue", function (clientesService, $state, $mdToast, $timeout, paisesValue) {

        var bz = this;
        
        bz.paises = paisesValue;
        
        bz.paisDefecto = null;
        
        clientesService.pais().then(function(res){
            
            bz.paisDefecto = res.iso;
            
        })
        
        
        bz.datosRegistro = {};
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



                        $state.go("logos");

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


                }).finally(function () {

                    
                    bz.completadoLogin = true;
                    

                })

            };

        };
        
        
        bz.completadoRegistro = true;
        
        bz.registrar = function(datos, valido){
            
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

                        $state.go("logos");

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
