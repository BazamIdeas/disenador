angular.module("disenador-de-logos", ["ngMessages", "ui.router", "ngAnimate", "ngAria", "ngMaterial", "mp.colorPicker", "firebase"])
    .config(function ($stateProvider, $mdThemingProvider) {

        /*------------------Material Angular --------------*/

        $mdThemingProvider.theme('default')
            .warnPalette('orange')


        /*------------------------ Ui router states ----------------------*/

        $stateProvider.state({
                name: 'comenzar',
                url: '/comenzar',
                templateUrl: 'app/views/comenzar.tpl',
                controller: 'comenzarController as comenzar'
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
                    texto: null
                }
            })
            .state({
                name: 'previsualizar',
                url: '/previsualizar',
                templateUrl: 'app/views/previsualizar.tpl',
                controller: 'previsualizarController as previsualizar',
                params: {
                    datos: null
                }
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
                controller: 'clienteController as cliente',
                resolve: {
                    "currentAuth": ["Auth", function (Auth) {
                        // $requireSignIn returns a promise so the resolve waits for it to complete
                        // If the promise is rejected, it will throw a $stateChangeError (see above)
                        return Auth.$requireSignIn();
                    }]
                }
            })
            .state({
                name: 'paquetes',
                url: '/paquetes',
                templateUrl: 'app/views/paquetes.tpl',
                controller: 'paquetesController as paquetes',
                resolve: {
                    "currentAuth": ["Auth", function (Auth) {
                        // $requireSignIn returns a promise so the resolve waits for it to complete
                        // If the promise is rejected, it will throw a $stateChangeError (see above)
                        return Auth.$requireSignIn();
                    }]
                }
            })
            .state({
                name: 'metodo',
                url: '/metodo-de-pago',
                templateUrl: 'app/views/metodo-de-pago.tpl',
                controller: 'metodosController as metodos',
                resolve: {
                    "currentAuth": ["Auth", function (Auth) {
                        // $requireSignIn returns a promise so the resolve waits for it to complete
                        // If the promise is rejected, it will throw a $stateChangeError (see above)
                        return Auth.$requireSignIn();
                    }]
                }
            })






    })


.run(function ($rootScope, $state) {

    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {

        $rootScope.anterior = fromState;



    });


    $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
        // We can catch the error thrown when the $requireSignIn promise is rejected
        // and redirect the user back to the home page
        if (error === "AUTH_REQUIRED") {


            $state.go("login");
        }
    });
})
