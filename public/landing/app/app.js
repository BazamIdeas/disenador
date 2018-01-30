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
                name: 'terminos',
                url: '/terminos-y-condiciones',
                templateUrl: '/landing/app/views/terminos.tpl',
                controller: 'terminosController as terminos',
                params: {
                    datos: null
                }
            })
            .state({
                name: 'legales',
                url: '/avisos-legales',
                templateUrl: '/landing/app/views/legales.tpl',
                controller: 'legalesController as legales',
                params: {
                    datos: null
                }
            })
            .state({
                name: 'dienadores',
                url: '/trabaja-con-nosotros',
                templateUrl: '/landing/app/views/disenadores.tpl',
                controller: 'dienadoresController as dienadores',
                params: {
                    datos: null
                }
            })

		$urlRouterProvider.otherwise("");

	});