angular.module("administrador")

    .controller('headerController', ["$state", '$scope', 'clientesService', '$rootScope', function ($state, $scope, clientesService, $rootScope) {

        var bz = this;

        /* FUNCION SALIR DE SESION */

        bz.salir = function () {
            clientesService.salir(true);
            $rootScope.$broadcast("sesionExpiro");
            $state.go('login');
        }


        /* VERIFICA SI EL USUARIO ESTA AUTORIZADO Y LO VIGILA */

        bz.estado = $state.current.url.replace('/', '');

        bz.autorizado = clientesService.autorizado();

        $scope.$on('sesionExpiro', function () {

            bz.autorizado = clientesService.autorizado();

        });

        $scope.$on('sesionInicio', function () {

            bz.autorizado = clientesService.autorizado();

        });

        $rootScope.$on('$stateChangeSuccess', function () {

            bz.estado = jsUcfirst($state.current.url.replace('/', ''));

        });


        function jsUcfirst(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }


    }])