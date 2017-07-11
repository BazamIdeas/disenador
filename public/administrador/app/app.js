angular.module("administrador", ["ngMessages", "ui.router", "ngAnimate", "ngAria", "ngMaterial", "mp.colorPicker", "firebase", "base64", '720kb.socialshare', 'oitozero.ngSweetAlert'])

.config(function ($stateProvider, $mdThemingProvider, socialshareConfProvider, $httpProvider, $urlRouterProvider) {

    /*------------------Material Angular --------------*/

    $mdThemingProvider.theme('default')
        .warnPalette('orange')


    /* INTERCEPTADOR */
    $httpProvider.interceptors.push('AuthInterceptor');

    /*------------------------ Ui router states ----------------------*/

    $stateProvider.state({
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
            name: 'iconos',
            url: '/iconos',
            templateUrl: 'app/views/iconos.html',
            controller: 'iconosController as iconos',
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
            name: 'fuentes',
            url: '/fuentes',
            templateUrl: 'app/views/fuentes.html',
            controller: 'fuentesController as fuentes',
            resolve: {
                "currentAuth": ["$q", "clientesService", function ($q, clientesService) {

                    if (!clientesService.autorizado()) {

                        return $q.reject("AUTH_REQUIRED");

                    }

                }]
            }
        }).state({
            name: 'administrar',
            url: '/administrar',
            templateUrl: 'app/views/administrar.html',
            controller: 'administrarController as administrar',
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
        .state({
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
        })
    
        $urlRouterProvider.otherwise('/pedidos');
})


.run(function ($rootScope, $state) {

    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {



    });


    $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
        // We can catch the error thrown when the $requireSignIn promise is rejected
        // and redirect the user back to the home page
        if (error === "AUTH_REQUIRED") {

            $state.go("login", ({
                origen: fromState.name,
                destino: toState.name,
                parametrosDestino: toParams
            }));
        } else if (error === "LOGOUT_REQUIRED") {
            $state.go('login');
        }
    });
})
