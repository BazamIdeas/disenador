angular.module("administrador")

    .controller('headerController', ["$state", "$mdSidenav", "$mdDialog", '$scope', 'SweetAlert', 'clientesService', '$rootScope', function ($state, $mdSidenav, $mdMenu, $scope, SweetAlert, clientesService, $rootScope) {

        var bz = this;

        /* FUNCION SALIR DE SESION */

        bz.salir = function () {
            clientesService.salir(true);
            $rootScope.$broadcast("sesionExpiro");
            $state.go('login');
        }

        /* VERIFICA SI EL USUARIO ESTA AUTORIZADO Y LO VIGILA */

        bz.autorizado = clientesService.autorizado();

        $scope.$on('sesionExpiro', function (event, data) {

            bz.autorizado = clientesService.autorizado();

        });

        $scope.$on('sesionInicio', function (event, data) {

            bz.autorizado = clientesService.autorizado();

        });

        bz.menuMostrar = function () {
            bz.hmenuMostrar = !bz.hmenuMostrar;
        }

    }])