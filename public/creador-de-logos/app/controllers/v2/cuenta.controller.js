angular.module("disenador-de-logos")

    /* Editor */

    .controller('cuentaController', ["$scope", "$state", "pedidosService", "clientesService", "$mdToast", function ($scope, $state, pedidosService, clientesService, $mdToast) {

        var bz = this;

        clientesService.datos().then(function(res){
            
            console.log(res);
            
        })
        
        //pedidosService.listarPedidos();
        
        $scope.$on('sesionExpiro', function (event, data) {

            $state.go('principal.comenzar');

        });

    }])
