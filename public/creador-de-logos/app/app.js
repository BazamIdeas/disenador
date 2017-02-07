angular.module("disenador-de-logos", ["ngMessages", "ui.router", "ngAnimate", "ngAria", "ngMaterial"])

.config(function ($stateProvider) {


    $stateProvider.state({
            name: 'comenzar',
            url: '/comenzar',
            templateUrl: 'app/views/comenzar.tpl',
            controller: 'comenzarController as comenzar'

        })
        .state({
            name: 'proceso',
            url: '/proceso',
            templateUrl: 'app/views/proceso.tpl'

        })
        .state({
            name: 'opciones',
            url: '/opciones',
            templateUrl: 'app/views/opciones.tpl'

        })
        .state({
            name: 'editor',
            url: '/editor',
            templateUrl: 'app/views/editor.tpl'
        })
        .state({
            name: 'login',
            url: '/login',
            templateUrl: 'app/views/login.tpl'
        })
        .state({
            name: 'dashboard',
            url: '/area-del-cliente',
            templateUrl: 'app/views/dashboard.tpl'

        })
        .state({
            name: 'paquetes',
            url: '/paquetes',
            templateUrl: 'app/views/paquetes.tpl'

        })
        .state({

            name: 'metodo',
            url: '/metodo-de-pago',
            templateUrl: 'app/views/metodo-de-pago.tpl'

        })


})
