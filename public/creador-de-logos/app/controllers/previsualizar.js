angular.module("disenador-de-logos")

.controller('previsualizarController', ['$scope', '$mdDialog', "$stateParams", "LS", "$state", "$interval", "$base64", function ($scope, $mdDialog, $stateParams, LS, $state, $interval, $base64) {

    var bz = this;

    /* PREVIZUALIZAR */

    bz.svg = $stateParams.datos;

    console.log(bz.datos);

    bz.modeloPrevisualizar = [
        {
            url: 'assets/img/Hoja_Carta_Mockup_Generador_de_logo.png',
            nombre: 'carta'
        },
        {
            url: 'assets/img/Ipad_Mockup_Generador de logo_Negro_2.png',
            nombre: 'carta'
        }, {
            url: 'assets/img/Iphone_Mockup_Generador_de_logo_Blanco.png',
            nombre: 'carta'
        }, {
            url: 'assets/img/Remera_Mockup_Generador_de_logo.png',
            nombre: 'carta'
        },
        {
            url: 'assets/img/Hoja_Carta_Mockup_Generador_de_logo.png',
            nombre: 'carta'
        },
        {
            url: 'assets/img/Ipad_Mockup_Generador de logo_Negro_2.png',
            nombre: 'carta'
        }, {
            url: 'assets/img/Iphone_Mockup_Generador_de_logo_Blanco.png',
            nombre: 'carta'
        }, {
            url: 'assets/img/Remera_Mockup_Generador_de_logo.png',
            nombre: 'carta'
        },
        {
            url: 'assets/img/Remera_Mockup_Generador_de_logo.png',
            nombre: 'carta'
        }
    ]

}])