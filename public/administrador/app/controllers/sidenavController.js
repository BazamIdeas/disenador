angular.module("administrador")

    .controller('sidenavController', ["$state", "$mdSidenav", "$mdDialog", '$scope', 'clientesService', '$rootScope', function ($state, $mdSidenav, $mdDialog, $scope, clientesService, $rootScope) {

        var bz = this;
        bz.medidaP = bz.menuMostrar ? true : false;
        bz.medidaG = bz.menuMostrar ? false : true;

        bz.vistas = [{
            url: 'app.pedidos',
            nombre: 'Pedidos',
            icono: 'add_shopping_cart'
        }, {
            url: 'app.cliente',
            nombre: 'Clientes',
            icono: 'person'
        }, {
            url: 'app.categorias',
            nombre: 'Categorías',
            icono: 'settings'
        }, {
            url: 'app.elementos',
            nombre: 'Elementos',
            icono: 'stars'
        }, {
            url: 'app.monedas',
            nombre: 'Monedas y pasarelas',
            icono: 'attach_money'
        }, {
            url: 'app.paises',
            nombre: 'Paises',
            icono: 'flag'
        }, {
            url: 'app.planes',
            nombre: 'Planes y precios',
            icono: 'view_carousel'
        }, {
            url: 'app.usuario',
            nombre: 'Usuarios',
            icono: 'person'
        }];

        /* VERIFICA SI EL USUARIO ESTA AUTORIZADO Y LO VIGILA */
        bz.autorizado = clientesService.autorizado();

        $scope.$watch('$root.objectoCliente', function (valor, nuevoValor) {
            if (valor !== nuevoValor) {
                bz.autorizado = bz.autorizado = $rootScope.objectoCliente;
            }
        });

        /* INTERVALO DE ABRIR Y CERRAR EL MENU */
        bz.cambiarMenu = function () {
            bz.menuMostrar = !bz.menuMostrar;

            bz.medidaP = bz.menuMostrar ? 2 : 0;
            bz.medidaG = bz.menuMostrar ? 10 : 11;
        }

    }])