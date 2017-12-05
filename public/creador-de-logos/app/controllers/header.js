angular.module("disenador-de-logos")

    /* header */

    .controller('headerController', ["$state", 'clientesService',  '$rootScope', '$scope', 'ipService', function ($state, clientesService,  $rootScope, $scope, ipService) {

        var bz = this;

        bz.salir = function () {
            clientesService.salir(true, true);
            //$rootScope.$broadcast("sesionExpiro");
        }
    /*
        ipService.obtenerDatos().then(function (res) {
            $rootScope.isoPais = res.countryCode;
        })
*/
        bz.autorizado = clientesService.autorizado();
        
        
        
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
