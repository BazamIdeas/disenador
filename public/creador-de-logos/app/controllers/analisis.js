angular.module("disenador-de-logos")


.controller('analisisController', ['$scope', '$mdDialog', "$stateParams", "LS", "$state", "$interval", "elementosService", "$base64", function ($scope, $mdDialog, $stateParams, LS, $state, $interval, elementosService, $base64) {

    var promise;

    var bz = this;

    bz.animacionTexto = 1;

    bz.datos = $stateParams.datos;

    bz.datos.respuesta = {};

    bz.stop = function () {
        $interval.cancel(promise);
    };


    elementosService.listaSegunPref($stateParams.datos).then(function (res) {
        
        bz.datos.respuesta.iconos = res.data;

        promise = $interval(function () {
            if (bz.animacionTexto == 2) {
                bz.stop();
                $state.go('opciones', {
                    datos: $stateParams.datos
                });
            } else {
                bz.animacionTexto = bz.animacionTexto + 1;
            }
        }, 2500);

    });







}])