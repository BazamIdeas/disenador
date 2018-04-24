angular.module("landing")

    .controller("headerController", ["navegarFactory", "clientesService", "$scope", function (navegarFactory, clientesService, $scope) {

        var bz = this;

        bz.navegar = navegarFactory;

        bz.salir = function () {
            clientesService.salir(true, true);
        };

        bz.opcionMostrarLogin = true;
        
        bz.autorizado = clientesService.autorizado();

        $scope.$on("sesionExpiro", function () {

            bz.autorizado = clientesService.autorizado();

        });

        $scope.$on("sesionInicio", function () {

            bz.autorizado = clientesService.autorizado();

        });

    }]);