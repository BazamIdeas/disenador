angular.module("disenador-de-logos")

    /* Editor */

    .controller('logosController', ["$scope", "pedidosService", "$window", "$state", "logosService", "$base64", function ($scope, pedidosService, $window, $state, logosService, $base64) {

        var bz = this;

        bz.tab = 1;

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


        bz.opcionesGuardados = false;
        bz.opcionesAdquiridos = false;
        bz.logoSeleccionado = null;

        bz.seleccionado = function(tipo, id){

            if (tipo == 'guardados') {
                bz.opcionesGuardados = true;
                bz.opcionesAdquiridos = false;         
            }else if(tipo == 'adquiridos') {
                bz.opcionesGuardados = false;
                bz.opcionesAdquiridos = true;       
            }

            bz.logoSeleccionado = id;  

            console.log({opcionGuardado: bz.opcionesGuardados, opcionAdquirido: bz.opcionesAdquiridos, seleccionado: bz.logoSeleccionado})   

        }


        bz.modificarSalto = function(accion, objetivo){
            
            if(accion){
                
                if(bz[objetivo][bz.salto[objetivo] + 6]){
                    
                    bz.salto[objetivo] = bz.salto[objetivo] + 6;
                }
                
            } else if ((bz.salto[objetivo] - 6) >= 0) {
                
                bz.salto[objetivo] = bz.salto[objetivo] - 6;
            }
            
            
        }    
        



        $scope.$on('sesionExpiro', function (event, data) {

            $state.go('principal.comenzar');

        });


    }])
