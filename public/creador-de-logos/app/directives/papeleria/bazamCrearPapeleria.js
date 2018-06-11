angular.module("disenador-de-logos")

    .directive("bazamCrearPapeleria", [function () {
        return {
            restrict: "AE",
            scope: {
                estado: "=",
                idLogo: "<",
                papelerias: "=",
                tiene: "=",
                fuentes: "="
			},
            controller: ["$scope", "$mdToast", "$sce", "$stateParams", "$state", function ($scope, $mdToast, $sce, $stateParams, $state) {
                var bz = this;

                bz.sce = $sce;

                bz.idLogo = $scope.idLogo;

                $scope.papeleriaActiva = $scope.papelerias[0].tipo;

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

            }],
            controllerAs: "crearPapeleria",
            templateUrl: 'app/templates/bazamCrearPapeleria.tpl'
        }
    }])