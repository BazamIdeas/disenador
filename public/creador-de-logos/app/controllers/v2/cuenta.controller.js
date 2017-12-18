angular.module("disenador-de-logos")

    /* Editor */

    .controller('cuentaController', ["$scope", "pedidosService", "$mdToast", function ($scope, pedidosService, $mdToast) {

        var bz = this;

        
        pedidosService.listarPedidos();
        
        $scope.$on('sesionExpiro', function (event, data) {

            $state.go('principal.comenzar');

        });

    }])
