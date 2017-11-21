angular.module("disenador-de-logos")

    /* Metodos */


    .controller('metodosController', ['$scope', 'pedidosService', '$mdDialog', '$stateParams', '$state', '$window', 'SweetAlert', 'LS', '$rootScope', 'historicoResolve', function ($scope, pedidosService, $mdDialog, $stateParams, $state, $window, SweetAlert, LS, $rootScope, historicoResolve) {

        var bz = this;

        /* LOCAL STORAGE */
        /*
        if ($stateParams.logo) {
            LS.definir($state.current.name, $stateParams);
            this.datosEstadoAnterior = $stateParams;

        } else if (LS.obtener($state.current.name)) {
            this.datosEstadoAnterior = angular.fromJson(LS.obtener($state.current.name));
        } else {
            $state.go('planes');
        }
        */
        
        
        bz.datosEstadoAnterior = historicoResolve;
        
        bz.mostrar = 'inicial';
        bz.compras = 1;

        bz.pedido = function (tipoPago, tTarjeta, nTarjeta, expire_month, expire_year) {
            bz.mostrar = 0;
            bz.loaderCircular = true;
            pedidosService.paypal(this.datosEstadoAnterior, tipoPago, tTarjeta, nTarjeta, expire_month, expire_year).then(function (res) {
                
                    $window.location.href = res.data;              

            })

        }

        this.mostrarAlerta = function () {
            SweetAlert.swal("No disponible", "Utiliza la opcion de paypal!", "error");
        }

        $scope.$on('sesionExpiro', function (event, data) {

            $state.go('login');

        });

    }])