angular.module("disenador-de-logos")

    /* Editor */

    .controller('pagoController', ["$scope", "historicoResolve", "pedidosService", "$window", "$state", "$base64", function ($scope, historicoResolve, pedidosService, $window, $state, $base64) {

        var bz = this;
        
        bz.base64 = $base64;

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


        bz.completado = true;
        
        bz.pagar = function (idPasarela, terminos) {

            
            if (terminos &&  bz.completado) {
                
                bz.completado = false;
            
                angular.element(document.querySelector(".full-overlay")).fadeIn(1000);
                
                switch (idPasarela) {
                    
                    case 1://PAYPAL
                        pedidosService.pagar.paypal(bz.pedido.idElemento, bz.pedido.atributos, bz.base64.encode(bz.pedido.logo), bz.pedido.precio.idPrecio, bz.pedido.tipo, idPasarela)
                            
                            .then(function(res){
                            
                                $window.location = res;
                            
                            })
                        
                            .finally(function(res){

                                bz.completado = true;
                            
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
