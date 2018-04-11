angular.module("disenador-de-logos")
	.directive("bazamPalettePicker", ["$compile",function($compile){
		return {
			restrict: "AE",
			scope: true,
			templateUrl: "app/templates/bazamPalettePicker.tpl",
			controller: ["$scope", function($scope){

				$scope.palettes = [
					[
						["#ff7530", "#ad4f20", "#683014"],
						["#ed2d2d", "#a31f1f", "#561010"],
						["#efec2b", "#c6c425", "#99971e"],
						["#a4f230", "#6fa322", "#446315"],
						["#2a91e0", "#1e68a0", "#124063"],
						["#ff7530", "#ad4f20", "#683014"],
						["#ed2d2d", "#a31f1f", "#561010"],
						["#efec2b", "#c6c425", "#99971e"],
						["#a4f230", "#6fa322", "#446315"],
						["#2a91e0", "#1e68a0", "#124063"],
						["#ff7530", "#ad4f20", "#683014"],
						["#ed2d2d", "#a31f1f", "#561010"],
						["#efec2b", "#c6c425", "#99971e"],
						["#a4f230", "#6fa322", "#446315"],
						["#2a91e0", "#1e68a0", "#124063"],
						["#ff7530", "#ad4f20", "#683014"],

					],
					[
						["#efec2b", "#c6c425", "#99971e"],
						["#a4f230", "#6fa322", "#446315"],
						["#2a91e0", "#1e68a0", "#124063"],
						["#ff7530", "#ad4f20", "#683014"],
						["#ed2d2d", "#a31f1f", "#561010"],
						["#efec2b", "#c6c425", "#99971e"],
						["#efec2b", "#c6c425", "#99971e"],
						["#a4f230", "#6fa322", "#446315"],
						["#2a91e0", "#1e68a0", "#124063"],
						["#ff7530", "#ad4f20", "#683014"],
						["#ed2d2d", "#a31f1f", "#561010"],
						["#efec2b", "#c6c425", "#99971e"],
						["#efec2b", "#c6c425", "#99971e"],
						["#efec2b", "#c6c425", "#99971e"],
						["#a4f230", "#6fa322", "#446315"],
						["#2a91e0", "#1e68a0", "#124063"],
					],
					[
						["#2a91e0", "#1e68a0", "#124063"],
						["#ff7530", "#ad4f20", "#683014"],
						["#ed2d2d", "#a31f1f", "#561010"],
						["#efec2b", "#c6c425", "#99971e"],
						["#efec2b", "#c6c425", "#99971e"],
						["#a4f230", "#6fa322", "#446315"],
						["#2a91e0", "#1e68a0", "#124063"],
						["#ff7530", "#ad4f20", "#683014"],
						["#ed2d2d", "#a31f1f", "#561010"],
						["#efec2b", "#c6c425", "#99971e"],
						["#efec2b", "#c6c425", "#99971e"],
						["#a4f230", "#6fa322", "#446315"],
						["#efec2b", "#c6c425", "#99971e"],
						["#efec2b", "#c6c425", "#99971e"],
						["#a4f230", "#6fa322", "#446315"],
						["#2a91e0", "#1e68a0", "#124063"],
						["#ff7530", "#ad4f20", "#683014"]
					]
				];
                

				$scope.palettesCopy = []; 
				angular.forEach($scope.palettes, function(palette, index){

					$scope.palettesCopy.push([]);
					var i;
					for (i = 0; i < palette.length; i++) { 
						$scope.palettesCopy[index].push(false);
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

					var indicePalettes = parseInt(pathSVG.dataset.index) - 1;
                    
					var valor = $scope.palettesCopy[indiceArrays][indicePalettes];
                    
					$scope.palettesCopy[indiceArrays][parseInt(pathSVG.dataset.index) - 1] = !valor;

					!valor ? pathSVG.classList.add("color-checked") : pathSVG.classList.remove("color-checked");

				};
                

				$scope.checkRequired = function(){

					var requerir = true;
					angular.forEach($scope.palettesCopy, function(palettes){
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

					var indicePalettes = parseInt(el.dataset.index) - 1;
                    
					el.style.fill = scope.palettes[indiceArrays][indicePalettes][0];

					//el.setAttribute("ng-class", "{'color-checked': palettesCopy["+indiceArrays+"]["+indicePalettes+"]}");


					
				});

				//element.html($compile(element.html)(scope));

			}
		};
	}]);