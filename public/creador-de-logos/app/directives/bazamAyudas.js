angular.module("disenador-de-logos")
	.directive("bazamAyudas", [function () {
		return {
			templateUrl: "app/templates/bazamAyudas.tpl",
			scope: {
				estado: "="
			},
			controller: ["$scope", "$window", function ($scope, $window) {

				var bz = this;

				$scope.textos = $window.traducciones.ayudas;
				$scope.temas = $scope.textos.temas;

				this.scrollTop = function (indexTema, indexPregunta, pregunta) {

					bz.buscar = "";
					pregunta.activo = true;
					bz.preguntaActivo = pregunta.titulo;

					var element = angular.element("#pre" + indexTema + "" + indexPregunta);

					angular.element("bazam-ayudas .scroll").scrollTo(element, 1000);

				};

			}],
			controllerAs: "ctrl",
		};
	}]);