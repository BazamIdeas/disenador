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

	})
	.directive("bazamFormLogin",[ function () {

		return {
			restrict: "E",
			templateUrl: "landing/app/templates/bazamFormLogin.tpl",
			controller: ["$scope", "clientesService", "$mdToast", function ($scope, clientesService, $mdToast) {

				var bz = this;

				bz.completadoLogin = true;

				bz.login = function (datos, valido) {

					if (valido) {

						bz.completadoLogin = false;

						clientesService.login(datos).then(function () {

							if (clientesService.autorizado(true)) {

								$mdToast.show($mdToast.base({
									args: {
										mensaje: "¡Bienvenido!",
										clase: "success"
									}
								}));

								$scope.callback();

								bz.mostrarModalLogin = false;
								
							}

						}).catch(function () {

							$mdToast.show($mdToast.base({
								args: {
									mensaje: "Verifica tu Usuario y Contraseña",
									clase: "danger"
								}
							}));

						}).finally(function () {

							bz.completadoLogin = true;

						});


					}

				};



				bz.completadoRegistro = true;

				bz.registrar = function (datos, valido) {

					if (valido && bz.completadoRegistro) {

						bz.completadoRegistro = false;

						clientesService.registrar(datos.nombreCliente, datos.correo, datos.pass, datos.telefono, datos.pais).then(function () {

							if (clientesService.autorizado(true)) {

								$mdToast.show($mdToast.base({
									args: {
										mensaje: "¡Registro exitoso!",
										clase: "success"
									}
								}));

								$scope.callback();

								bz.mostrarModalLogin = false;
								
							}

						}).catch(function () {

							$mdToast.show($mdToast.base({
								args: {
									mensaje: "Un error ha ocurrido",
									clase: "danger"
								}
							}));


						}).finally(function () {

							bz.completadoRegistro = true;

						});

					}

				};


			}],
			controllerAs: "bazamLogin",
			scope: {
				callback: "<",
				mostrar: "="
			}
		};

		
	}])

	.directive("verticalCards", [function () {
	return {
		restrict: "E",
		templateUrl: "landing/app/templates/verticalCards.tpl",
		controller: ["$scope", function ($scope) {

			var bz = this;

			bz.actual = 0;
			bz.indice = 3;

			bz.consejos = $scope.consejos;

			bz.changeCard = function (v) {
				if (v) {
					if (bz.consejos[bz.indice + 1] != undefined) {
						bz.indice++;
					}
				} else {
					if (bz.consejos[bz.indice - 1] != undefined) {
						bz.indice--;
					}
				}
			}

		}],
		controllerAs: "cards",
		scope: {
			consejos: "<"
		}
	};


}])

