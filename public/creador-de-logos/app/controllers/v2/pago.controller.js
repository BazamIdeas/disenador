angular.module("disenador-de-logos")

    /* Editor */

    .controller('pagoController', ["$scope", "historicoResolve", function ($scope, historicoResolve) {

        var bz = this;
        
        bz.pedido = historicoResolve;
        console.log(historicoResolve)
        
        bz.calculoImpuesto = function(monto, impuesto){
            
            console.log(monto)
            console.log(impuesto)
            
            return monto / impuesto;
            
        }

      
        $scope.$on('sesionExpiro', function (event, data) {

            $state.go('principal.comenzar');

        });


    }])
