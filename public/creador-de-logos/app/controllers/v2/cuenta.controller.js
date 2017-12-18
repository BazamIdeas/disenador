angular.module("disenador-de-logos")

    /* Editor */

    .controller('cuentaController', ["$scope", "$state", "pedidosService", "clientesService", "$mdToast", function ($scope, $state, pedidosService, clientesService, $mdToast) {

        var bz = this;
        
        bz.pedidos = [];
        bz.datos = {};

        clientesService.datos().then(function(res){
            
           bz.datos = res;
            
        });
        
        pedidosService.listarPedidos().then(function(res){
            
             angular.forEach(res, function(valor, indice){
                
                if(valor.estado != "EN ESPERA"){
                    bz.pedidos.push(valor)
                }
                
            });
            
        });
        
        $scope.$on('sesionExpiro', function (event, data) {

            $state.go('principal.comenzar');

        });

    }])
