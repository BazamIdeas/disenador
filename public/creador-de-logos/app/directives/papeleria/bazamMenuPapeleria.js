angular.module("disenador-de-logos")

    .directive("bazamMenuPapeleria", [function () {
        return {
            restrict: "AE",
            scope: false,
            controller: ["$scope", "$mdToast", "$rootScope", function ($scope, $mdToast, $rootScope) {
                var bz = this;

                $scope.agregarElementoHook = function(elementoAgregado){
                    var hook = $scope.papeleriaEditor.papeleria.modelo.caras[elementoAgregado.indiceCara].hooks[elementoAgregado.indiceHook];

                    var item = $scope.papeleriaEditor.papeleria.items[elementoAgregado.elemento];
                    
                    if (hook.items.length == hook.limite) return $mdToast.show($mdToast.base({
                        args: {
                            mensaje: "El contenedor ha llegado al limite de elementos. Elimine alguno o elija otro contenedor.",
                            clase: "danger"
                        }
                    }));

                    var items = angular.toJson(hook.items);

                    if (items.includes(item.nombre)) return $mdToast.show($mdToast.base({
                        args: {
                            mensaje: "El contenedor ya contiene un elemento " +item.nombre+ ", Elija otro elemento.",
                            clase: "danger"
                        }
                    }));

                    hook.items.push(item);
        
                }

                bz.eliminarItemHook = function(indiceCara, indiceHook, indiceItem){
                    var hook = $scope.papeleriaEditor.papeleria.modelo.caras[indiceCara].hooks[indiceHook];

                    hook.items.splice( indiceItem, 1);
                    $rootScope.$broadcast('papeleria:elementoEliminadoHook', [indiceCara, indiceHook, indiceItem]);
                }

            }],
            controllerAs:"menuPapeleria",
            templateUrl: 'app/templates/bazamMenuPapeleria.tpl'
        }
    }])

    .directive('droppableHookPapeleria', function ($rootScope) {
        return {
            restrict: 'A',
            link: function (scope, element) {
                element.droppable({
                    drop: function (event) {

                        var elementoAgregado = {
                            indiceCara: scope.$parent.$index,
                            indiceHook: scope.$index,
                            elemento: angular.element(document).find('#' + event.originalEvent.target.id).attr('indice')
                        }
                        
                        scope.agregarElementoHook(elementoAgregado); 
                        $rootScope.$broadcast('papeleria:elementoAgregadoHook', elementoAgregado);

                    }
                })
            }
        };
    })