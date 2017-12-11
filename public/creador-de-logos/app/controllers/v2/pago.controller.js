angular.module("disenador-de-logos")

    /* Editor */

    .controller('pagoController', ["$scope", "historicoResolve", "pedidosService", "$window", function ($scope, historicoResolve, pedidosService, $window) {

        var bz = this;

        bz.pedido = historicoResolve;

        bz.pasarelas = [];

        pedidosService.listarPasarelas(bz.pedido.precio.moneda.idMoneda).then(function (res) {

            bz.pasarelas = res;

        });


        bz.mostrarMetodo = function (indice) {

            angular.forEach(bz.pasarelas, function (pasarela, llave) {

                if (pasarela.idPasarela != indice) {

                    bz.pasarelas[llave].mostrar = false;

                } else {

                    bz.pasarelas[llave].mostrar = true;

                }

            })



        }


        bz.pagar = function (idPasarela, terminos) {

            if (terminos) {

                switch (idPasarela) {
                        
                    case 1://PAYPAL
                        pedidosService.pagar.paypal(bz.pedido.idElemento, bz.pedido.logo, bz.pedido.precio.idPrecio, bz.pedido.tipo, idPasarela).then(function(res){
                            
                           $window.location = res;
                            
                        })
                        break;
                        
                    case 2://STRIPE
                       
                        break;
                        
                    case 3://PAYU
                        
                        break;
                        
                    default:
                        break;
                }
                
            }


        }


        $scope.$on('sesionExpiro', function (event, data) {

            $state.go('principal.comenzar');

        });


    }])
