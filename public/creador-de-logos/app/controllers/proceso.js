angular.module("disenador-de-logos")

/* Proceso */

.controller('procesoController', ['$scope', '$stateParams', 'crearLogoFactory', '$mdDialog', 'LS', '$state', '$base64', function ($scope, $stateParams, crearLogoFactory, $mdDialog, LS, $state, $base64) {


    this.base64 = function (icono) {

        return $base64.decode(icono);

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


    /*Posiciones */

    this.posicion = {

        coordenadas: {
            x:'',
            y:''
        }
    }



    this.cambiarPosicion = function (valor) {
        /*
                if (valor == 'bottom') {

                    coordenadas = {
                        x: 256,
                        y: 600
                    }

                } else if (valor == 'top') {

                    coordenadas = {
                        x: 256,
                        y: 0
                    }

                } else if (valor == 'right') {

                    coordenadas = {
                        x: 512,
                        y: 300
                    }

                } else if (valor == 'left') {

                    coordenadas = {
                        x: 0,
                        y: 300
                    }

                }
                
               



                this.posicion.coordenadas = coordenadas;
                
                 */

        this.posicion.clase = this.posicion.actual + "-" + valor;
        this.posicion.claseG = this.posicion.actual + "-" + valor + "-g";
        this.posicion.actual = valor;


    }




    /* Barra */

    this.isOpen = false;

    this.estadoProcesoBarra = {
        isOpen: false,
        count: 0,
        selectedDirection: 'left'
    };

}])
