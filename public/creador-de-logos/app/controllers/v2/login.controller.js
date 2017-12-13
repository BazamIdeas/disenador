angular.module("disenador-de-logos")

    /* Editor */

    .controller('loginController', ["clientesService", "$state", "$mdToast", function (clientesService, $state, $mdToast) {

        var bz = this;

        bz.datosLogin = {};

        bz.login = function (datos, valido) {

            if (valido) {

                clientesService.login(datos).then(function (res) {

                    if (clientesService.autorizado(true)) {


                        $mdToast.show({
                            hideDelay: 0,
                            position: 'top right',
                            controller: ["$scope", "$mdToast", function ($scope, $mdToast) {

                                $scope.closeToast = function () {

                                    $mdToast.hide()

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

                            $scope.closeToast = function () {

                                $mdToast.hide()

                            }
                        }],
                        templateUrl: 'toast-danger-login.html'
                    });


                }).finally(function () {



                })

            };

        };


    }])
