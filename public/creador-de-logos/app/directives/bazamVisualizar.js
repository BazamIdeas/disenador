angular.module("disenador-de-logos")


	//////////////////////////////////////////
	////VISUALIZA EL SVG SIN ACCION ALGUNA////
	//////////////////////////////////////////
	.directive("bazamVisualizar", function () {

		return {
			restrict: "AE",
			scope: {

				svg: "=svg",
				title: "<?title",
				cargado: "=?cargado"

			},
			link: function (scope, element, attrs) {
				element.html(scope.svg);

				if(scope.title){
					var title = scope.title;
					
					svgSplited = svg.split('class="textoPrincipal"', 2);

					var textoPrincipal = svgSplited[0] + 'class="textoPrincipal"';

					var i = svgSplited[1].slice(0, svgSplited[1].indexOf('>') + 1);
					var j = svgSplited[1].slice(svgSplited[1].indexOf('<'), svgSplited[1].length);

					svg = textoPrincipal + i + title + j;

					element.html(svg);
				}

				element.html(element.html());

				if('cargado' in attrs){
					scope.cargado = element.html();
				}

				
			}
		};

	})

	.directive("bazamActualizar", function () {

		return {
			restrict: "AE",
			scope: {

				svg: "<svg"

			},
			link: function (scope, element) {

				element.html(scope.svg);
				element.html(element.html());

				scope.$watch("svg", function () {
					element.html(scope.svg);
					element.html(element.html());
				});



			}
		};

	});