angular.module("disenador-de-logos")


.controller('analisisController', ['$scope', '$mdDialog', "$stateParams", "LS", "$state", "$interval", "elementosService", "$base64", function ($scope, $mdDialog, $stateParams, LS, $state, $interval, elementosService, $base64) {

    var promise;

    var bz = this;

    bz.animacionTexto = 1;

    bz.datos = $stateParams.datos;

    bz.datos.respuesta = [];

    bz.stop = function () {
        $interval.cancel(promise);
    };


    elementosService.listaSegunPref($stateParams.datos).then(function (res) {

        bz.datos.respuesta.iconos = res.data;



        /*  angular.forEach(bz.datos.respuesta.iconos, function (valor, llave) {
              
              bz.datos.respuesta.iconos[llave].svg =   $base64.decode(valor.svg);
          })*/

        promise = $interval(function () {
            if (bz.animacionTexto == 4) {
                bz.stop();
                $state.go('opciones', {
                    datos: $stateParams.datos
                });
            } else {
                bz.animacionTexto = bz.animacionTexto + 1;
            }
        }, 3000);

    });







}])