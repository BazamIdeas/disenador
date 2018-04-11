angular.module("disenador-de-logos")
	.directive("bazamPalettePicker", [function(){
		return {
			restrict: "AE",
			scope: true,
			templateUrl: "app/templates/bazamPalettePicker.tpl",
			controller: ["$scope", "coloresPaletteValue", function($scope, coloresPaletteValue){

				$scope.$parent.inicio.palettes = coloresPaletteValue;

				$scope.$parent.inicio.palettesCopy = []; 
				angular.forEach($scope.$parent.inicio.palettes, function(palette, index){

					$scope.$parent.inicio.palettesCopy.push([]);
					var i;
					for (i = 0; i < palette.length; i++) { 
						$scope.$parent.inicio.palettesCopy[index].push(false);
					}         
					
				});


				$scope.seleccionarColor= function($event){

					var indiceArrays;
                    
					var pathSVG = $event.target;

					
					if(pathSVG.classList.contains("linea-1")){
						indiceArrays = 0;
						
					}
					else if(pathSVG.classList.contains("linea-2")){
						indiceArrays = 1;
					}
					else if(pathSVG.classList.contains("linea-3")){
						indiceArrays = 2;
					}

					var indicePalettes = parseInt(angular.element(pathSVG).data("index")) - 1;
                    
					var valor = $scope.$parent.inicio.palettesCopy[indiceArrays][indicePalettes];
                    
					$scope.$parent.inicio.palettesCopy[indiceArrays][indicePalettes] = !valor;

					!valor ? pathSVG.classList.add("color-checked") : pathSVG.classList.remove("color-checked");

				};
                

				$scope.checkRequired = function(){

					var requerir = true;
					angular.forEach($scope.$parent.inicio.palettesCopy, function(palettes){
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
					}

					var indicePalettes = parseInt(angular.element(el).data("index")) - 1;
                    
					el.style.fill = scope.$parent.inicio.palettes[indiceArrays][indicePalettes][0];

				});
			}
		};
	}]);