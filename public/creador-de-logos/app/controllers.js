angular.module("disenador-de-logos")

/* Comenzar */

.controller('comenzarController', [function () {
    this.datos = {
        preferencias: [{
            nombre: "Femenino",
            nombre2: "Masculino",
            valor: 2
        }, {
            nombre: "Economico",
            nombre2: "Lujoso",
            valor: 2
        }, {
            nombre: "Clasico",
            nombre2: "Moderno",
            valor: 2
        }, {
            nombre: "Sutil",
            nombre2: "Evidente",
            valor: 2
        }, {
            nombre: "Simple",
            nombre2: "Detallado",
            valor: 2
        }, {
            nombre: "Joven",
            nombre2: "Adulto",
            valor: 2
        }, {
            nombre: "Formal",
            nombre2: "Divertido",
            valor: 2
        }]
    }
    this.mostrar = 1;
    this.categoriasPosibles = ['Primera', 'Segunda', 'Tercera'];
}])

/* Opciones */

.controller('opcionesController', ['$scope', '$mdDialog', "$stateParams", function ($scope, $mdDialog, $stateParams, $timeout) {


    this.datosEstadoAnterior = $stateParams.datos;



    this.seleccionado = function (primeraSeleccion, segundaSeleccion) {

        var llaves = Object.keys(primeraSeleccion).length * Object.keys(segundaSeleccion).length;
        return llaves;

    }



    this.respuesta = {
        /* ICONOS */
        iconos: [{
                id: 1,
                url: "assets/svg/apple.svg",
                nombre: "X"
        }, {
                id: 1,
                url: "assets/svg/audio.svg",
                nombre: "X"
        }, {
                id: 1,
                url: "assets/svg/audiobook.svg",
                nombre: "X"
        }, {
                id: 1,
                url: "assets/svg/book.svg",
                nombre: "X"
        }, {
                id: 1,
                url: "assets/svg/browser.svg",
                nombre: "X"
        }, {
                id: 1,
                url: "assets/svg/calculator.svg",
                nombre: "X"
        }, {
                id: 1,
                url: "assets/svg/certificate.svg",
                nombre: "X"
        }, {
                id: 1,
                url: "assets/svg/chat.svg",
                nombre: "X"
        }, {
                id: 1,
                url: "assets/svg/chemistry.svg",
                nombre: "X"
        },
            {
                id: 1,
                url: "assets/svg/chip.svg",
                nombre: "X"
        }, {
                id: 1,
                url: "assets/svg/cloud.svg",
                nombre: "X"
        }, {
                id: 1,
                url: "assets/svg/code.svg",
                nombre: "X"
        }],
        /* FUENTES */
        fuentes: [{
            id: 1,
            url: "../assets/fonts/Bahiana-Regular.ttf",
            nombre: "Bahiana-Regular"
        }, {
            id: 2,
            url: "../assets/fonts/Barrio-Regular.ttf",
            nombre: "Barrio-Regular"
        }, {
            id: 3,
            url: "../assets/fonts/CaveatBrush-Regular.ttf",
            nombre: "CaveatBrush-Regular"
        }, {
            id: 4,
            url: "../assets/fonts/DellaRespira-Regular.ttf",
            nombre: "DellaRespira-Regular"
        }, {
            id: 5,
            url: "../assets/fonts/IndieFlower.ttf",
            nombre: "IndieFlower"
        }, {
            id: 6,
            url: "../assets/fonts/Anton-Regular.ttf",
            nombre: "Anton-Regular"
        }, {
            id: 7,
            url: "../assets/fonts/FjallaOne-Regular.ttf",
            nombre: "FjallaOne-Regular"
        }, {
            id: 8,
            url: "../assets/fonts/Lobster-Regular.ttf",
            nombre: "Lobster-Regular"
        }, {
            id: 9,
            url: "../assets/fonts/Pacifico-Regular.ttf",
            nombre: "Pacifico-Regular"
        }]
    }

    this.datos = {

        fuentes: {},
        iconos: {}

    }

    this.agregarElemento = function (indice, valor, tipo) {

        if (Object.keys(this.datos[tipo]).length < 3) {

            if (!this.datos[tipo][indice]) {

                this.datos[tipo][indice] = valor;
                this.respuesta[tipo][indice].estado = 'activo';

            } else {

                delete this.datos[tipo][indice];
                this.respuesta[tipo][indice].estado = 'inactivo';
            }
        } else {

            if (this.datos[tipo][indice]) {


                delete this.datos[tipo][indice];
                this.respuesta[tipo][indice].estado = 'inactivo';

            } else {

                return false;
            }
        }


    }



    /* Modal */

    this.hidden = false;
    this.isOpen = false;
    this.hover = false;

    this.elementosDialog = [
        {
            name: "Caracteristicas",
            icon: "face",
            direction: "bottom"
        },
        {
            name: "Etiquetas",
            icon: "label",
            direction: "top"
        },
        {
            name: "Categorias",
            icon: "lightbulb_outline",
            direction: "bottom"
        }
      ];

    this.abrirDialogo = function ($event, elementoDialog) {

        $mdDialog.show({
            clickOutsideToClose: true,
            controller: function ($mdDialog) {

                this.elementoDialog = elementoDialog;

                this.cerrarDialogo = function () {
                    $mdDialog.cancel();
                };
                this.enviarDialogo = function () {
                    $mdDialog.hide();
                };
            },
            controllerAs: 'dialog',
            templateUrl: 'app/views/dialogos/dialogoOpciones.tpl',
            targetEvent: $event
        });
    };
}])

/* Proceso */

.controller('procesoController', ['$scope', '$stateParams', 'crearLogoFactory', '$mdDialog', function ($scope, $stateParams, crearLogoFactory, $mdDialog) {

    this.datosEstadoAnterior = $stateParams.datos;
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


    /* Barra */

    this.isOpen = false;

    this.estadoProcesoBarra = {
        isOpen: false,
        count: 0,
        selectedDirection: 'left'
    };

            }])


/* Editor */

.controller('editorController', ['$scope', function ($scope) {
    this.modoSeleccionado = 'md-scale';
    /* Fab Speed Dial 1 */
    this.estado1 = false;
    /* Fab Speed Dial 2 */
    this.estado2 = false;
    /* Fab Speed Dial 3 */
    this.estado3 = false;
    /* Fab Speed Dial 4 */
    this.estado4 = false;
}])

/* login */

.controller('loginController', ['$scope', function ($scope) {

}])

/* Cliente */

.controller('clienteController', ['$scope', '$mdDialog', "$stateParams", function ($scope, $mdDialog, $stateParams) {
    this.datosEstadoAnterior = $stateParams.datos;
    this.respuesta = {
        iconos: [{
                id: 1,
                url: "assets/svg/apple.svg",
                nombre: "X"
        }, {
                id: 1,
                url: "assets/svg/audio.svg",
                nombre: "X"
        }, {
                id: 1,
                url: "assets/svg/audiobook.svg",
                nombre: "X"
        }, {
                id: 1,
                url: "assets/svg/book.svg",
                nombre: "X"
        }, {
                id: 1,
                url: "assets/svg/browser.svg",
                nombre: "X"
        }, {
                id: 1,
                url: "assets/svg/calculator.svg",
                nombre: "X"
        }, {
                id: 1,
                url: "assets/svg/certificate.svg",
                nombre: "X"
        }, {
                id: 1,
                url: "assets/svg/chat.svg",
                nombre: "X"
        }, {
                id: 1,
                url: "assets/svg/chemistry.svg",
                nombre: "X"
        },
            {
                id: 1,
                url: "assets/svg/chip.svg",
                nombre: "X"
        },
            {
                id: 1,
                url: "assets/svg/cloud.svg",
                nombre: "X"
        },
            {
                id: 1,
                url: "assets/svg/code.svg",
                nombre: "X"
        }]
    }


    this.datos = [];
    this.estado = false;

    this.efectoHover = function (indice, valor) {


        if (!this.datos[indice]) {

            this.datos[indice] = valor;
            this.logos[indice].estado = true;


        } else {

            delete this.datos[indice];
            this.logos[indice].estado = false;
        }


    }
}])

/* Paquetes */

.controller('paquetesController', ['$scope', function ($scope) {

}])

/* Metodos */

.controller('metodosController', ['$scope', function ($scope) {
 this.pago=false;
}])
