angular.module("administrador", ["ngMessages", "ui.router", "ngAnimate", "ngAria", "ngMaterial", "mp.colorPicker", "base64", '720kb.socialshare', 'oitozero.ngSweetAlert', 'ngFileUpload'])

    .config(function ($stateProvider, $mdThemingProvider, socialshareConfProvider, $httpProvider, $urlRouterProvider) {

        /*------------------Material Angular --------------*/

        $mdThemingProvider.theme('default').warnPalette('light-blue')


        /* INTERCEPTADOR */
        $httpProvider.interceptors.push('AuthInterceptor');

        /*------------------------ Ui router states ----------------------*/

        $stateProvider.state({
                name: 'categorias',
                url: '/categorias',
                templateUrl: 'app/views/categorias.html',
                controller: 'categoriasController as categorias',
                resolve: {
                    "currentAuth": ["$q", "clientesService", function ($q, clientesService) {

                        if (!clientesService.autorizado()) {

                            return $q.reject("AUTH_REQUIRED");

                        }

                    }]
                }
            }).state({
                name: 'cliente',
                url: '/cliente',
                templateUrl: 'app/views/cliente.html',
                controller: 'clienteController as cliente',
                resolve: {
                    "currentAuth": ["$q", "clientesService", function ($q, clientesService) {

                        if (!clientesService.autorizado()) {

                            return $q.reject("AUTH_REQUIRED");

                        }

                    }]
                }
            }).state({
                name: 'elementos',
                url: '/elementos',
                templateUrl: 'app/views/elementos.html',
                controller: 'elementosController as elementos',
                resolve: {
                    "currentAuth": ["$q", "clientesService", function ($q, clientesService) {

                        if (!clientesService.autorizado()) {

                            return $q.reject("AUTH_REQUIRED");

                        }

                    }]
                }
            }).state({
                name: 'monedas',
                url: '/monedas',
                templateUrl: 'app/views/monedas.html',
                controller: 'monedasController as monedas',
                resolve: {
                    "currentAuth": ["$q", "clientesService", function ($q, clientesService) {

                        if (!clientesService.autorizado()) {

                            return $q.reject("AUTH_REQUIRED");

                        }

                    }]
                }
            }).state({
                name: 'paises',
                url: '/paises',
                templateUrl: 'app/views/paises.html',
                controller: 'paisesController as paises',
                resolve: {
                    "currentAuth": ["$q", "clientesService", function ($q, clientesService) {

                        if (!clientesService.autorizado()) {

                            return $q.reject("AUTH_REQUIRED");

                        }

                    }]
                }
            }).state({
                name: 'pedidos',
                url: '/pedidos',
                templateUrl: 'app/views/pedidos.html',
                controller: 'pedidosController as pedidos',
                resolve: {
                    "currentAuth": ["$q", "clientesService", function ($q, clientesService) {

                        if (!clientesService.autorizado()) {

                            return $q.reject("AUTH_REQUIRED");

                        }

                    }]
                }
            }).state({
                name: 'planes',
                url: '/planes',
                templateUrl: 'app/views/planes.html',
                controller: 'planesController as planes',
                resolve: {
                    "currentAuth": ["$q", "clientesService", function ($q, clientesService) {

                        if (!clientesService.autorizado()) {

                            return $q.reject("AUTH_REQUIRED");

                        }

                    }]
                }
            })
            .state({
                name: 'login',
                url: '/',
                templateUrl: 'app/views/login.html',
                controller: 'loginController as login',
                resolve: {
                    "currentAuth": ["$q", "clientesService", function ($q, clientesService) {

                        if (clientesService.autorizado()) {

                            return $q.reject("LOGOUT_REQUIRED");

                        }

                    }]
                }
            })
            .state({
                name: 'usuario',
                url: '/usuario',
                templateUrl: 'app/views/usuario.html',
                controller: 'usuarioController as usuario',
                resolve: {
                    "currentAuth": ["$q", "clientesService", function ($q, clientesService) {

                        if (!clientesService.autorizado()) {

                            return $q.reject("AUTH_REQUIRED");

                        }

                    }]
                }
            })

    })


    .run(function ($rootScope, $state) {

        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {



        });


        $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
            // We can catch the error thrown when the $requireSignIn promise is rejected
            // and redirect the user back to the home page
            if (error === "AUTH_REQUIRED") {
            } else if (error === "LOGOUT_REQUIRED") {
                $state.go('login');
            }
        });
    })