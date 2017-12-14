angular.module("disenador-de-logos")

    /* Editor */

    .controller('loginController', ["clientesService", "$state", "$mdToast", "$timeout", function (clientesService, $state, $mdToast, $timeout) {

        var bz = this;
        
        bz.completadoLogin = true;

        bz.datosLogin = {};

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


    }])
