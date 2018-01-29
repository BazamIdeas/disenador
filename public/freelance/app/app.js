angular.module("disenador-de-logos", ["ngMessages", "ui.router", "ngAnimate", "ngAria", "ngMaterial", "base64", "colorpicker", "jQueryScrollbar", "720kb.socialshare"])

    .config(function ($stateProvider, $httpProvider, $urlRouterProvider, $locationProvider, $mdToastProvider) {

        $locationProvider.html5Mode(true)

        /* INTERCEPTADOR */
        $httpProvider.interceptors.push('AuthInterceptor');



        $mdToastProvider.addPreset('base', {
            options: function () {
                return {
                    templateUrl: 'toast-base.html',
                    hideDelay: 0,
                    position: 'top right',
                    controller: ["$scope", "$mdToast", "$timeout", "args", function ($scope, $mdToast, $timeout, args) {

                        if (args) {

                            $scope.mensaje = args.mensaje;

                            $scope.clase = args.clase;
                        }

                        var temporizador = $timeout(function () {
                            $mdToast.hide();
                        }, 2000)

                        $scope.closeToast = function () {
                            $timeout.cancel(temporizador)
                            $mdToast.hide();

                        }
                    }],
                    clickOutsideToClose: true
                };
            }
        })


        /*------------------------ Ui router states ----------------------*/

        $stateProvider


            ///////////////////////////////////////////////////////////////
            ///////////////////////////ESTADOS V2//////////////////////////
            ///////////////////////////////////////////////////////////////

            .state({
                name: 'principal',
                url: '/comenzar',
                templateUrl: 'app/views/v2/principal.tpl',
                controller: 'principalController as principal',
                abstract: true
            })

            .state({
                name: 'principal.comenzar',
                url: '/?id&?n',
                templateUrl: 'app/views/v2/principal.comenzar.tpl',
                controller: 'principalComenzarController as principalComenzar'
            })

            .state({
                name: 'principal.opciones',
                url: '/opciones/',
                templateUrl: 'app/views/v2/principal.opciones.tpl',
                controller: 'principalOpcionesController as principalOpciones',
                params: {
                    status: null
                },
                resolve: {
                    statusResolve: ["$stateParams", "$q", function ($stateParams, $q) {

                        return $stateParams.status || $q.reject("STEPS");

                    }]

                }
            })

            .state({
                name: 'principal.combinaciones',
                url: '/combinaciones/',
                templateUrl: 'app/views/v2/principal.combinaciones.tpl',

                controller: 'principalCombinacionesController as principalCombinaciones',
                params: {
                    status: null
                },
                resolve: {
                    statusResolve: ["$stateParams", "$q", function ($stateParams, $q) {

                        return $stateParams.status || $q.reject("STEPS");

                    }]

                }
            })

            .state({
                name: 'editor',
                url: '/editor/',
                templateUrl: 'app/views/v2/editor.tpl',
                controller: 'editorController as editor',
                params: {
                    status: null,
                    datos: {
                        logo: null,
                        texto: null,
                        //eslogan: null,
                        fuentes: null,
                        idLogoGuardado: null
                    }
                },
                resolve: {
                    currentAuth: ["$q", "clientesService", function ($q, clientesService) {

                        if (!clientesService.autorizado()) {

                            return $q.reject("AUTH_REQUIRED");

                        }

                    }],
                    historicoResolve: ["$q", "$stateParams", "LS", function ($q, $stateParams, LS) {

                        var defered = $q.defer();

                        var promise = defered.promise;

                        if ($stateParams.status) {

                            LS.definir('editor-freelance', $stateParams.datos);

                            defered.resolve($stateParams.datos);

                        } else if (LS.obtener('editor-freelance')) {

                            defered.resolve(LS.obtener('editor-freelance'));

                        } else {

                            defered.reject({
                                error: 'FALLO_HISTORICO'
                            });
                        }

                        return promise;

                    }]

                }
            })

            .state({
                name: 'publicado',
                url: '/publicado/:id/',
                templateUrl: 'app/views/v2/publicado.tpl',
                controller: 'publicadoController as publicado',
                params: {
                    status: null,
                    datos: null
                },
                resolve: {
                    currentAuth: ["$q", "clientesService", function ($q, clientesService) {

                        if (!clientesService.autorizado()) {

                            return $q.reject("AUTH_REQUIRED");

                        }

                    }],
                    logoValido: ["$q", "logosService", "$stateParams", function ($q, logosService, $stateParams) {

                        var defered = $q.defer();

                        var promise = defered.promise;

                        if ($stateParams.id) {

                            logosService.obtenerPorId($stateParams.id).then(function (res) {

                                if (res.estado == "Por Aprobar") {

                                    defered.resolve(res);

                                } else {

                                    defered.reject("INVALID_LOGO");

                                }

                            }).catch(function (res) {

                                defered.reject("INVALID_LOGO");

                            })

                            return promise;

                        } else {

                            return $q.reject("INVALID_LOGO");

                        }


                    }],
                    status: ["$stateParams", "$q", function ($stateParams, $q) {

                        return $stateParams.status || $q.reject("STEPS");

                    }]
                }
            })

            .state({
                name: 'cuenta',
                url: '/cliente/cuenta/',
                templateUrl: 'app/views/v2/cuenta.tpl',
                controller: 'cuentaController as cuenta',
                resolve: {
                    currentAuth: ["$q", "clientesService", function ($q, clientesService) {

                        if (!clientesService.autorizado()) {

                            return $q.reject("AUTH_REQUIRED");

                        }

                    }]
                }
            })

            .state({
                name: 'balance',
                url: '/cliente/balance/',
                templateUrl: 'app/views/v2/balance.tpl',
                controller: 'balanceController as balance',
                resolve: {
                    currentAuth: ["$q", "clientesService", function ($q, clientesService) {

                        if (!clientesService.autorizado()) {

                            return $q.reject("AUTH_REQUIRED");

                        }

                    }]
                }
            })

            .state({
                name: 'logos',
                url: '/cliente/logos/',
                templateUrl: 'app/views/v2/logos.tpl',
                controller: 'logosController as logos',
                resolve: {
                    currentAuth: ["$q", "clientesService", function ($q, clientesService) {

                        if (!clientesService.autorizado()) {

                            return $q.reject("AUTH_REQUIRED");

                        }

                    }]
                }
            })

            .state({
                name: 'logoVendido',
                url: '/cliente/logo/:id/',
                templateUrl: 'app/views/v2/logoVendido.tpl',
                controller: 'logoVendidoController as logoVendido',
                resolve: {
                    currentAuth: ["$q", "clientesService", function ($q, clientesService) {

                        if (!clientesService.autorizado()) {

                            return $q.reject("AUTH_REQUIRED");

                        }

                    }],
                    logoValido: ["$q", "logosService", "$stateParams", function ($q, logosService, $stateParams) {

                        var defered = $q.defer();

                        var promise = defered.promise;

                        if ($stateParams.id) {

                            logosService.obtenerPorId($stateParams.id).then(function (res) {

                                if (res.estado == "Vendido") {

                                    defered.resolve(res);

                                } else {

                                    defered.reject("INVALID_LOGO");

                                }

                            }).catch(function (res) {

                                defered.reject("INVALID_LOGO");

                            })

                            return promise;

                        } else {

                            return $q.reject("INVALID_LOGO");

                        }


                    }]

                }
            })

            .state({
                name: 'login',
                url: '/login/',
                templateUrl: 'app/views/v2/login.tpl',
                controller: 'loginController as login',
                resolve: {
                    "currentAuth": ["$q", "clientesService", function ($q, clientesService) {

                        if (clientesService.autorizado()) {

                            return $q.reject("LOGOUT_REQUIRED");

                        }

                    }]
                }
            })

        //redirecciones

        /* $urlRouterProvider.when('', '/comenzar/');
         $urlRouterProvider.when('/', '/comenzar/');
         $urlRouterProvider.when('/comenzar', '/comenzar/');
         $urlRouterProvider.when('/comenzar/opciones', '/comenzar/opciones/');
         $urlRouterProvider.when('/comenzar/combinaciones', '/comenzar/combinaciones/');
         $urlRouterProvider.when('/editor', '/editor/');*/


        $urlRouterProvider.when('', '/comenzar/');
        $urlRouterProvider.when('/', '/comenzar/');

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


        $urlRouterProvider.otherwise('/404/');

    })


    .run(function ($rootScope, $state, $timeout) {



        $rootScope.$on('$viewContentLoaded', function (event) {

            $timeout(function () {
                angular.element(document.querySelector(".full-overlay")).fadeOut(1000);
            }, 500)


        });



        $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {

            if (error == "STEPS") {

                switch (toState.name) {

                    case 'publicado':
                        break;

                    default:
                        $state.go("principal.comenzar");

                }



            } else if (error === "AUTH_REQUIRED") {


                switch (toState.name) {

                    case 'editor':

                        switch (fromState.name) {

                            case '':
                                $state.go("login");
                                break;

                            case 'principal.combinaciones':
                                break;


                            default:
                                $state.go("login");
                        }

                        break;

                    case 'planes':

                        switch (fromState.name) {

                            case '':
                                $state.go("login");
                                break;

                            default:

                                $state.go("login");
                        }

                        break;

                    case 'pago':

                        switch (fromState.name) {

                            case '':
                                $state.go("login");
                                break;

                            default:
                                $state.go("login");
                        }

                        break;


                    case "pagoCompleto":
                        switch (fromState.name) {

                            case '':
                                $state.go("login");
                                break;

                            default:
                                $state.go("login");
                        }

                        break;

                    case "cuenta":
                        switch (fromState.name) {

                            case '':
                                $state.go("login");
                                break;

                            default:
                                $state.go("login");
                        }

                        break;

                    case "logos":
                        switch (fromState.name) {

                            case '':
                                $state.go("login");
                                break;

                            default:
                                $state.go("login");
                        }

                        break;

                    case "descargar":
                        switch (fromState.name) {

                            case '':
                                $state.go("login");
                                break;

                            default:
                                $state.go("login");
                        }

                        break;

                }


            } else if (error === "LOGOUT_REQUIRED") {

                $state.go('cuenta');

            } else if (error.error === "FALLO_HISTORICO") {


                switch (toState.name) {

                    case 'editor':

                        $state.go("principal.comenzar");
                        break;

                    case 'planes':

                        $state.go("editor");
                        break;

                    case 'pago':

                        $state.go("planes");
                        break;


                }

            }
            console.log(error)

        });
    })
