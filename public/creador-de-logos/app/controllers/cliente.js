angular.module("disenador-de-logos")


/* Cliente */

.controller('clienteController', ['$scope', '$mdDialog', "$stateParams", 'currentAuth', 'logosService', '$state', 'LS', function ($scope, $mdDialog, $stateParams, currentAuth, logosService, $state, LS) {

    var bz = this;

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

    this.datosDescargables = [];
    this.datosGuardados = [];

    /* EFECTO HOVER */

    this.efectoHover = function (indice, valor, tipo) {

        if (!this.datos[indice]) {
            if (tipo == 'guardados') {
                this.datosGuardados[indice] = valor;
                this.lGuardados[indice].estado = true;
            } else {
                this.datosDescargables[indice] = valor;
                this.lDescargables[indice].estado = true;
            }

        } else {

            if (tipo == 'guardados') {
                delete this.datosGuardados[indice];
                this.lGuardados[indice].estado = true;
            } else {
                delete this.datosDescargables[indice];
                this.lDescargables[indice].estado = false;
            }
        }

    }

    /* LISTAR LOGOS */


    bz.lGuardados;
    bz.lComprados;

    bz.mostrarG = function (id) {
        logosService.mostrarGuardados(id).then(function (res) {
            bz.lGuardados = res.data;
        }).catch(function (res) {

        })
    }

    bz.mostrarD = function (id) {
        logosService.mostrarDescargables(id).then(function (res) {
            bz.lComprados = res.data;
        }).catch(function (res) {

        })
    }

    bz.mostrarD(1);
    bz.mostrarG(1);



}])
