angular.module("disenador-de-logos")

/* Comenzar */

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

/* Opciones */

.controller('opcionesController', ['$scope', '$mdDialog', "$stateParams", function ($scope, $mdDialog, $stateParams) {


    this.datosEstadoAnterior = $stateParams.datos;



    this.seleccionado = function (primeraSeleccion, segundaSeleccion) {

        var llaves = Object.keys(primeraSeleccion).length * Object.keys(segundaSeleccion).length;
        return llaves;

    }



    this.respuesta = {
        /* ICONOS */
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
        }, {
                id: 1,
                url: "../assets/svg/cloud.svg",
                nombre: "X"
        }, {
                id: 1,
                url: "../assets/svg/code.svg",
                nombre: "X"
        }],
        /* FUENTES */
        fuentes: [{
            id: 1,
            url: "#",
            nombre: "X"
        }, {
            id: 1,
            url: "#",
            nombre: "X"
        }, {
            id: 1,
            url: "#",
            nombre: "X"
        }, {
            id: 1,
            url: "#",
            nombre: "X"
        }, {
            id: 1,
            url: "#",
            nombre: "X"
        }, {
            id: 1,
            url: "#",
            nombre: "X"
        }, {
            id: 1,
            url: "#",
            nombre: "X"
        }, {
            id: 1,
            url: "#",
            nombre: "X"
        }, {
            id: 1,
            url: "#",
            nombre: "X"
        }, {
            id: 1,
            url: "#",
            nombre: "X"
        }, {
            id: 1,
            url: "#",
            nombre: "X"
        }, {
            id: 1,
            url: "#",
            nombre: "X"
        }, {
            id: 1,
            url: "#",
            nombre: "X"
        }, {
            id: 1,
            url: "#",
            nombre: "X"
        }, ]
    }

    this.datos = {

        fuentes: {},
        iconos: {}

    }

    this.agregarElemento = function (indice, valor, tipo) {
        
        if (Object.keys(this.datos[tipo]).length < 3) {

            if (!this.datos[tipo][indice]) {

                this.datos[tipo][indice] = valor;
                this.respuesta[tipo][indice].estado = 'activo';

            } else {

                delete this.datos[tipo][indice];
                this.respuesta[tipo][indice].estado = 'inactivo';
            }
        } else {

            if (this.datos[tipo][indice]) {

                
                delete this.datos[tipo][indice];
                this.respuesta[tipo][indice].estado = 'inactivo';

            } else {
                
                return false;
            }
        }


    }



    /* Modal */

    this.estado = false;
    this.modoSeleccionado = 'md-scale';

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

    };

}])

/* Proceso */

.controller('procesoController', ['$scope', '$stateParams', function ($scope, $stateParams) {
    
    this.datosEstadoAnterior = $stateParams.datos;
    
    this.estado = false;
    this.modoSeleccionado = 'md-scale';

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
            url: "../assets/svg/audiobook.svg",
            nombre: "X"
        }, {
            id: 1,
            url: "../assets/svg/audiobook.svg",
            nombre: "X"
        }, {
            id: 1,
            url: "../assets/svg/audiobook.svg",
            nombre: "X"
        }],
        fuentes: [{
            id: 1,
            url: "../assets/svg/apple.svg",
            nombre: "X"
        }]
    }

    this.datos = {

        fuentes: {},
        iconos: {}

    }

    this.efectoHover = function (indice, valor, tipo) {


        if (!this.datos[tipo][indice]) {

            this.datos[tipo][indice] = valor;
            this.respuesta[tipo][indice].estado = true;

        } else {

            delete this.datos[tipo][indice];
            this.respuesta[tipo][indice].estado = false;
        }


    }

}])

/* Editor */

.controller('editorController', ['$scope', function ($scope) {
    this.modoSeleccionado = 'md-scale';
    /* Fab Speed Dial 1 */
    this.estado1 = false;
    /* Fab Speed Dial 2 */
    this.estado2 = false;
    /* Fab Speed Dial 3 */
    this.estado3 = false;
    /* Fab Speed Dial 4 */
    this.estado4 = false;
}])

/* login */

.controller('loginController', ['$scope', function ($scope) {

}])

/* Cliente */

.controller('clienteController', ['$scope', '$mdDialog', "$stateParams", function ($scope, $mdDialog, $stateParams) {
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
        }]
    }
}])

/* Paquetes */

.controller('paquetesController', ['$scope', function ($scope) {

}])

/* Metodos */

.controller('metodosController', ['$scope', function ($scope) {

}])
