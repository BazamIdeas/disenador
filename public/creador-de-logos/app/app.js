angular.module("disenador-de-logos", ["ngMessages", "ui.router", "ngAnimate", "ngAria", "ngMaterial"])
.config(function ($stateProvider) {
    $stateProvider.state({
            name: 'comenzar',
            url: '/comenzar',
            templateUrl: 'app/views/comenzar.tpl',
            controller: 'comenzarController as comenzar'
        })
        .state({
            name: 'opciones',
            url: '/opciones',
            templateUrl: 'app/views/opciones.tpl',
            controller: 'opcionesController as opciones'
        })
        .state({
            name: 'proceso',
            url: '/proceso',
            templateUrl: 'app/views/proceso.tpl',
            controller: 'procesoController as proceso'
        })
        .state({
            name: 'editor',
            url: '/editor',
            templateUrl: 'app/views/editor.tpl',
            controller: 'editorController as editor'
        })
        .state({
            name: 'login',
            url: '/login',
            templateUrl: 'app/views/login.tpl',
            controller: 'loginController as login'
        })
        .state({
            name: 'dashboard',
            url: '/area-del-cliente',
            templateUrl: 'app/views/dashboard.tpl',
            controller: 'clienteController as cliente'
        })
        .state({
            name: 'paquetes',
            url: '/paquetes',
            templateUrl: 'app/views/paquetes.tpl',
        controller: 'paquetesController as paquetes'
        })
        .state({
            name: 'metodo',
            url: '/metodo-de-pago',
            templateUrl: 'app/views/metodo-de-pago.tpl',
            controller: 'metodosController as metodos'
        })
})
