
angular.module("disenador-de-logos")


    .controller('principalCombinacionesController', ["$scope", "$base64", "arrayToJsonMetasFactory", function ($scope, $base64, arrayToJsonMetasFactory) {

        var bz = this;
        
        bz.convertidor = arrayToJsonMetasFactory;

        bz.base64 = $base64;
        
  
}])
