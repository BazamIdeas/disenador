angular.module("disenador-de-logos")

/* header */

.controller('headerController', ["$state", '$mdPanel', 'clientesService', 'SweetAlert', '$rootScope', '$scope', function ($state, $mdPanel, clientesService, SweetAlert, $rootScope, $scope) {

    this.salir = function () {
        SweetAlert.swal("Has cerrado sesion", "Vuelve pronto!", "success");
        $state.go('comenzar');
        clientesService.salir();
    }

    var bz = this;

    bz.autorizado = clientesService.autorizado();

    /*
    Auth.$onAuthStateChanged(function (firebaseUser) {
        bz.autorizado = firebaseUser;
    });*/

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
