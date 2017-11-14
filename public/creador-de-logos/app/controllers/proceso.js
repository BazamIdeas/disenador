angular.module("disenador-de-logos")

/* Proceso */

.controller('procesoController', ['crearLogoFactory', '$mdDialog', '$base64', '$mdSidenav', 'historicoResolve', function (crearLogoFactory, $mdDialog, $base64, $mdSidenav, historicoResolve) {

    var bz = this;

    
    bz.base64 = function (icono) {
        return $base64.decode(icono);
    }

    bz.cambiarMenu = function (lugar) {

        return $mdSidenav('right').toggle();
    }
    
    bz.datosEstadoAnterior = historicoResolve;

    bz.datos = [];

    bz.logos = crearLogoFactory(bz.datosEstadoAnterior.elementos.iconos, bz.datosEstadoAnterior.elementos.fuentes);

    bz.efectoHover = function (indice, valor) {

        if (!bz.datos[indice]) {

            bz.datos[indice] = valor;
            bz.logos[indice].estado = true;

        } else {

            delete bz.datos[indice];
            bz.logos[indice].estado = false;
        }

    }


    /* Posiciones */

    bz.posicion = {
        coordenadas: {
            x:'56',
            y:'500'
        }
    }

    /* Barra */

    bz.isOpen = false;

    bz.estadoProcesoBarra = {
        isOpen: false,
        count: 0,
        selectedDirection: 'left'
    };

}])
