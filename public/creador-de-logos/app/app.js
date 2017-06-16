angular.module("disenador-de-logos", ["ngMessages", "ui.router", "ngAnimate", "ngAria", "ngMaterial", "mp.colorPicker", "base64", '720kb.socialshare', 'oitozero.ngSweetAlert'])

.config(function ($stateProvider, $mdThemingProvider, socialshareConfProvider, $httpProvider) {

    /* COMPARTIR EN REDES SOCIALES */

    socialshareConfProvider.configure([
            {
                'provider': 'twitter',
                'conf': {
                    'url': 'http://720kb.net',
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
    
        /* INTERCEPTADOR */
    $httpProvider.interceptors.push('AuthInterceptor');

    /*------------------Material Angular --------------*/

    $mdThemingProvider.theme('default')
        .warnPalette('orange')


    /*------------------------ Ui router states ----------------------*/

    $stateProvider.state({
            name: 'comenzar',
            url: '/comenzar?nombreLogo',
            templateUrl: 'app/views/comenzar.tpl',
            controller: 'comenzarController as comenzar',
        })
        .state({
            name: 'analisis',
            url: '/analisis',
            templateUrl: 'app/views/analisis.tpl',
            controller: 'analisisController as analisis',
            params: {
                datos: null
            }
        })
        .state({
            name: 'opciones',
            url: '/opciones',
            templateUrl: 'app/views/opciones.tpl',
            controller: 'opcionesController as opciones',
            params: {
                datos: null
            }
        })
        .state({
            name: 'proceso',
            url: '/proceso',
            templateUrl: 'app/views/proceso.tpl',
            controller: 'procesoController as proceso',
            params: {
                datos: null
            }
        })
        .state({
            name: 'editor',
            url: '/editor',
            templateUrl: 'app/views/editor.tpl',
            controller: 'editorController as editor',
            params: {
                logo: null,
                posicion: null,
                texto: null,
                logoModificado: null
            }
        })
        .state({
            name: 'previsualizar',
            url: '/previsualizar',
            templateUrl: 'app/views/previsualizar.tpl',
            controller: 'previsualizarController as prev',
            params: {
                datos: null
            }
        })

    .state({
        name: 'login',
        url: '/login',
        templateUrl: 'app/views/login.tpl',
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
            templateUrl: 'app/views/cliente.tpl',
            controller: 'clienteController as cliente',
            resolve: {
                "currentAuth": ["$q", "clientesService", function ($q, clientesService) {

                    if (!clientesService.autorizado()) {

                        return $q.reject("AUTH_REQUIRED");

                    }

                }]
            },
            resolve: {
                "currentAuth": ["$q", "clientesService", function ($q, clientesService) {

                    if (!clientesService.autorizado()) {

                        return $q.reject("AUTH_REQUIRED");

                    }

                }]
            }
        })
        .state({
            name: 'paquetes',
            url: '/paquetes',
            templateUrl: 'app/views/paquetes.tpl',
            controller: 'paquetesController as paquetes',
            resolve: {
                "currentAuth": ["$q", "clientesService", function ($q, clientesService) {

                    if (!clientesService.autorizado()) {

                        return $q.reject("AUTH_REQUIRED");

                    }

                }]
            }
        })
        .state({
            name: 'metodo',
            url: '/metodo-de-pago',
            templateUrl: 'app/views/metodo-de-pago.tpl',
            params: {

                logoSvg64: null,
                idFuente: null,
                idPrecio: 1,
                idIcono: null,
                tipoLogo: null

            },
            controller: 'metodosController as metodo',
            resolve: {
                "currentAuth": ["$q", "clientesService", function ($q, clientesService) {

                    if (!clientesService.autorizado()) {

                        return $q.reject("AUTH_REQUIRED");

                    }

                }]
            }
        })
        .state({
            name: 'administrar',
            url: '/administrar',
            templateUrl: 'app/views/administrarLogo.tpl',
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
        .state({
            name: 'landing',
            url: '/landing',
            templateUrl: 'app/views/landing.tpl',
            controller: 'landingController as landing',

        })






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
            $state.go('dashboard');
        }
    });
})
