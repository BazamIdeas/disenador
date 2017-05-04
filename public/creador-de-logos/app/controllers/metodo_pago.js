angular.module("disenador-de-logos")

/* Metodos */


.controller('metodosController', ['$scope', 'currentAuth', 'pedidosService', '$mdDialog', '$stateParams', '$state', '$window', 'SweetAlert', 'LS', function ($scope, currentAuth, pedidosService, $mdDialog, $stateParams, $state, $window, SweetAlert, LS) {

    var bz = this;
    
     /* LOCAL STORAGE */

    this.definirInfo = function (llave, datos) {
        return LS.definir(llave, datos);
    }

    if ($stateParams) {
        this.definirInfo($state.current.name, $stateParams);
        this.datosEstadoAnterior = $stateParams;

    } else if (LS.obtener($state.current.name)) {

        this.datosEstadoAnterior = JSON.parse(LS.obtener($state.current.name));
    } else {
        $state.go('opciones');
    }

    /* *************** */

    bz.mostrar = 'inicial';
    bz.compras = 1;

    bz.pedido = function (tipoPago, logoSVG, idCliente, idElemento, tTarjeta, nTarjeta, expire_month, expire_year) {
        pedidosService.paypal(tipoPago, logoSVG, idCliente, idElemento, tTarjeta, nTarjeta, expire_month, expire_year).then(function (res) {
            if (tipoPago = 'credit_card') {
                console.log(res.msg)
            } else {
                $window.location.href = res.data;
            }

        })

    }
    
   this.mostrarAlerta = function(){
       SweetAlert.swal("No disponible", "Utiliza la opcion de paypal!", "error");
   }



}])
