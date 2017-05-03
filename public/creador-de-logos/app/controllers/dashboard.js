angular.module("disenador-de-logos")


/* Cliente */

.controller('clienteController', ['$scope', '$mdDialog', "$stateParams", 'currentAuth', function ($scope, $mdDialog, $stateParams, currentAuth) {
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

        /* EFECTO HOVER */
        
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
