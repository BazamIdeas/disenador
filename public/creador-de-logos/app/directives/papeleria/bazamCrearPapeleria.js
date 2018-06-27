angular.module("disenador-de-logos")

    .directive("bazamCrearPapeleria", [function () {
        return {
            restrict: "AE",
            scope: {
                estado: "=",
                idLogo: "<",
                papelerias: "<",
                fuentes: "<",
                botonCerrar:"<",
                tiene:"<",
                planBajo:"<",
                mostrarPlanesSuperiores: "="
			},
            controller: ["$scope", "$mdToast", "$sce", "$stateParams", "$state", "papeleriaService", "elementosService", "fontService", function ($scope, $mdToast, $sce, $stateParams, $state, papeleriaService, elementosService, fontService) {
                var bz = this;

                bz.sce = $sce;

                bz.idLogo = $scope.idLogo;

                if($scope.fuentes == undefined && $scope.papelerias == undefined){
                    papeleriaService.listarPorClienteYlogo(bz.idLogo).then(function(res){
                        $scope.papelerias = res;
                        $scope.papeleriaActiva = $scope.papelerias[0].tipo;
                    })
            
                    elementosService.listarFuentes().then(function(res){
                        bz.fuentes = res;
                        fontService.agregarGeneral(res);
                    });
                }else{
                    $scope.papeleriaActiva = $scope.papelerias[0].tipo;
                }


                bz.enviarEditor = function(indicePapeleria, indiceModelo){

                    var papeleria = angular.copy($scope.papelerias[indicePapeleria]);
                    delete papeleria.modelos;

                    var modelo = angular.copy($scope.papelerias[indicePapeleria].modelos[indiceModelo]);
                    if(modelo.piezas){
                        delete modelo.piezas;
                    }

                    var datos = {papeleria: papeleria, modelo: modelo, fuentes: $scope.fuentes};

                    $state.go('papeleriaEditor', { id: bz.idLogo, papeleria: datos});
                }

                bz.activarPlanesSuperiores = function(){
                    $scope.mostrarPlanesSuperiores = true;
                }

            }],
            controllerAs: "crearPapeleria",
            templateUrl: 'app/templates/bazamCrearPapeleria.tpl'
        }
    }])