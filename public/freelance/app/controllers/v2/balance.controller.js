angular.module("disenador-de-logos")

    /* Editor */

    .controller('balanceController', ["$scope", "$state", "pedidosService", "clientesService", "$mdToast", "paisesValue", function ($scope, $state, pedidosService, clientesService, $mdToast, paisesValue) {

        var bz = this;

        bz.saldo = {
            deuda: 0,
            pagado: 0,
            vendido: 0
        };

        clientesService.saldo().then(function (res) {

            bz.saldo = res;

        }).catch(function () {


        }).finally(function () {


        })

        $scope.$on('sesionExpiro', function (event, data) {

            $state.go('principal.comenzar');

        });

    }])
