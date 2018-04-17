angular.module("disenador-de-logos")

	/////////////////////////////////////////////
	//////REDIRECCIONAR EN CAMBIO DE TAMAÑO//////
	/////////////////////////////////////////////

	.directive("bazamRedireccionar", function ($window, $location) {

		return {
			restrict: "AE",
			link: function () {

				if ($window.innerWidth < 1024) {
					$window.location = "/m" + $location.url();
				}

				angular.element(window).resize(function () {
					if ($window.innerWidth < 1024) {
						$window.location = "/m" + $location.url();
					}
				});

			}
		};

	});