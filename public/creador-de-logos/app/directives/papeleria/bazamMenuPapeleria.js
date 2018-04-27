angular.module("disenador-de-logos")

    .directive("bazamMenuPapeleria", [function () {
        return {
            restrict: "AE",
            scope: false,
            controller: ["$scope", "$mdToast", function ($scope, $mdToast) {
                var bz = this;

                angular.forEach($scope.papeleriaEditor.papeleria.modelo.caras, function(cara){
                    if(cara.hooks.length > 0){
                        return bz.menuActivo = cara.nombre;
                    }
                })
                
                $scope.agregarElementoHook = function(indiceCara, indiceHook, indiceElemento){
                    var hook = $scope.papeleriaEditor.papeleria.modelo.caras[indiceCara].hooks[indiceHook];

                    var item = $scope.papeleriaEditor.papeleria.items[indiceElemento];
                    
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

                    $scope.papeleriaEditor.papeleria.modelo.caras[indiceCara].hooks[indiceHook].items.push(item);
                    $scope.$apply();
                    $scope.papeleriaEditor.agregarElemento(indiceCara, indiceHook, indiceElemento)
        
                }

                bz.eliminarItemHook = function(indiceCara, indiceHook, indiceItem){
                    var hook = $scope.papeleriaEditor.papeleria.modelo.caras[indiceCara].hooks[indiceHook];

                    hook.items.splice( indiceItem, 1);
                    $scope.papeleriaEditor.eliminarElemento(indiceCara, indiceHook, indiceItem);
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