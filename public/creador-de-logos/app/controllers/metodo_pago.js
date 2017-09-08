angular.module("disenador-de-logos")

    /* Metodos */


    .controller('metodosController', ['$scope', 'pedidosService', '$mdDialog', '$stateParams', '$state', '$window', 'SweetAlert', 'LS', '$rootScope', function ($scope, pedidosService, $mdDialog, $stateParams, $state, $window, SweetAlert, LS, $rootScope) {

        var bz = this;

        /* LOCAL STORAGE */

        console.log($stateParams)
        
        if ($stateParams.logo) {
            LS.definir($state.current.name, $stateParams);
            this.datosEstadoAnterior = $stateParams;

        } else if (LS.obtener($state.current.name)) {
            this.datosEstadoAnterior = JSON.parse(LS.obtener($state.current.name));
        } else {
            $state.go('planes');
        }

        bz.mostrar = 'inicial';
        bz.compras = 1;

        bz.pedido = function (tipoPago, tTarjeta, nTarjeta, expire_month, expire_year) {
            bz.mostrar = 0;
            bz.loaderCircular = true;
            pedidosService.paypal(this.datosEstadoAnterior, tipoPago, tTarjeta, nTarjeta, expire_month, expire_year).then(function (res) {
                if (tipoPago == 'credit_card') {

                } else {
                    $window.location.href = res.data;
                }

            })

        }

        this.mostrarAlerta = function () {
            SweetAlert.swal("No disponible", "Utiliza la opcion de paypal!", "error");
        }


        /* AUTORIZADO */

        $scope.$watch('$root.objectoCliente', function (valor, nuevoValor) {
            if (valor !== nuevoValor) {
                if ($rootScope.objectoCliente == false) {
                    $window.localStorage.removeItem('bzToken');
                    $state.go('login');
                }
            }
        });



    }])