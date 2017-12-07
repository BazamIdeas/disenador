angular.module("disenador-de-logos")

    /* Editor */

    .controller('planesController', ["pedidosService", "$scope", function (pedidosService, $scope) {

        var bz = this;


        bz.monedas = {};

        pedidosService.listarPlanes().then(function (res) {
            
            console.log(res)
            
            angular.forEach(res.planes, function (plan, indicePlan) {

                angular.forEach(plan.precios, function (precio, indicePrecio) {
                   
                    if (!bz.monedas[precio.moneda]) {

                        bz.monedas[precio.moneda] = {
                            simbolo: precio.moneda,
                            idMoneda: precio.idMoneda
                        };

                    }

                })

            })
         

        })





        $scope.$on('sesionExpiro', function (event, data) {

            $state.go('principal.comenzar');

        });


    }])
