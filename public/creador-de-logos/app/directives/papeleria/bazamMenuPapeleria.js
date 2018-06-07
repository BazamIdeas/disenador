angular.module("disenador-de-logos")

    .directive("bazamMenuPapeleria", [function () {
        return {
            restrict: "AE",
            scope: false,
            controller: ["$scope", "$mdToast", "$sce", "dragulaService", function ($scope, $mdToast, $sce, dragulaService) {
                var bz = this;

                bz.sce = $sce;

                /* Colocamos predefinida la primera cara del modelo que posea contenedores */

                bz.menuActivo = $scope.papeleriaEditor.papeleria.modelo.caras[0].nombre;

                /* Funcion para agregar un elemento al contenedor */

                $scope.agregarElementoHook = function (indiceCara, indiceHook, indiceElemento) {
                    if (!$scope.papeleriaEditor.agregarElemento) return;
                    var hook = $scope.papeleriaEditor.papeleria.modelo.caras[indiceCara].hooks[indiceHook];

                    var item = $scope.papeleriaEditor.papeleria.items[indiceElemento];

                    var itemAgregar = $scope.papeleriaEditor.papeleria.modelo.itemsDefaults[item.nombre];

                    itemAgregar.tag = item.tag;
                    itemAgregar.tipo = item.tipo;
                    itemAgregar.nombre = item.nombre;

                    /* Si el contenedor esta al limite de su capacidad de elemento detenemos la funcion */

                    if (hook.items.length == hook.limite) return $mdToast.show($mdToast.base({
                        args: {
                            mensaje: "Este espacio esta lleno. Elimine alguno elemento o elija otro contenedor.",
                            clase: "warning"
                        }
                    }));

                    /* Si el contenedor ya posee un elemento igual detenemos la funcion */

                    for (var i = 0; i < hook.items.length; i++) {
                        if (hook.items[i].nombre == item.nombre) return $mdToast.show($mdToast.base({
                            args: {
                                mensaje: "El espacio contiene un elemento igual elija otro elemento.",
                                clase: "warning"
                            }
                        }));
                    }

                    /* Agregamos el elemento y actualizamos el scope */
                    $scope.papeleriaEditor.papeleria.modelo.caras[indiceCara].hooks[indiceHook].items.push(itemAgregar);
                    $scope.papeleriaEditor.modificarHook(indiceCara, indiceHook)
                    $scope.$apply();

                }

                bz.eliminarItemHook = function (indiceCara, indiceHook, indiceItem) {
                    var hook = $scope.papeleriaEditor.papeleria.modelo.caras[indiceCara].hooks[indiceHook];

                    hook.items.splice(indiceItem, 1);
                    $scope.papeleriaEditor.modificarHook(indiceCara, indiceHook);
                }

                dragulaService.options($scope, 'hook', {
                    removeOnSpill: false
                });

                $scope.$on('hook.drop', function (e, el, container) {
                    let hook = el.scope().$parent;
                    let indiceHook = hook.$index;
                    let indiceCara = hook.$parent.$index;

                    $scope.$apply();
                    $scope.papeleriaEditor.modificarHook(indiceCara, indiceHook);
                });

                /* Funcion para cambiar la direccion de un elemento en el contenedor o del contenedor propio */

                bz.cambiarDireccionElemento = function (direccion, hook, indiceCara, indiceHook) {
                    hook.orientacion = direccion;
                    $scope.papeleriaEditor.modificarHook(indiceCara, indiceHook);
                }

                $scope.papeleriaEditor.selectorfuentes = false;

                bz.cambiarFuente = function (mostrar, fuente, indiceCara, indiceHook) {
                    if (mostrar) {

                        bz.hookActivo = {
                            indiceCara: indiceCara,
                            indiceHook: indiceHook
                        };
                        return $scope.papeleriaEditor.selectorfuentes = !$scope.papeleriaEditor.selectorfuentes;

                    }

                    var hook = $scope.papeleriaEditor.papeleria.modelo.caras[bz.hookActivo.indiceCara].hooks[bz.hookActivo.indiceHook];

                    hook.fuente.nombre = fuente.nombre;
                    hook.fuente.url = fuente.url;

                    $scope.papeleriaEditor.modificarHook(bz.hookActivo.indiceCara, bz.hookActivo.indiceHook, true);
                }

                bz.cambiarColor = function (indiceCara, indiceHook) {

                    $scope.papeleriaEditor.cambiarColorHook(indiceCara, indiceHook, true);

                }
            }],
            controllerAs: "menuPapeleria",
            templateUrl: 'app/templates/bazamMenuPapeleria.tpl'
        }
    }])

    .directive('droppableHookPapeleria', function () {
        return {
            restrict: 'A',
            link: function (scope, element) {
                element.droppable({
                    drop: function (event) {
                        scope.agregarElementoHook(scope.$parent.$index, scope.$index, parseInt(event.originalEvent.target.getAttribute('indice')));
                    }
                })
            }
        };
    })