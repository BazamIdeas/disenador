angular.module("landing", ["ngMessages", "ui.router", "ngAnimate", "ngAria", "ngMaterial", "ui.carousel", "base64"])

    .config(function ($stateProvider, $urlRouterProvider) {

        /*------------------------ Ui router states ----------------------*/

        $stateProvider.state({
                name: 'comienzo',
                url: '',
                templateUrl: '/landing/app/views/comienzo.tpl',
                controller: 'comienzoController as comienzo',
                params: {
                    datos: null
                }
            })
            .state({
                name:'terminos',
                url: '/terminos-y-condiciones',
                templateUrl: '/landing/app/views/terminos.tpl'
            })
            .state({
                name: 'legales',
                url: '/avisos-legales',
                templateUrl: '/landing/app/views/legales.tpl'
            })
            .state({
                name: 'disenadores',
                url: 'trabaja-con-nosotros',
                templateUrl: '/landing/app/views/disenadores.tpl',
                controller: 'dienadoresController as dienadores',
                params: {
                    datos: null
                }
            })

        $urlRouterProvider.otherwise("");

    });