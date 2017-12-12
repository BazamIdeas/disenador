angular.module("disenador-de-logos")

    /* Editor */

    .controller('logosController', ["$scope", "pedidosService", "$window", "$state", "logosService", "$base64", function ($scope, pedidosService, $window, $state, logosService, $base64) {

        var bz = this;

        bz.base64 = $base64;

        bz.guardados = [];
        bz.comprados = [];

        logosService.mostrarGuardados().then(function (res) {

            bz.guardados = res;

        }).catch(function (res) {

        })
        
        
        logosService.mostrarComprados().then(function (res) {

            bz.comprados = res;

        }).catch(function (res) {

        })



        $scope.$on('sesionExpiro', function (event, data) {

            $state.go('principal.comenzar');

        });


    }])
