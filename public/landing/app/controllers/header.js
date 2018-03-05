angular.module("landing")

    .controller("headerController", ["navegarFactory", "clientesService", function (navegarFactory, clientesService) {

        var bz = this;

        bz.navegar = navegarFactory;

        bz.mostrarLogin = false;

        bz.callback = function () {
            navegarFactory.cliente(false);
        };

    }]);