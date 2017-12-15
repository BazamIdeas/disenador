angular.module("disenador-de-logos")

    .controller('principalComenzarController', ["$scope", "$stateParams", "logosService", "$base64", function ($scope, $stateParams, logosService, $base64) {

        var bz = this;
        
        bz.base64 = $base64;
        
        bz.logoCompartido = {};
        
        if($stateParams.id){
            
            logosService.obtenerPorId($stateParams.id)
                
                .then(function (res) {

                    bz.logoCompartido = res;
                
                console.log( bz.base64.decode(bz.logoCompartido.logo))

                })
            
        }

}])
