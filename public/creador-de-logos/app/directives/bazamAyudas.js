angular.module("disenador-de-logos")
	.directive("bazamAyudas", [function () {
		return {
			templateUrl: "app/templates/bazamAyudas.tpl",
			controller: ["$scope", "$window", function ($scope, $window) {

				$scope.textos = $window.traducciones.ayudas;
				$scope.temas = $scope.textos.temas;

			}],
			controllerAs: "ctrl",
		};
	}]);