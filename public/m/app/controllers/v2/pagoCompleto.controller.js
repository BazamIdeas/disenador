angular.module("disenador-de-logos")

    /* Editor */

    .controller('pagoCompletoController', ["$scope", "$state", "logosService", "$stateParams", "$base64", function ($scope, $state, logosService, $stateParams, $base64) {

        var bz = this;
        
        bz.base64 = $base64;
       
        bz.logo = false;
        
        logosService.obtenerPorId($stateParams.id).then(function(res){
            
            bz.logo = res;
            
        })
  
        $scope.$on('sesionExpiro', function (event, data) {

            $state.go('principal.comenzar');

        });


    }])
