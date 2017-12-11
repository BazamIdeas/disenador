angular.module("disenador-de-logos")

    /* Editor */

    .controller('pagoCompletoController', ["$scope", "$state", "logosService", "$stateParams", function ($scope, $state, logosService, $stateParams) {

        var bz = this;

       
        bz.logo = false;
        
        logosService.obtenerPorId($stateParams.id).then(function(res){
            
            bz.logo = res;
            
        })
        
        

        $scope.$on('sesionExpiro', function (event, data) {

            $state.go('principal.comenzar');

        });


    }])
