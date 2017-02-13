angular.module("disenador-de-logos")

.controller('comenzarController', [function () {

    this.datos = {

        preferencias: [{
            nombre: "Femenino",
            nombre2: "Masculino",
            valor: 2
        }, {
            nombre: "Economico",
            nombre2: "Lujoso",
            valor: 2
        }, {
            nombre: "Clasico",
            nombre2: "Moderno",
            valor: 2
        }, {
            nombre: "Sutil",
            nombre2: "Evidente",
            valor: 2
        }, {
            nombre: "Simple",
            nombre2: "Detallado",
            valor: 2
        }, {
            nombre: "Joven",
            nombre2: "Adulto",
            valor: 2
        }, {
            nombre: "Formal",
            nombre2: "Divertido",
            valor: 2
        }]
    }

    this.mostrar = 1;

    this.categoriasPosibles = ['Primera', 'Segunda', 'Tercera'];




}])

.controller('opcionesController', ['$scope', '$mdDialog', "$stateParams", function ($scope, $mdDialog, $stateParams) {

    this.compartir = $stateParams.datos;


    this.respuesta = {

        iconos: [{
                id: 1,
                url: "../assets/svg/apple.svg",
                nombre: "X"
        }, {
                id: 1,
                url: "../assets/svg/audio.svg",
                nombre: "X"
        }, {
                id: 1,
                url: "../assets/svg/audiobook.svg",
                nombre: "X"
        }, {
                id: 1,
                url: "../assets/svg/book.svg",
                nombre: "X"
        }, {
                id: 1,
                url: "../assets/svg/browser.svg",
                nombre: "X"
        }, {
                id: 1,
                url: "../assets/svg/calculator.svg",
                nombre: "X"
        }, {
                id: 1,
                url: "../assets/svg/certificate.svg",
                nombre: "X"
        }, {
                id: 1,
                url: "../assets/svg/chat.svg",
                nombre: "X"
        }, {
                id: 1,
                url: "../assets/svg/chemistry.svg",
                nombre: "X"
        },
            {
                id: 1,
                url: "../assets/svg/chip.svg",
                nombre: "X"
        },
            {
                id: 1,
                url: "../assets/svg/cloud.svg",
                nombre: "X"
        },
            {
                id: 1,
                url: "../assets/svg/code.svg",
                nombre: "X"
        }],

        fuentes: [{
            id: 1,
            url: "../assets/svg/apple.svg",
            nombre: "X"
        }]

    }




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

    $scope.hide = function () {
        $mdDialog.hide();
    };

    $scope.cancel = function () {
        $mdDialog.cancel();
    };

    $scope.answer = function (answer) {
        $mdDialog.hide(answer);
    };

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
