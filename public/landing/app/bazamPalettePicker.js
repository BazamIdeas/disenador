angular.module("landing")
	.directive("bazamPalettePicker", [function(){
		return {
			restrict: "AE",
			scope: true,
			templateUrl: "/landing/app/templates/bazamPalettePicker.tpl",
			controller: ["$scope", "coloresPaletteValue", function($scope, coloresPaletteValue){


				var bz = $scope.$parent.ctrl;

				bz.palettes = coloresPaletteValue;

				bz.palettesCopy = []; 
				angular.forEach(bz.palettes, function(palette, index){

					bz.palettesCopy.push([]);
					var i;
					for (i = 0; i < palette.length; i++) { 
						bz.palettesCopy[index].push(false);
					}         
					
				});


				$scope.seleccionarColor = function ($event) {

					var indiceArrays;

					var pathSVG = $event.target;


					if (pathSVG.classList.contains("linea-1")) {
						indiceArrays = 0;
					} else if (pathSVG.classList.contains("linea-2")) {
						indiceArrays = 1;
					} else if (pathSVG.classList.contains("linea-3")) {
						indiceArrays = 2;
					} else if (pathSVG.classList.contains("linea-4")) {
						indiceArrays = 3;
					}


					var indicePalettes = parseInt(angular.element(pathSVG).data("index")) - 1;

					var valor = bz.palettesCopy[indiceArrays][indicePalettes];

					bz.palettesCopy[indiceArrays][indicePalettes] = !valor;

					!valor ? pathSVG.classList.add("color-checked") : pathSVG.classList.remove("color-checked");

				};
                

				$scope.checkRequired = function(){

					var requerir = true;
					angular.forEach(bz.palettesCopy, function(palettes){
						angular.forEach(palettes, function(palette){
							if(palette){
								requerir = false;
							}
						});
					});
                    
					return requerir;
				};

			}],
			link: function (scope, element) {

				var bz = scope.$parent.ctrl;

				element.find("[data-index]").each(function(index, el){

					var indiceArrays;

					switch (el.className.baseVal) {
						case "linea-1":
							indiceArrays = 0;
							break;
						case "linea-2":
							indiceArrays = 1;
							break;
						case "linea-3":
							indiceArrays = 2;
							break;
						case "linea-4":
							indiceArrays = 3;
					}



					var indicePalettes = parseInt(angular.element(el).data("index")) - 1;

					var valor = bz.palettesCopy[indiceArrays][indicePalettes];

					valor ? el.classList.add("color-checked") : el.classList.remove("color-checked");
                    
					el.style.fill = bz.palettes[indiceArrays][indicePalettes][0];

				});
			}
		};
	}]);