angular.module("disenador-de-logos")

    /* header */

    .controller('navController', ["$rootScope", "clientesService", "$scope", "$state", function ($rootScope, clientesService, $scope, $state) {

        var bz = this;

        bz.autorizado = clientesService.autorizado();
        
        bz.toggle = false;
        
        bz.salir = function () {
            clientesService.salir(true, true);
          bz.toggle = false;
          $rootScope.$broadcast("toggle:nav", bz.toggle)
        }

        bz.clickLink = function (state) {
          bz.toggle = false;
          $rootScope.$broadcast("toggle:nav", bz.toggle)
          $state.go(state);
        }

        $scope.$on('toggle:header', function(event, data){

          bz.toggle = data;
        })

        $scope.$on('sesionExpiro', function (event, data) {


            bz.autorizado = clientesService.autorizado();

        });

        $scope.$on('sesionInicio', function (event, data) {

            bz.autorizado = clientesService.autorizado();

        });


}])