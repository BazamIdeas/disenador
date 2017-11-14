angular.module("disenador-de-logos")

    /* Opciones */

    .controller('opcionesController', ['$scope', '$mdDialog', "$stateParams", "$sce", "LS", "$state", "categoriasService", '$mdSidenav', '$base64', "historicoResolve" ,function ($scope, $mdDialog, $stateParams, $sce, LS, $state, categoriasService, $mdSidenav, $base64, historicoResolve) {

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
      
        bz.datosEstadoAnterior = historicoResolve;

        bz.seleccionado = function (primeraSeleccion, segundaSeleccion) {

            var llaves = Object.keys(primeraSeleccion).length * Object.keys(segundaSeleccion).length;
            return llaves;

        }

        bz.datos = {

            fuentes: {},
            iconos: {}

        }

        bz.agregarElemento = function (indice, valor, tipo) {

            if (Object.keys(this.datos[tipo]).length < 3) {

                if (!bz.datos[tipo][indice]) {

                    bz.datos[tipo][indice] = valor;
                    bz.datosEstadoAnterior.respuesta[tipo][indice].estado = 'activo';

                } else {

                    delete bz.datos[tipo][indice];

                    bz.datosEstadoAnterior.respuesta[tipo][indice].estado = 'inactivo';
                }
            } else {

                if (bz.datos[tipo][indice]) {


                    delete bz.datos[tipo][indice];

                    bz.datosEstadoAnterior.respuesta[tipo][indice].estado = 'inactivo';

                } else {

                    return false;
                }
            }


        }

        /* CATEGORIAS EXISTENTES */
        bz.categoria = bz.datosEstadoAnterior.categoria;
        bz.categoriasPosibles = [];

        categoriasService.listaCategorias().then(function (res) {
            angular.forEach(res, function (valor, llave) {
                bz.categoriasPosibles.push(valor);
            })

        })

        bz.mostrarDialogo = function (ev) {
            $mdDialog.show({
                    controller: DialogController,
                    templateUrl: 'app/views/dialogos/dialogoOpciones.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    fullscreen: $scope.customFullscreen
                })
                .then(function (answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function (res) {
                    console.log(res);
                    bz.datosEstadoAnterior.respuesta.iconos = res[0].data;
                    bz.datosEstadoAnterior.respuesta.fuentes = res[1].data;
                    
                });
        };

        bz.preferencias = bz.datosEstadoAnterior.preferencias;

        function DialogController($scope, $mdDialog, elementosService, $q) {
            modal = this;
            $scope.categorias = bz.categoriasPosibles;
            $scope.preferencias = bz.preferencias;

            $scope.datos = {
                tipo: '',
                preferencias: $scope.preferencias
            }
            $scope.datosFuentes = {};
            /* SELECT FUNCTION */

            $scope.iconos = [{
                tipo: 'ICONO Y NOMBRE',
                descripcion: 'Un logo con gran impacto compuestos por su tipografía o texto y una imagen o símbolo.',
                enviar: 'ICONO'
            }, {
                tipo: 'TIPOGRAFICO',
                descripcion: 'Una forma facil de recordar en el centro de su logo.',
                enviar: 'TIPOGRAFICO'
            }, {
                tipo: 'INICIAL Y NOMBRE',
                descripcion: 'Una letra como el elemento principal de su logo.',
                enviar: 'INICIAL'
            }]

            $scope.selectA = function (i) {
                $scope.datos.tipo = $scope.iconos[i].enviar;
            }

            $scope.submit = function () {
                $scope.datosFuentes.categoria = $scope.datos.categoria;
                $scope.datosFuentes.preferencias = $scope.datos.preferencias;
                $scope.datosFuentes.tipo = 'FUENTE';
                
                promesaMultiple = $q.all([elementosService.listaSegunPref($scope.datos), elementosService.listaSegunPref($scope.datosFuentes)]);

                promesaMultiple.then(function (res) {
                    $mdDialog.cancel(res);
                }).catch(function (error) {
                    console.log(error);
                });
            }

        }



    }])