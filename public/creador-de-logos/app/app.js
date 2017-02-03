angular.module("disenador-de-logos", ["ngMessages", "ui.router", "ngAnimate", "ngAria", "ngMaterial"])

.config(function ($stateProvider) {


    $stateProvider.state({
        name: 'inicio',
        url: '/comenzar',
        templateUrl: 'app/views/comenzar.tpl',
        controller: 'comenzarController as comenzar'

    })


})
