angular.module("disenador-de-logos")

/* Administras logo */

.controller('administrarController', ['$scope', 'currentAuth', '$stateParams', '$state', 'LS', '$base64', 'logosService', function ($scope, currentAuth, $stateParams, $state, LS, $base64, logosService) {

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

    
    bz.descargarL = function (idLogo, ancho) {
        logosService.descargarLogo(idLogo, ancho).then(function (res) {
            bz.url = res.data;
            console.log(bz.url)
        }).catch(function (res) {
            console.log('No funciona');
        })
    }
    
    bz.medidas = [{ancho: 300},{ancho: 400},{ancho: 500}];



    /* EFECTO HOVER */

    this.elementos = [];

    this.efectoHover = function (indice, valor) {
        if (!this.elementos[indice]) {
            this.elementos[indice] = valor;
            this.medidas[indice].mostrar = true;
        } else {
            delete this.elementos[indice];
            this.medidas[indice].mostrar = false;
        }
    }




}])
