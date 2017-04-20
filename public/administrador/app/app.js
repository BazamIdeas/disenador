angular.module("administrador", ["ngMessages", "ui.router", "ngAnimate", "ngAria", "ngMaterial", "mp.colorPicker", "firebase", "base64"])
    .config(function ($stateProvider, $mdThemingProvider) {

        /*------------------Material Angular --------------*/

        $mdThemingProvider.theme('default')
            .warnPalette('orange')


        /*------------------------ Ui router states ----------------------*/

        $stateProvider.state({
                name: '/dashboard',
                url: '/dashboard',
                templateUrl: 'app/views/dashboard.tpl',
                controller: 'dashboardController as dashboard'
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
