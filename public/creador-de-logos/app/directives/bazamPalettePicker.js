angular.module("disenador-de-logos")
	.directive("bazamPalettePicker", [function(){
		return {
			restrict: "AE",
			scope: true,
			templateUrl: "app/templates/bazamPalettePicker.tpl",
			controller: ["$scope", "coloresPaletteValue", "langFactory", function ($scope, coloresPaletteValue, langFactory){

				var bz = $scope.$parent.inicio;

				$scope.textos = langFactory.langsEstadoActual().formulario.color;

				console.log('Directiva', bz.lang)

				bz.palettes = coloresPaletteValue;

				if (bz.palettesCopy == undefined) {

					bz.palettesCopy = [];

					angular.forEach(bz.palettes, function (palette, index) {

						bz.palettesCopy.push([]);
						var i;
						for (i = 0; i < palette.length; i++) {
							bz.palettesCopy[index].push(false);
						}

					});
				}
			
				$scope.seleccionarColor= function($event){

					var indiceArrays;
                    
					var pathSVG = $event.target;

					
					if(pathSVG.classList.contains("linea-1")){
						indiceArrays = 0;
					} else if(pathSVG.classList.contains("linea-2")){
						indiceArrays = 1;
					} else if(pathSVG.classList.contains("linea-3")){
						indiceArrays = 2;
					} else if(pathSVG.classList.contains("linea-4")){
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

				element.find("[data-index]").each(function(index, el){

					var bz = scope.$parent.inicio;

					var indiceArrays;

					switch (el.className.baseVal){
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