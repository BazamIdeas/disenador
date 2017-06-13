angular.module("disenador-de-logos")

/* Metodos */


.controller('metodosController', ['$scope', 'pedidosService', '$mdDialog', '$stateParams', '$state', '$window', 'SweetAlert', 'LS', function ($scope, pedidosService, $mdDialog, $stateParams, $state, $window, SweetAlert, LS) {

    var bz = this;
    
     /* LOCAL STORAGE */

    this.definirInfo = function (llave, datos) {
        return LS.definir(llave, datos);
    }

    if ($stateParams.logoSvg64 && $stateParams.idFuente && $stateParams.idPrecio && $stateParams.idIcono && $stateParams.tipoLogo) {
        this.definirInfo($state.current.name, $stateParams);
        this.datosEstadoAnterior = $stateParams;

    } else if (LS.obtener($state.current.name)) {

        this.datosEstadoAnterior = JSON.parse(LS.obtener($state.current.name));
    } else {
        $state.go('editor');
    }

    /* *************** */

    bz.mostrar = 'inicial';
    bz.compras = 1;

    bz.pedido = function (tipoPago, logoSVG, idElemento, tTarjeta, nTarjeta, expire_month, expire_year) {
        bz.mostrar = 0;
        bz.loaderCircular = true;
        pedidosService.paypal(tipoPago, logoSVG, idElemento, tTarjeta, nTarjeta, expire_month, expire_year).then(function (res) {
            if (tipoPago == 'credit_card') {
            
            } else {
                $window.location.href = res.data;
            }

        })

    }
    
   this.mostrarAlerta = function(){
       SweetAlert.swal("No disponible", "Utiliza la opcion de paypal!", "error");
   }



}])
