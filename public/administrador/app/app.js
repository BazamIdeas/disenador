angular.module("administrador", ["ngMessages", "ui.router", "ngAnimate", "ngAria", "ngMaterial", "base64", '720kb.socialshare', 'oitozero.ngSweetAlert', 'ngFileUpload'])

    .config(function ($stateProvider, $mdThemingProvider, socialshareConfProvider, $httpProvider, $urlRouterProvider) {

        /*------------------Material Angular --------------*/

        $mdThemingProvider.theme('default').warnPalette('light-blue')


        /* INTERCEPTADOR */
        $httpProvider.interceptors.push('AuthInterceptor');

        /*------------------------ Ui router states ----------------------*/

        $stateProvider
            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'app/views/menu.html',
                controller: 'sidenavController as sidenav',
                resolve: {
                    "currentAuth": ["$q", "clientesService", function ($q, clientesService) {
                        if (!clientesService.autorizado()) {
                            return $q.reject("AUTH_REQUIRED");
                        }
                    }]
                }
            }).state({
                name: 'app.categorias',
                url: '/categorias',
                views: {
                    'menuContent': {
                        templateUrl: 'app/views/categorias.html',
                        controller: 'categoriasController as categorias'
                    }
                }
            }).state({
                name: 'app.cliente',
                url: '/cliente',
                views: {
                    'menuContent': {
                        templateUrl: 'app/views/cliente.html',
                        controller: 'clienteController as cliente',
                    }
                }
            }).state({
                name: 'app.elementos',
                url: '/elementos',
                views: {
                    'menuContent': {
                        templateUrl: 'app/views/elementos.html',
                        controller: 'elementosController as elementos',
                    }
                }
            }).state({
                name: 'app.monedas',
                url: '/monedas',
                views: {
                    'menuContent': {
                        templateUrl: 'app/views/monedas.html',
                        controller: 'monedasController as moneda',
                    }
                }
            }).state({
                name: 'app.paises',
                url: '/paises',
                views: {
                    'menuContent': {
                        templateUrl: 'app/views/paises.html',
                        controller: 'paisesController as paises',
                    }
                }
            }).state({
                name: 'app.pedidos',
                url: '/pedidos',
                views: {
                    'menuContent': {
                        templateUrl: 'app/views/pedidos.html',
                        controller: 'pedidosController as pedidos',
                    }
                }
            }).state({
                name: 'app.planes',
                url: '/planes',
                views: {
                    'menuContent': {
                        templateUrl: 'app/views/planes.html',
                        controller: 'planesController as planes',
                    }
                }
            })
            .state({
                name: 'app.usuario',
                url: '/usuario',
                views: {
                    'menuContent': {
                        templateUrl: 'app/views/usuario.html',
                        controller: 'usuarioController as usuario',
                    }
                }
            })
            .state({
                name: 'login',
                url: '/login',
                templateUrl: 'app/views/login.html',
                controller: 'loginController as login',
                resolve: {
                    "currentAuth": ["$q", "clientesService", function ($q, clientesService) {

                        if (clientesService.autorizado()) {

                            return $q.reject("LOGOUT_REQUIRED");

                        }

                    }]
                }
            });

        $urlRouterProvider.otherwise('/app/pedidos');
    })


    .run(function ($rootScope, $state) {

        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {



        });


        $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
            // We can catch the error thrown when the $requireSignIn promise is rejected
            // and redirect the user back to the home page
            if (error === "AUTH_REQUIRED") {
                $state.go('login');
            } else if (error === "LOGOUT_REQUIRED") {
                $state.go("app/pedidos");
            }
        });
    })