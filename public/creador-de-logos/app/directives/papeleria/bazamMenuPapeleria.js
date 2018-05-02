angular.module("disenador-de-logos")

    .directive("bazamMenuPapeleria", [function () {
        return {
            restrict: "AE",
            scope: false,
            controller: ["$scope", "$mdToast", "$sce", function ($scope, $mdToast, $sce) {
                var bz = this;

                bz.sce = $sce;

                angular.forEach($scope.papeleriaEditor.papeleria.modelo.caras, function(cara){
                    if(cara.hooks.length > 0){
                        return bz.menuActivo = cara.nombre;
                    }
                })
                
                $scope.agregarElementoHook = function(indiceCara, indiceHook, indiceElemento){
                    var hook = $scope.papeleriaEditor.papeleria.modelo.caras[indiceCara].hooks[indiceHook];

                    var item = $scope.papeleriaEditor.papeleria.items[indiceElemento];

                    var itemAgregar = $scope.papeleriaEditor.papeleria.modelo.itemsDefaults[item.nombre];

                    itemAgregar.tag = item.tag;
                    itemAgregar.tipo = item.tipo;
                    itemAgregar.nombre = item.nombre;
                    
                    if (hook.items.length == hook.limite) return $mdToast.show($mdToast.base({
                        args: {
                            mensaje: "El contenedor ha llegado al limite de elementos. Elimine alguno o elija otro contenedor.",
                            clase: "danger"
                        }
                    }));

                    for (var i = 0; i < hook.items.length; i++) {
                        if (hook.items[i].nombre == item.nombre) return $mdToast.show($mdToast.base({
                            args: {
                                mensaje: "El contenedor ya contiene un elemento " + item.nombre + ", Elija otro elemento.",
                                clase: "danger"
                            }
                        }));
                    }

                    $scope.papeleriaEditor.papeleria.modelo.caras[indiceCara].hooks[indiceHook].items.push(itemAgregar);
                    $scope.$apply();
                    $scope.papeleriaEditor.modificarHook(indiceCara, indiceHook)
        
                }

                bz.eliminarItemHook = function(indiceCara, indiceHook, indiceItem){
                    var hook = $scope.papeleriaEditor.papeleria.modelo.caras[indiceCara].hooks[indiceHook];

                    hook.items.splice( indiceItem, 1);
                    $scope.papeleriaEditor.modificarHook(indiceCara, indiceHook);
                }

                bz.move = function(accion, indiceCara, indiceHook, indiceElemento){

                    var nuevoIndice = indiceElemento + accion;

                    var elementos = $scope.papeleriaEditor.papeleria.modelo.caras[indiceCara].hooks[indiceHook].items;

                    if (nuevoIndice < 0 || nuevoIndice == elementos.length) return;

                    var indexes = [indiceElemento, nuevoIndice].sort();

                    elementos.splice(indexes[0], 2, elementos[indexes[1]], elementos[indexes[0]]);

                    $scope.papeleriaEditor.modificarHook(indiceCara, indiceHook);

                }

                bz.cambiarDireccionIcono = function(icono, indiceCara, indiceHook){
                    if (icono.orientacion == 'right'){
                        icono.orientacion = 'left';
                    }else{
                        icono.orientacion = 'right';
                    }

                    $scope.papeleriaEditor.modificarHook(indiceCara, indiceHook);
                }

            }],
            controllerAs:"menuPapeleria",
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