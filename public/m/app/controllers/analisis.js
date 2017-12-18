angular.module("disenador-de-logos")


    .controller('analisisController', ['$scope', '$mdDialog', "$stateParams", "LS", "$state", "$interval", "elementosService", "$base64", '$q', function ($scope, $mdDialog, $stateParams, LS, $state, $interval, elementosService, $base64, $q) {

        var promise;

        var bz = this;

        if ($stateParams.datos === null) {
            $state.go('comenzar');
        }

        bz.animacionTexto = 1;

        bz.datos = $stateParams.datos;

        bz.stop = function () {
            $interval.cancel(promise);
        };

        /* *********************** */
        bz.datosFuentes = {
            categoria: $stateParams.datos.categoria,
            preferencias: $stateParams.datos.preferencias,
            tipo: 'FUENTE'

        };




        var promesaMultiple = $q.all([elementosService.listaSegunPref($stateParams.datos), elementosService.listaSegunPref(bz.datosFuentes)]);

        promesaMultiple.then(function (res) {


            
            bz.datos.respuesta = {
                iconos: res[0].data,
                fuentes: res[1].data
            };

          
            promise = $interval(function () {
                if (bz.animacionTexto == 2) {
                    
                    bz.stop();
                    $state.go('opciones', {
                        datos: bz.datos
                    });
                } else {
                    bz.animacionTexto = bz.animacionTexto + 1;
                }
            }, 2500);

        }).catch(function (error) {
            
            $state.go('comenzar')
        });

        /* ******************** */


    }])
