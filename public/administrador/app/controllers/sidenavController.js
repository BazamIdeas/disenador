angular.module("administrador")

    .controller('sidenavController', ["$state", "$mdSidenav", "$mdDialog", '$scope', 'clientesService', '$rootScope', function ($state, $mdSidenav, $mdDialog, $scope, clientesService, $rootScope) {

        var bz = this;

        bz.vistas = [{
            url: 'pedidos',
            icono: 'add_shopping_cart'
        }, {
            url: 'cliente',
            icono: 'person'
        }, {
            url: 'categorias',
            icono: 'settings'
        }, {
            url: 'elementos',
            icono: 'stars'
        }, {
            url: 'usuario',
            icono: 'person'
        }, {
            url: 'planes',
            icono: 'view_carousel'
        }, {
            url: 'monedas',
            icono: 'attach_money'
        }, {
            url: 'paises',
            icono: 'flag'
        }]

        /* VERIFICA SI EL USUARIO ESTA AUTORIZADO Y LO VIGILA */
        bz.autorizado = clientesService.autorizado();

        $scope.$watch('$root.objectoCliente', function (valor, nuevoValor) {
            if (valor !== nuevoValor) {
                bz.autorizado = bz.autorizado = $rootScope.objectoCliente;
            }
        });

        /* INTERVALO DE ABRIR Y CERRAR EL MENU */
        bz.cambiarMenu = function (lugar) {
            return $mdSidenav('left').toggle();
        }

    }])