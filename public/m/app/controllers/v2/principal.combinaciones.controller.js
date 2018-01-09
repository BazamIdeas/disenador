angular.module("disenador-de-logos")


    .controller('principalCombinacionesController', ["$scope", "$base64", function ($scope, $base64) {

        var bz = this;

        bz.base64 = $base64;

        bz.logoSeleccionado = null;



        bz.avanzar = function (indice) {

            angular.forEach($scope.$parent.principal.logos, function (logo, llave) {

                if (logo.estado) {
                    logo.estado = false;
                    return false;
                }

            })

            $scope.$parent.principal.logos[indice].estado = true;

            $scope.$parent.principal.validarFormulario(true);
            //$scope.$parent.principal.avanzar(indice)
        }

}])
