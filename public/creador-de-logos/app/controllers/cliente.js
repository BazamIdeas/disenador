angular.module("disenador-de-logos")


/* Cliente */

.controller('clienteController', ['$scope', '$mdDialog', "$stateParams", 'currentAuth', 'logosService', '$state', 'LS', "Auth", '$base64', function ($scope, $mdDialog, $stateParams, currentAuth, logosService, $state, LS, Auth, $base64) {

    var bz = this;

    bz.base64 = function (icono) {

        return $base64.decode(icono);

    }

    Auth.$onAuthStateChanged(function (firebaseUser) {
        bz.autorizado = firebaseUser;
        bz.mostrarC(bz.autorizado.Pd);
        bz.mostrarG(bz.autorizado.Pd);
    });

    /* LOCAL STORAGE */

    this.definirInfo = function (llave, datos) {
        return LS.definir(llave, datos);
    }

    if ($stateParams) {
        this.definirInfo($state.current.name, $stateParams);
        this.datosEstadoAnterior = $stateParams;

    } else if (LS.obtener($state.current.name)) {

        this.datosEstadoAnterior = JSON.parse(LS.obtener($state.current.name));
    } else {
        $state.go('opciones');
    }

    /* *************** */

    bz.lGuardados;
    bz.lComprados;

    /* LISTAR LOGOS */

    bz.mostrarG = function (token) {
        logosService.mostrarGuardados(token).then(function (res) {
            bz.lGuardados = res.data;
        }).catch(function (res) {
            bz.notifyG = true;
        })
    }

    bz.mostrarC = function (token) {
        logosService.mostrarComprados(token).then(function (res) {
            bz.lComprados = res.data;
        }).catch(function (res) {
            bz.notifyC = true;
        })
    }

    this.datosComprados = [];
    this.datosGuardados = [];

    /* EFECTO HOVER */

    this.efectoHoverG = function (indice, valor) {
        if (!this.datosGuardados[indice]) {

            this.datosGuardados[indice] = valor;
            this.lGuardados[indice].estado = true;

        } else {

            delete this.datosGuardados[indice];
            this.lGuardados[indice].estado = false;
        }
    }

    /* EFECTO HOVER */

    this.efectoHoverC = function (indice, valor) {

        if (!this.datosComprados[indice]) {
            this.datosComprados[indice] = valor;
            this.lComprados[indice].estado = true;
        } else {
            delete this.datosComprados[indice];
            this.lComprados[indice].estado = false;
        }
    }



}])
