angular.module("landing", ["ngMessages", "ui.router", "ngAnimate", "ngAria", "ngMaterial"])

.config(function ($stateProvider,  $urlRouterProvider) {

    

    /*------------------------ Ui router states ----------------------*/

    $stateProvider.state({
        name: 'comienzo',
        url: '',
        templateUrl: 'landing/app/views/comienzo.tpl',
        controller: 'comienzoController as comienzo',
        params: {
            datos: null
        }
    })

    $urlRouterProvider.otherwise('');
})
