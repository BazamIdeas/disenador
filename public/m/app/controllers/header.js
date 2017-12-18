angular.module("disenador-de-logos")

    /* header */

    .controller('headerController', ["$state", 'clientesService', '$rootScope', '$scope', function ($state, clientesService, $rootScope, $scope) {

        var bz = this;

        bz.salir = function () {
            clientesService.salir(true, true);
        }
    
        bz.autorizado = clientesService.autorizado();
        
        bz.toggle = false;
        
        bz.toggleMenu = function (val) {
            bz.toggle = !bz.toggle;
            $rootScope.$broadcast("toggle:header", bz.toggle)
        }
        
        $scope.$on('toggle:nav', function(event, data){

            bz.toggle = data;
        })

        $scope.$on('sesionExpiro', function (event, data) {


            bz.autorizado = clientesService.autorizado();

        });

        $scope.$on('sesionInicio', function (event, data) {

            bz.autorizado = clientesService.autorizado();

        });


}])
