angular.module("disenador-de-logos")

    .directive("bazamCrearPapeleria", [function () {
        return {
            restrict: "AE",
            scope: {
                estado: "=",
                idLogo: "<",
                papelerias: "="
			},
            controller: ["$scope", "$mdToast", "$sce", "$stateParams", "$state", function ($scope, $mdToast, $sce, $stateParams, $state) {
                var bz = this;

                bz.sce = $sce;

                bz.idLogo = $scope.idLogo;

                bz.enviarEditor = function(indicePapeleria, indiceModelo){

                    let papeleria = angular.copy($scope.papelerias[indicePapeleria]);
                    delete papeleria.modelos;

                    let modelo = angular.copy($scope.papelerias[indicePapeleria].modelos[indiceModelo]);
                    if(modelo.piezas){
                        delete modelo.piezas;
                    }

                    let datos = {papeleria: papeleria, modelo: modelo};
                    $state.go('papeleriaEditor', { id: bz.idLogo, papeleria: datos});
                }

            }],
            controllerAs: "crearPapeleria",
            templateUrl: 'app/templates/bazamCrearPapeleria.tpl'
        }
    }])