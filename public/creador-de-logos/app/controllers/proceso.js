angular.module("disenador-de-logos")

/* Proceso */

.controller('procesoController', ['$scope', '$stateParams', 'crearLogoFactory', '$mdDialog', 'LS', '$state', '$base64', '$mdSidenav', function ($scope, $stateParams, crearLogoFactory, $mdDialog, LS, $state, $base64, $mdSidenav) {

    var bz = this;
    
    this.base64 = function (icono) {
        return $base64.decode(icono);
    }

    bz.cambiarMenu = function (lugar) {

        return $mdSidenav('right').toggle();
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
        $state.go('opciones');
    }

    /* *************** */

    this.datos = [];

    this.logos = crearLogoFactory(this.datosEstadoAnterior.elementos.iconos, this.datosEstadoAnterior.elementos.fuentes);

    this.efectoHover = function (indice, valor) {

        if (!this.datos[indice]) {

            this.datos[indice] = valor;
            this.logos[indice].estado = true;

        } else {

            delete this.datos[indice];
            this.logos[indice].estado = false;
        }

    }


    /* Posiciones */

    this.posicion = {
        coordenadas: {
            x:'56',
            y:'500'
        }
    }

    /* Barra */

    this.isOpen = false;

    this.estadoProcesoBarra = {
        isOpen: false,
        count: 0,
        selectedDirection: 'left'
    };

}])
