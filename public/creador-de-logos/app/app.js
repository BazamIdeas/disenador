angular.module("disenador-de-logos", ["ngMessages", "ui.router", "ngAnimate", "ngAria", "ngMaterial", "base64", "colorpicker"])

    .config(function ($stateProvider, $httpProvider, $urlRouterProvider) {

        /* COMPARTIR EN REDES SOCIALES */

        /*
            socialshareConfProvider.configure([{
                    'provider': 'twitter',
                    'conf': {
                        'url': 'http://localhost:8080/creador-de-logos/#!/editor',
                        'text': '720kb is enough',
                        'via': 'npm',
                        'hashtags': 'Creador de logos, LIDERLOGO',
                        'trigger': 'click'
                    }
                },
                {
                    'provider': 'facebook',
                    'conf': {
                        'url': 'http://720kb.net',
                        'trigger': 'click',
                        'socialshareUrl': 'http://720kb.net',
                        'socialshareText': 'Creador de logos',
                        'socialshareTitle': 'Creador de logos',
                        'socialshareDescription': 'Creador de logos',
                        'socialsharemedia': '#logo-share',
                        'socialshareHashtags': ''
                    }
                }, {
                    'provider': 'email',
                    'conf': {
                        'trigger': 'click',
                        'socialsharesSubject': 'Creador de logos',
                        'socialsharesBody': 'Hola',
                        'socialsharesTo': 'luisdtc2696@gmail.com',
                        'socialsharesCc': '',
                        'socialsharesBcc': ''
                    }
                }


            ])
            
            */

        /* INTERCEPTADOR */
        $httpProvider.interceptors.push('AuthInterceptor');


        /*------------------------ Ui router states ----------------------*/

        $stateProvider
            /*
            .state({
                name: 'comenzar',
                url: '/comenzar?nombreLogo',
                templateUrl: 'app/views/comenzar.html',
                controller: 'comenzarController as comenzar',
            })
            .state({
                name: 'analisis',
                url: '/analisis',
                templateUrl: 'app/views/analisis.html',
                controller: 'analisisController as analisis',
                params: {
                    datos: null
                }
            })
            .state({
                name: 'opciones',
                url: '/opciones',
                templateUrl: 'app/views/opciones.html',
                controller: 'opcionesController as opciones',
                params: {
                    datos: null
                },
                resolve: {

                    historicoResolve: ["historicoFactory", "$q", "$stateParams", function (historicoFactory, $q, $stateParams) {

                        var defered = $q.defer();
                        var promise = defered.promise;

                        historicoFactory($stateParams.datos, 'opciones', 'comenzar').then(function (res) {

                                defered.resolve(res)
                            })
                            .catch(function (res) {

                                defered.reject(res)
                            })

                        return promise;
                    }]

                }
            })
            .state({
                name: 'proceso',
                url: '/proceso',
                templateUrl: 'app/views/proceso.html',
                controller: 'procesoController as proceso',
                params: {
                    datos: null
                },
                resolve: {

                    historicoResolve: ["historicoFactory", "$q", "$stateParams", function (historicoFactory, $q, $stateParams) {


                        var defered = $q.defer();
                        var promise = defered.promise;

                        historicoFactory($stateParams.datos, 'proceso', 'opciones').then(function (res) {

                                defered.resolve(res)
                            })
                            .catch(function (res) {

                                defered.reject(res)
                            })

                        return promise;
                    }]

                }
            }) 
        
            .state({
                name: 'editor',
                url: '/editor',
                templateUrl: 'app/views/editor.html',
                controller: 'editorController as editor',
                params: {
                    logo: null,
                    posicion: null,
                    texto: null,
                    eslogan: null,
                    logoModificado: null,
                    fuentes: null
                },
                resolve: {

                    "currentAuth": ["$q", "clientesService", function ($q, clientesService) {

                        if (!clientesService.autorizado()) {

                            return $q.reject("AUTH_REQUIRED");

                        }

                    }],

                    historicoResolve: ["historicoFactory", "$q", "$stateParams", function (historicoFactory, $q, $stateParams) {

                        var defered = $q.defer();
                        var promise = defered.promise;

                        if ($stateParams.logoModificado) { //si es un logo previamente modificado

                            defered.resolve($stateParams);

                        } else { //si no es logo modificado, se revisa el localStorage

                            historicoFactory($stateParams, 'editor', 'proceso').then(function (res) {

                                    defered.resolve(res);

                                })
                                .catch(function (res) {

                                    defered.reject(res);
                                })
                        }

                        return promise;


                    }]

                }
            })
            
            .state({
                name: 'previsualizar',
                url: '/previsualizar',
                templateUrl: 'app/views/previsualizar.html',
                controller: 'previsualizarController as prev',
                params: {
                    datos: null
                }
            })

            .state({
                name: 'login',
                url: '/login',
                templateUrl: 'app/views/v2/login.tpl',
                controller: 'loginController as login',
                params: {
                    origen: null,
                    destino: null,
                    parametrosDestino: null
                },
                resolve: {
                    "currentAuth": ["$q", "clientesService", function ($q, clientesService) {

                        if (clientesService.autorizado()) {

                            return $q.reject("LOGOUT_REQUIRED");

                        }

                    }]
                }
            })

            .state({
                name: 'dashboard',
                url: '/area-del-cliente',
                templateUrl: 'app/views/v2/cliente.tpl',
                controller: 'clienteController as cliente',
                resolve: {
                    "currentAuth": ["$q", "clientesService", function ($q, clientesService) {

                        console.log(clientesService.autorizado())
                        if (!clientesService.autorizado()) {

                            return $q.reject("AUTH_REQUIRED");

                        }

                    }]
                }
            })
            .state({
                name: 'planes',
                url: '/planes',
                templateUrl: 'app/views/v2/planes.tpl',
                controller: 'planesController as planes',
                params: {
                    logo: null,
                    tipoLogo: null,
                    idElemento: null
                },
                resolve: {
                    "currentAuth": ["$q", "clientesService", function ($q, clientesService) {

                        if (!clientesService.autorizado()) {

                            return $q.reject("AUTH_REQUIRED");

                        }

                    }],

                    historicoResolve: ["historicoFactory", "$q", "$stateParams", function (historicoFactory, $q, $stateParams) {

                        var defered = $q.defer();
                        var promise = defered.promise;



                        historicoFactory($stateParams, 'planes', 'editor').then(function (res) {

                                defered.resolve(res);

                            })
                            .catch(function (res) {

                                defered.reject(res);
                            })


                        return promise;


                    }]

                }
            })*/
            .state({
                name: 'metodo',
                url: '/metodo-de-pago',
                templateUrl: 'app/views/metodo-de-pago.html',
                params: {
                    logo: null,
                    tipoLogo: null,
                    localidad: null,
                    idElemento: null,
                    idPrecio: null,
                },
                controller: 'metodosController as metodo',
                resolve: {
                    "currentAuth": ["$q", "clientesService", function ($q, clientesService) {

                        if (!clientesService.autorizado()) {

                            return $q.reject("AUTH_REQUIRED");

                        }

                    }],

                    historicoResolve: ["historicoFactory", "$q", "$stateParams", function (historicoFactory, $q, $stateParams) {

                        var defered = $q.defer();
                        var promise = defered.promise;

                        historicoFactory($stateParams, 'metodo', 'planes').then(function (res) {

                                defered.resolve(res);

                            })
                            .catch(function (res) {

                                defered.reject(res);
                            })

                        return promise;

                    }]
                }
            })
            .state({
                name: 'administrar',
                url: '/administrar',
                templateUrl: 'app/views/administrarLogo.html',
                controller: 'administrarController as administrar',
                resolve: {
                    "currentAuth": ["$q", "clientesService", function ($q, clientesService) {

                        if (!clientesService.autorizado()) {

                            return $q.reject("AUTH_REQUIRED");

                        }

                    }]
                },
                params: {
                    datos: null
                }
            })


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
                url: '/',
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
                url: '/editor',
                templateUrl: 'app/views/v2/editor.tpl',
                controller: 'editorController as editor',
                params: {
                    status: null,
                    datos: {
                        logo: null,
                        texto: null,
                        //eslogan: null,
                        fuentes: null
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

                            LS.definir('editor', $stateParams.datos);

                            defered.resolve($stateParams.datos);

                        } else if (LS.obtener('editor')) {

                            defered.resolve(LS.obtener('editor'));

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
                name: 'planes',
                url: '/planes',
                templateUrl: 'app/views/v2/planes.tpl',
                controller: 'planesController as planes',
                resolve: {
                    currentAuth: ["$q", "clientesService", function ($q, clientesService) {

                        if (!clientesService.autorizado()) {

                            return $q.reject("AUTH_REQUIRED");

                        }

                    }]
                },
            })

            .state({
                name: 'pago',
                url: '/pago',
                templateUrl: 'app/views/v2/pago.tpl',
            })

        //redirecciones

        $urlRouterProvider.when('', '/comenzar/');
        $urlRouterProvider.when('/', '/comenzar/');
        $urlRouterProvider.when('/comenzar', '/comenzar/');
        $urlRouterProvider.when('/comenzar/opciones', '/comenzar/opciones/');
        $urlRouterProvider.when('/comenzar/combinaciones', '/comenzar/combinaciones/');

        $urlRouterProvider.otherwise('/404/');

    })


    .run(function ($rootScope, $state) {

        $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {

            if (error == "STEPS") {

                $state.go("principal.comenzar");

            } else if (error === "AUTH_REQUIRED") {


                switch (toState.name) {

                    case 'editor':

                        switch (fromState.name) {

                            case '':
                                $state.go("principal.comenzar");
                                break;

                            default:

                                $state.go("principal.comenzar");
                        }

                        break;

                    case 'planes':

                        switch (fromState.name) {

                            case '':
                                $state.go("principal.comenzar");
                                break;

                            default:

                                $state.go("principal.comenzar");

                        }

                        break;


                }


            } else if (error === "LOGOUT_REQUIRED") {

                $state.go('dashboard');

            } else if (error.error === "FALLO_HISTORICO") {


                $state.go('principal.comenzar');

            }
            console.log(error)

        });
    })
