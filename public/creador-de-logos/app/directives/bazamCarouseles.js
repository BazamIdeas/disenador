angular.module("disenador-de-logos")

	/*

	/////////////////////////////////////////////
	//////Carousel de logos//////////////////////
	/////////////////////////////////////////////

	.directive("carouselCombinaciones", [function () {

		return {
			restrict: "E",
			templateUrl: "app/templates/carousel-combinaciones.tpl",
			controller: ["$scope", "$base64", "arrayToJsonMetasFactory", function ($scope, $base64, arrayToJsonMetasFactory) {

				var bz = this;

				bz.logos = $scope.logos;

				bz.largoArray = bz.logos.length;

				bz.nombre = $scope.nombre;

				bz.callback = $scope.callback;

				bz.actual = 0;

				if (bz.largoArray > 1) {
					bz.actual = 1;
				}

				bz.convertidor = arrayToJsonMetasFactory;

				bz.base64 = $base64;

			}],
			controllerAs: "carouselCombinaciones",
			scope: {
				callback: "<",
				logos: "<",
				nombre: "<"
			}
		};


	}])

	/////////////////////////////////////////////
	/////Carousel de destacados/////////////////////
	/////////////////////////////////////////////

	.directive("carouselDestacados", [function () {

		return {
			restrict: "E",
			templateUrl: "app/templates/carousel-destacados.tpl",
			controller: ["$scope", "$base64", "arrayToJsonMetasFactory", function ($scope, $base64, arrayToJsonMetasFactory) {

				var bz = this;

				bz.callback = $scope.callback;

				bz.actual = 0;

				if ($scope.logos.length > 5) {
					bz.actual = 4;
				} else if ($scope.logos.length > 4) {
					bz.actual = 3;
				} else if ($scope.logos.length > 3) {
					bz.actual = 2;
				} else if ($scope.logos.length > 2) {
					bz.actual = 1;
				}

				bz.convertidor = arrayToJsonMetasFactory;

				bz.base64 = $base64;

				bz.avanzar = function () {
					if (bz.actual < ($scope.logos.length - 2)) {
						bz.actual = bz.actual + 2;
					}
					if (bz.actual == ($scope.logos.length - 6)) {
						$scope.callback[1]($scope.logos[$scope.logos.length - 1]);
					}
				};


			}],
			controllerAs: "carouselDestacados",
			scope: {
				callback: "<",
				logos: "<"
			}
		};


	}])
	*/

	.directive("carouselMisLogos", [function () {

		return {
			restrict: "E",
			templateUrl: "app/templates/carousel-mis-logos.tpl",
			controller: ["$scope", "$base64", "arrayToJsonMetasFactory", "logosService", "$mdToast", "$location", function ($scope, $base64, arrayToJsonMetasFactory, logosService, $mdToast, $location) {

				var bz = this;

				bz.callback = $scope.callback;
				bz.elegido = $scope.elegido;
				bz.logos = $scope.logos;

				bz.base64 = $base64;

				bz.actual = 0;
		
				if ($scope.logos.length) {
					$scope.elegido = bz.base64.decode(bz.logos[bz.actual].logo);
				}

				if ($scope.logos.length > 1) {
					$scope.actual = 1;
					bz.actual = 1;
					$scope.elegido = bz.base64.decode(bz.logos[bz.actual].logo);
				}

				bz.convertidor = arrayToJsonMetasFactory;

				bz.mover = function (accion) {

					if (accion) {
						bz.actual = bz.actual == (bz.logos.length - 1) ? 0 : bz.actual + 1;
						$scope.elegido = bz.base64.decode(bz.logos[bz.actual].logo);
						$scope.actual = bz.actual;
					} else {
						bz.actual = bz.actual == 0 ? bz.logos.length - 1 : bz.actual - 1;
						$scope.elegido = bz.base64.decode(bz.logos[bz.actual].logo);
						$scope.actual = bz.actual;
					}

				};

				bz.borrarSlider = function (idLogo) {
					bz.callback[3](idLogo);

					if ($scope.logos.length && bz.actual == $scope.logos.length - 1) {
						bz.actual = bz.actual - 1;
						$scope.elegido = bz.base64.decode(bz.logos[bz.actual].logo);
						$scope.actual = bz.actual;
					}
				};



				
				var dominio = $location.port() != "80" ? $location.protocol() + "://" + $location.host() + ":" + $location.port() : $location.protocol() + "://" + $location.host();

				bz.completadoCompartir = true;
				bz.compartirPorEmail = function (email, logo, valido) {

					if (valido && bz.completadoCompartir) {

						bz.completadoCompartir = false;
		
						logosService.enviarPorEmail(logo.idLogo, email, dominio)
							.then(function () {
								$mdToast.show($mdToast.base({
									args: {
										mensaje: "Su logo ha sido enviado!",
										clase: "success"
									}
								}));

							})
							.catch(function () {
								$mdToast.show($mdToast.base({
									args: {
										mensaje: "Un error ha ocurrido",
										clase: "danger"
									}
								}));
							})
							.finally(function () {
								bz.completadoCompartir = true;
							});

					}
				};

			}],
			controllerAs: "carouselMisLogos",
			scope: {
				callback: "<",
				logos: "<",
				elegido: "=",
				actual: "="
			}
		};


	}]);