angular.module("disenador-de-logos")

    /* Editor */

    .controller('pagoCompletoController', ["$scope", "$state", "logosService", "$stateParams", "$base64", function ($scope, $state, logosService, $stateParams, $base64) {

        var bz = this;

        bz.base64 = $base64;

        bz.logo = false;

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
        
        
        bz.calificar = function(){
            
            // promesa de calificacion
            
            bz.atributos.calificacion = true;
            
        }
        

        $scope.$on('sesionExpiro', function (event, data) {

            $state.go('principal.comenzar');

        });


    }])
