angular.module("disenador-de-logos")

    .directive("bazamMenuPapeleria", [function () {
        return {
            restrict: "AE",
            scope: false,
            controller: ["$scope", "$mdToast", "$rootScope", function ($scope, $mdToast, $rootScope) {
                var bz = this;

                angular.forEach($scope.papeleriaEditor.papeleria.modelo.caras, function(cara){
                    if(cara.hooks.length > 0){
                        return bz.menuActivo = cara.nombre;
                    }
                })
                

                bz.cambiarCara = function(index){
                    $rootScope.$broadcast('papeleria:cambioCara', {indice: index});
                }

                $scope.agregarElementoHook = function(elementoAgregado){
                    var hook = $scope.papeleriaEditor.papeleria.modelo.caras[elementoAgregado.indiceCara].hooks[elementoAgregado.indiceHook];

                    var item = $scope.papeleriaEditor.papeleria.items[elementoAgregado.elemento];
                    
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

                    $scope.papeleriaEditor.papeleria.modelo.caras[elementoAgregado.indiceCara].hooks[elementoAgregado.indiceHook].items.push(item);
                    $scope.$apply();
                    return $rootScope.$broadcast('papeleria:elementoAgregadoHook', elementoAgregado);
        
                }

                bz.eliminarItemHook = function(indiceCara, indiceHook, indiceItem){
                    var hook = $scope.papeleriaEditor.papeleria.modelo.caras[indiceCara].hooks[indiceHook];

                    hook.items.splice( indiceItem, 1);
                    return $rootScope.$broadcast('papeleria:elementoEliminadoHook', { indiceCara: indiceCara, indiceHook:indiceHook, elemento :indiceItem});
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

                        var elementoAgregado = {
                            indiceCara: scope.$parent.$index,
                            indiceHook: scope.$index,
                            elemento: parseInt(event.originalEvent.target.getAttribute('indice'))
                        }
                        
                        scope.agregarElementoHook(elementoAgregado); 

                    }
                })
            }
        };
    })