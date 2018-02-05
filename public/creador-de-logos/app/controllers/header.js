angular.module("disenador-de-logos")

    /* header */

    .controller('headerController', ["$state", 'clientesService', '$rootScope', '$scope', "mostrarPopAyuda", function ($state, clientesService, $rootScope, $scope, mostrarPopAyuda) {

        var bz = this;

        bz.salir = function () {
            clientesService.salir(true, true);
        }
    
        bz.autorizado = clientesService.autorizado();
        
        bz.mostrarPopAyuda = mostrarPopAyuda;

        console.log(mostrarPopAyuda)
        
        bz.menuMostrar = function () {
            if (bz.hmenuMostrar) {
                bz.hmenuMostrar = false;
            } else {
                bz.hmenuMostrar = true;
            }
        }
        


        $scope.$on('sesionExpiro', function (event, data) {


            bz.autorizado = clientesService.autorizado();

        });

        $scope.$on('sesionInicio', function (event, data) {

            bz.autorizado = clientesService.autorizado();

        });


}])
