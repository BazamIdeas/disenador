angular.module("disenador-de-logos")


	.directive("bazamColorPicker", [function () {
		return {
			template: "<div class='bazam-color-picker'>\
							<div class='background-selector' ng-style='jsonColor(color)' ng-click='mostrarPicker = !mostrarPicker'>\
							</div>\
							<div class='background-color-picker' id='background-color-picker' ng-show='mostrarPicker'>\
									<div class='title'>\
										FONDO\
										<span class='close-color-picker' ng-click='mostrarPicker = !mostrarPicker'>\
											<i class='material-icons cerrar'>clear</i>\
										</span>\
									</div>\
									<div ng-repeat='paletaColor in paletaColores track by $index' class='color' ng-style='jsonColor(paletaColor)' ng-click='$parent.color=paletaColor'></div>\
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

				angular.element("#background-color-picker").draggable({
					revert:false
				});
				
			}]
		};
	}]);
