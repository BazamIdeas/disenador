angular.module("disenador-de-logos")

/* header */

.controller('headerController', ["$state", '$mdPanel', 'clientesService', 'SweetAlert', '$rootScope', '$scope', function ($state, $mdPanel, clientesService, SweetAlert, $rootScope, $scope) {

    this.salir = function () {
        SweetAlert.swal("Has cerrado sesion", "Vuelve pronto!", "success");
        clientesService.salir();
    }

    var bz = this;

    bz.autorizado = clientesService.autorizado();

    $scope.$watch('$root.objectoCliente', function (valor, nuevoValor) {
        if (valor !== nuevoValor) {
            bz.autorizado = $rootScope.objectoCliente;
        }
    });


    bz.menuMostrar = function () {
        if (bz.hmenuMostrar) {
            bz.hmenuMostrar = false;
        } else {
            bz.hmenuMostrar = true;
        }
    }
    

}])

.controller('landingController', ["$state", '$mdPanel', 'clientesService', 'SweetAlert', '$stateParams', function ($state, $mdPanel, SweetAlert, $stateParams) {



}])
