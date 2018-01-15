
angular.module("disenador-de-logos")


    .controller('principalCombinacionesController', ["$scope", "$base64", function ($scope, $base64) {

        var bz = this;
        
        bz.base64 = $base64;
        
        bz.avanzar = function(indice){
           
            $scope.$parent.principal.avanzar(indice)
        }
      
}])
