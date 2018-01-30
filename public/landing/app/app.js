angular.module("landing", ["ngMessages", "ui.router", "ngAnimate", "ngAria", "ngMaterial", "ui.carousel", "base64"])

	.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

        $locationProvider.html5Mode(true)

        /*------------------------ Ui router states ----------------------*/

        $stateProvider.state({
                name: 'comienzo',
                url: '/',
                templateUrl: '/landing/app/views/comienzo.tpl',
                controller: 'comienzoController as comienzo'
            })
            .state({
                name: 'terminos',
                url: '/terminos-y-condiciones/',
                templateUrl: '/landing/app/views/terminos.tpl'
            })
            .state({
                name: 'legales',
                url: '/avisos-legales/',
                templateUrl: '/landing/app/views/legales.tpl'
            })
            .state({
                name: 'disenadores',
                url: '/disenadores/',
                templateUrl: '/landing/app/views/disenadores.tpl'
            })


            $urlRouterProvider.rule(function ($injector, $location) {
                var path = $location.url();
    
                if ('/' === path[path.length - 1] || path.indexOf('/?') > -1) {
                    return;
                }
    
                if (path.indexOf('?') > -1) {
                    return path.replace('?', '/?');
                }
    
                return path + '/';
            });
    
            //$urlRouterProvider.otherwise('/404/');

    });
