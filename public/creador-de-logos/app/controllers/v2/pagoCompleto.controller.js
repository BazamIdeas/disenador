angular.module("disenador-de-logos")

    .controller('pagoCompletoController', ["$scope", "$state", "logosService", "$stateParams", "$base64", function ($scope, $state, logosService, $stateParams, $base64) {

        var bz = this;

        bz.base64 = $base64;

        bz.logo = false;
        
        bz.calificacionTentativa = 5;

        logosService.obtenerPorId($stateParams.id).then(function (res) {

            bz.logo = res;

            bz.atributos = {
                padre: null,
                calificacion: null
            };

            angular.forEach(bz.logo.atributos, function (atributo, indice) {

                if (atributo.clave == 'padre'){
                    
                    bz.atributos.padre = true;
                    
                } else if(atributo.clave == 'calificacion-cliente'){
                    
                     bz.atributos.calificacion = true;
                    
                }

            })

        })
        
        bz.completado = true;
        bz.calificar = function(calificacion){
            
            if(bz.completado){
                bz.completado = false;
                
                // promesa de calificacion
                logosService.calificar(bz.logo.idLogo, calificacion).finally(function(){
                    
                    bz.completado = true;
                    bz.atributos.calificacion = true;

                })
            
            }
        }
        

        $scope.$on('sesionExpiro', function (event, data) {

            $state.go('principal.comenzar');

        });


    }])
