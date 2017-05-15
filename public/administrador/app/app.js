angular.module("administrador", ["ngMessages", "ui.router", "ngAnimate", "ngAria", "ngMaterial", "mp.colorPicker", "firebase", "base64", '720kb.socialshare', 'oitozero.ngSweetAlert'])

.config(function ($stateProvider, $mdThemingProvider, socialshareConfProvider) {

        /*------------------Material Angular --------------*/

        $mdThemingProvider.theme('default')
            .warnPalette('orange')


        /*------------------------ Ui router states ----------------------*/

        $stateProvider.state({
            name: 'cliente',
            url: 'cliente',
            templateUrl: 'app/views/cliente.tpl',
            controller: 'clienteController as cliente'
        }).state({
            name: 'iconos',
            url: 'iconos',
            templateUrl: 'app/views/iconos.tpl',
            controller: 'iconosController as iconos'
        }).state({
            name: 'pedidos',
            url: 'pedidos',
            templateUrl: 'app/views/pedidos.tpl',
            controller: 'pedidosController as pedidos'
        }).state({
            name: 'fuentes',
            url: 'fuentes',
            templateUrl: 'app/views/fuentes.tpl',
            controller: 'fuentesController as fuentes'
        }).state({
            name: 'administrar',
            url: 'administrar',
            templateUrl: 'app/views/administrar.tpl',
            controller: 'administrarController as administrar'
        })
        .state({
            name: 'login',
            url: 'login',
            templateUrl: 'app/views/login.tpl',
            controller: 'loginController as login'
        })
        .state({
            name: 'usuario',
            url: 'usuario',
            templateUrl: 'app/views/usuario.tpl',
            controller: 'usuarioController as usuario'
        })
        .state({
            name: 'categorias',
            url: 'categorias',
            templateUrl: 'app/views/categorias.tpl',
            controller: 'categoriasController as categorias'
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
