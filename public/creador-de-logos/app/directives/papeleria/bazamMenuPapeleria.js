angular.module("disenador-de-logos")

    .directive("bazamMenuPapeleria", [function () {
        return {
            restrict: "AE",
            scope: false,
            controller: ["$scope", "$mdToast", "$sce", function ($scope, $mdToast, $sce) {
                var bz = this;

                bz.sce = $sce;

                /* Colocamos predefinida la primera cara del modelo que posea contenedores */

                bz.menuActivo = $scope.papeleriaEditor.papeleria.modelo.caras[0].nombre;
                
                /* Funcion para agregar un elemento al contenedor */

                $scope.agregarElementoHook = function (indiceCara, indiceHook, indiceElemento) {
                    var hook = $scope.papeleriaEditor.papeleria.modelo.caras[indiceCara].hooks[indiceHook];

                    var item = $scope.papeleriaEditor.papeleria.items[indiceElemento];

                    var itemAgregar = $scope.papeleriaEditor.papeleria.modelo.itemsDefaults[item.nombre];

                    itemAgregar.tag = item.tag;
                    itemAgregar.tipo = item.tipo;
                    itemAgregar.nombre = item.nombre;

                    /* Si el contenedor esta al limite de su capacidad de elemento detenemos la funcion */

                    if (hook.items.length == hook.limite) return $mdToast.show($mdToast.base({
                        args: {
                            mensaje: "El contenedor ha llegado al limite de elementos. Elimine alguno o elija otro contenedor.",
                            clase: "danger"
                        }
                    }));
                    
                    /* Si el contenedor ya posee un elemento igual detenemos la funcion */

                    for (var i = 0; i < hook.items.length; i++) {
                        if (hook.items[i].nombre == item.nombre) return $mdToast.show($mdToast.base({
                            args: {
                                mensaje: "El contenedor ya contiene un elemento " + item.nombre + ", Elija otro elemento.",
                                clase: "danger"
                            }
                        }));
                    }

                    /* Agregamos el elemento y actualizamos el scope */

                    $scope.papeleriaEditor.papeleria.modelo.caras[indiceCara].hooks[indiceHook].items.push(itemAgregar);
                    $scope.$apply();
                    $scope.papeleriaEditor.modificarHook(indiceCara, indiceHook)

                }

                bz.eliminarItemHook = function (indiceCara, indiceHook, indiceItem) {
                    var hook = $scope.papeleriaEditor.papeleria.modelo.caras[indiceCara].hooks[indiceHook];

                    hook.items.splice(indiceItem, 1);
                    $scope.papeleriaEditor.modificarHook(indiceCara, indiceHook);
                }

                bz.move = function (accion, indiceCara, indiceHook, indiceElemento) {

                    var nuevoIndice = indiceElemento + accion;

                    var elementos = $scope.papeleriaEditor.papeleria.modelo.caras[indiceCara].hooks[indiceHook].items;

                    if (nuevoIndice < 0 || nuevoIndice == elementos.length) return;

                    var indexes = [indiceElemento, nuevoIndice].sort();

                    elementos.splice(indexes[0], 2, elementos[indexes[1]], elementos[indexes[0]]);

                    $scope.papeleriaEditor.modificarHook(indiceCara, indiceHook);

                }


                /* Funcion para cambiar la direccion de un elemento en el contenedor o del contenedor propio */

                bz.cambiarDireccionElemento = function (elemento, indiceCara, indiceHook) {

                    var cambio = function (direccion) {
                        if (elemento.items.length > 0) {
                            angular.forEach(elemento.items, function (item) {
                                if (item.icono != null) {
                                    item.icono.orientacion = direccion;
                                }
                            })
                        }
                    }

                    if (elemento.orientacion == 'right') {
                        elemento.orientacion = 'left';
                        if (elemento.id) {
                            cambio('left');
                        }
                    } else {
                        elemento.orientacion = 'right';
                        if (elemento.id) {
                            cambio('right');
                        }
                    }

                    $scope.papeleriaEditor.modificarHook(indiceCara, indiceHook);
                }

                bz.cambiarFuente = function(fuente, indiceCara, indiceHook){
                    var hook = $scope.papeleriaEditor.papeleria.modelo.caras[indiceCara].hooks[indiceHook];

                    hook.fuente.nombre = fuente.nombre;
                    hook.fuente.url = fuente.url;
                    
                    $scope.papeleriaEditor.modificarHook(indiceCara, indiceHook, true);
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