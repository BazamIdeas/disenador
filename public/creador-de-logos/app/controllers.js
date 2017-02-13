angular.module("disenador-de-logos")

.controller('comenzarController', ["$state", function ($state) {

    this.datos = {

        preferencias: [{
            nombre1: "Femenino",
            nombre2: "Masculino",
            valor: 2
        }, {
            nombre1: "Economico",
            nombre2: "Lujoso",
            valor: 2
        }, {
            nombre1: "Clasico",
            nombre2: "Moderno",
            valor: 2
        }, {
            nombre1: "Sutil",
            nombre2: "Evidente",
            valor: 2
        }, {
            nombre1: "Simple",
            nombre2: "Detallado",
            valor: 2
        }, {
            nombre1: "Joven",
            nombre2: "Adulto",
            valor: 2
        }, {
            nombre1: "Formal",
            nombre2: "Divertido",
            valor: 2
        }]
    }

    this.mostrar = 1;

    this.categoriasPosibles = ['Primera', 'Segunda', 'Tercera'];

    
}])

.controller('opcionesController', ['$scope', '$mdDialog', "$stateParams", function ($scope, $mdDialog, $stateParams) {

    this.compartir = $stateParams.datos;
    
    this.estado = false;

    this.modoSeleccionado = 'md-scale';

    this.activo = 'innactivo';
    this.innactivo = 'innactivo';

    /* Modal */

    this.status = '  ';
    this.customFullscreen = false;

    this.showAlert = function (ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        // Modal dialogs should fully cover application
        // to prevent interaction outside of dialog
        $mdDialog.show(
            $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('This is an alert title')
            .textContent('You can specify some description text in here.')
            .ariaLabel('Alert Dialog Demo')
            .ok('Got it!')
            .targetEvent(ev)
        );
    };

    this.Categorias = function (ev) {
        $mdDialog.show({
                controller: DialogController,
                templateUrl: 'app/views/dialogos/categorias.tpl',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: this.customFullscreen // Only for -xs, -sm breakpoints.
            })
            .then(function (answer) {
                this.status = 'You said the information was "' + answer + '".';
            }, function () {
                this.status = 'You cancelled the dialog.';
            });
    };

    this.Etiquetas = function (ev) {
        $mdDialog.show({
                controller: DialogController,
                templateUrl: 'app/views/dialogos/etiquetas.tpl',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: this.customFullscreen // Only for -xs, -sm breakpoints.
            })
            .then(function (answer) {
                this.status = 'You said the information was "' + answer + '".';
            }, function () {
                this.status = 'You cancelled the dialog.';
            });
    };

    this.Caracteristicas = function (ev) {
        $mdDialog.show({
                controller: DialogController,
                templateUrl: 'app/views/dialogos/caracteristicas.tpl',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: this.customFullscreen // Only for -xs, -sm breakpoints.
            })
            .then(function (answer) {
                this.status = 'You said the information was "' + answer + '".';
            }, function () {
                this.status = 'You cancelled the dialog.';
            });
    };

    function DialogController($scope, $mdDialog) {
        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.answer = function (answer) {
            $mdDialog.hide(answer);
        };
    }

    /* ************* */

    /* Fuentes y Logos */

    this.datos = {
        iconos: [],
        fuentes: []
    }



}])

.controller('procesoController', ['$scope', function ($scope) {

    this.estado = false;

    this.modoSeleccionado = 'md-scale';

}]);
