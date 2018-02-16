angular.module("disenador-de-logos")

    /* Editor */

    .controller('publicadoController', ["$scope", "$state", "logosService", "$stateParams", "$base64", "logoValido", function ($scope, $state, logosService, $stateParams, $base64, logoValido) {

        var bz = this;
        
        bz.base64 = $base64;
       
        bz.logo = logoValido;
        
       
  
        $scope.$on('sesionExpiro', function (event, data) {

            $state.go('principal.comenzar');

        });


    }])
