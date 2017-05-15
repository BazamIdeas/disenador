angular.module("disenador-de-logos")

/* header */

.controller('headerController', ["$state", 'Auth', '$mdPanel', 'clientesService', 'SweetAlert', function ($state, Auth, $mdPanel, clientesService, SweetAlert) {
    
    this.salir = function () {
        SweetAlert.swal("Has cerrado sesion", "Vuelve pronto!", "success");
        $state.go('comenzar');
        clientesService.salir();
    }

    var bz = this;

    bz.autorizado = Auth.$getAuth();

    Auth.$onAuthStateChanged(function (firebaseUser) {
        bz.autorizado = firebaseUser;
    });
    
    bz.hmenuMostrar = false;
    


}])
