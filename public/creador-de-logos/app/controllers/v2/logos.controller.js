angular.module("disenador-de-logos")

    /* Editor */

    .controller('logosController', ["$scope", "pedidosService", "$window", "$state", "logosService", "$base64", function ($scope, pedidosService, $window, $state, logosService, $base64) {

        var bz = this;

        bz.base64 = $base64;

        bz.guardados = [];
        bz.comprados = [];

        bz.salto = {
            comprados: 0,
            guardados: 0
        };
        
        bz.cantidad = {
            
            comprados: 0,
            guardados: 0
            
        }

        logosService.mostrarGuardados().then(function (res) {

            bz.guardados = res;            
            bz.cantidad.guardados = bz.guardados.length;

        }).catch(function (res) {

        })


        logosService.mostrarComprados().then(function (res) {

            bz.comprados = res;
            bz.cantidad.comprados = bz.comprados.length;

        }).catch(function (res) {

        });


        bz.modificarSalto = function(accion, objetivo){
            
            if(accion){
                
                if(bz[objetivo][bz.salto[objetivo] + 9]){
                    
                    bz.salto[objetivo] = bz.salto[objetivo] + 9;
                }
                
            } else if ((bz.salto[objetivo] - 9) >= 0) {
                
                bz.salto[objetivo] = bz.salto[objetivo] - 9;
            }
            
            
        }    
        



        $scope.$on('sesionExpiro', function (event, data) {

            $state.go('principal.comenzar');

        });


    }])
