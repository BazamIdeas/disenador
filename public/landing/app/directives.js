angular.module("landing")

//////////////////////////////////////////
////VISUALIZA EL SVG SIN ACCION ALGUNA////
//////////////////////////////////////////
	.directive("bazamVisualizar", function () {

		return {
			restrict: "AE",
			scope: {

				svg: "=svg"

			},
			link: function (scope, element) {

				element.html(scope.svg);
				element.html(element.html());


			}
		};

	});

