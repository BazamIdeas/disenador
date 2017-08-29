angular.module("disenador-de-logos")

    /* Opciones */

    .controller('opcionesController', ['$scope', '$mdDialog', "$stateParams", "$sce", "LS", "$state", "categoriasService", '$mdSidenav', '$base64', function ($scope, $mdDialog, $stateParams, $sce, LS, $state, categoriasService, $mdSidenav, $base64) {

        var bz = this;

        bz.base64 = function (icono) {

            return $base64.decode(icono);

        }

        bz.codificar = function (icono) {

            return $base64.encode(icono);

        }


        bz.cambiarMenu = function (lugar) {

            return $mdSidenav('right').toggle();
        }

        /* LOCAL STORAGE */

        this.definirInfo = function (llave, datos) {
            return LS.definir(llave, datos);
        }

        if ($stateParams.datos) {
            this.definirInfo($state.current.name, $stateParams.datos);
            this.datosEstadoAnterior = $stateParams.datos;

        } else if (LS.obtener($state.current.name)) {

            this.datosEstadoAnterior = JSON.parse(LS.obtener($state.current.name));
        } else {
            $state.go('comenzar');
        }

        /* *************** */


        this.seleccionado = function (primeraSeleccion, segundaSeleccion) {

            var llaves = Object.keys(primeraSeleccion).length * Object.keys(segundaSeleccion).length;
            return llaves;

        }


        this.datosEstadoAnterior.respuesta.fuentes = [{
            id: 1,
            url: "../creador-de-logos/assets/fonts/Bahiana-Regular.ttf",
            nombre: "Bahiana-Regular"
        }, {
            id: 2,
            url: "../creador-de-logos/assets/fonts/Barrio-Regular.ttf",
            nombre: "Barrio-Regular"
        }, {
            id: 3,
            url: "../creador-de-logos/assets/fonts/CaveatBrush-Regular.ttf",
            nombre: "CaveatBrush-Regular"
        }, {
            id: 4,
            url: "../creador-de-logos/assets/fonts/DellaRespira-Regular.ttf",
            nombre: "DellaRespira-Regular"
        }, {
            id: 5,
            url: "../creador-de-logos/assets/fonts/IndieFlower.ttf",
            nombre: "IndieFlower"
        }, {
            id: 6,
            url: "../creador-de-logos/assets/fonts/Anton-Regular.ttf",
            nombre: "Anton-Regular"
        }, {
            id: 7,
            url: "../creador-de-logos/assets/fonts/FjallaOne-Regular.ttf",
            nombre: "FjallaOne-Regular"
        }, {
            id: 8,
            url: "../creador-de-logos/assets/fonts/Lobster-Regular.ttf",
            nombre: "Lobster-Regular"
        }, {
            id: 9,
            url: "../creador-de-logos/assets/fonts/Pacifico-Regular.ttf",
            nombre: "Pacifico-Regular"
        }];

        this.datos = {

            fuentes: {},
            iconos: {}

        }

        this.agregarElemento = function (indice, valor, tipo) {

            if (Object.keys(this.datos[tipo]).length < 3) {

                if (!this.datos[tipo][indice]) {

                    this.datos[tipo][indice] = valor;
                    this.datosEstadoAnterior.respuesta[tipo][indice].estado = 'activo';

                } else {

                    delete this.datos[tipo][indice];

                    this.datosEstadoAnterior.respuesta[tipo][indice].estado = 'inactivo';
                }
            } else {

                if (this.datos[tipo][indice]) {


                    delete this.datos[tipo][indice];

                    this.datosEstadoAnterior.respuesta[tipo][indice].estado = 'inactivo';

                } else {

                    return false;
                }
            }


        }

        /* CATEGORIAS EXISTENTES */
        this.categoria = this.datosEstadoAnterior.categoria;
        this.categoriasPosibles = [];

        categoriasService.listaCategorias.then(function (res) {

            angular.forEach(res.data, function (valor, llave) {

                bz.categoriasPosibles.push(valor);


            })

        })

        bz.mostrarDialogos = function (ev, nombre, id) {

            bz.mostrarDialogo(ev);
            bz.dialogos(nombre, id);

        }

        bz.configuraciones = {
            preferencias: {
                id: '1',
                nombre: 'Preferencias',
                icono: 'alarm_add'
            },
            categorias: {
                id: '2',
                nombre: 'Categorias',
                icono: 'alarm_add'
            }
        }

        bz.mostrarDialogo = function (ev) {
            $mdDialog.show({
                    controller: DialogController,
                    templateUrl: 'app/views/dialogos/dialogoOpciones.tpl',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    fullscreen: $scope.customFullscreen
                })
                .then(function (answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function () {
                    $scope.status = 'You cancelled the dialog.';
                });
        };

        bz.pestana = {
            nombre: '',
            id: ''
        };
        bz.preferencias = this.datosEstadoAnterior.preferencias;

        bz.dialogos = function (nombre, id) {
            bz.pestana.nombre = nombre;
            bz.pestana.id = id;
        }

        function DialogController($scope, $mdDialog, LS) {
            $scope.categoria = bz.categoria;
            $scope.categorias = bz.categoriasPosibles;
            $scope.pestana = bz.pestana;
            $scope.preferencias = bz.preferencias;

            $scope.dialogosCuerpos = $scope.pestana.id;

            $scope.cancel = function (llave, datos) {
                $mdDialog.cancel();
            };
        }



    }])