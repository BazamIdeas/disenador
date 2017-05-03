angular.module("disenador-de-logos")

/* Metodos */


.controller('metodosController', ['$scope', 'currentAuth', 'pedidosService', '$mdDialog', '$stateParams', '$state', '$window', function ($scope, currentAuth, pedidosService, $mdDialog, $stateParams, $state, $window) {

    var bz = this;

    bz.infoLogo = $stateParams;
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



}])
