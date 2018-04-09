angular.module("disenador-de-logos")


	.directive("bazamColorPicker", [function () {
		return {
			template: "<div style='position:relative;'>\
							<div class='selector-fondo' style='border: 1px solid var(--fondo)' ng-style='jsonColor(color)' ng-click='mostrarPicker = !mostrarPicker'>\
							</div>\
							<div class='color-picker-bazam' id='color-picker-fondo' ng-show='mostrarPicker' style='position: absolute; width: 200px; height: 200px; background-color: white; z-index: 2; padding: 10px;'>\
									<div class='titulo'>\
										FONDO\
										<span class='cerrar-color-picker' ng-click='mostrarPicker = !mostrarPicker'>\
											<i class='material-icons cerrar'>clear</i>\
										</span>\
									</div>\
									<div ng-repeat='paletaColor in paletaColores track by $index' class='color' ng-style='jsonColor(paletaColor)' style='width: 9%; height: 10%; display: inline-block;' ng-click='$parent.color=paletaColor'></div>\
								</div>\
						</div>",
			scope: {
				color: "="
			},
			controller: ["$scope", "coloresPaletaValue", function ($scope, coloresPaletaValue) {
				$scope.paletaColores = coloresPaletaValue;

				$scope.jsonColor = function (color) {
					return {
						"background-color": color
					};
				};

				$scope.mostrarPicker = false;

				$scope.$on("editor:cerrarColorPickers", function () {

					$scope.mostrarPicker = false;

				});
			}]
		};
	}]);
