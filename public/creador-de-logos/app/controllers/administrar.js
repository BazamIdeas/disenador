angular.module("disenador-de-logos")

/* Administras logo */

.controller('administrarController', ['$scope', 'currentAuth', '$stateParams', '$state', 'LS', '$base64', function ($scope, currentAuth, $stateParams, $state, LS, $base64) {

    var bz = this;

    bz.base64 = function (icono) {

        return $base64.decode(icono);

    }

    bz.codificar = function (icono) {

        return $base64.encode(icono);

    }

    /* LOCAL STORAGE */

    this.definirInfo = function (llave, datos) {
        return LS.definir(llave, datos);
    }

    if ($stateParams.datos) {
        this.definirInfo($state.current.name, $stateParams.datos);
        this.datosEstadoAnterior = $stateParams.datos;

    } else if (LS.obtener($state.current.name)) {

        this.datosEstadoAnterior = JSON.parse(LS.obtener($state.current.name));
    } else {
        $state.go('dashboard');
    }

    bz.info = this.datosEstadoAnterior;

}])
