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
	.directive("bazamFormLogin", [function () {

		return {
			restrict: "E",
			templateUrl: "landing/app/templates/bazamFormLogin.tpl",
			controller: ["$scope", "clientesService", "$mdToast", function ($scope, clientesService, $mdToast) {

				var bz = this;

				bz.olvido = {
					tipo: 'cliente'
				};

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


				bz.forgotPass = function (datos, v) {
					if (v) {
						bz.peticion = true;
						bz.loaderCargando2 = true;
						clientesService.forgotPass(datos).then(function (res) {
							bz.rc = 2;
							bz.loaderCargando2 = false;
							$mdToast.show($mdToast.base({
								args: {
									mensaje: "Codigo enviado al correo.",
									clase: "success"
								}
							}))
						}).catch(function (res) {
							bz.loaderCargando = false;
						}).finally(function () {
							bz.peticion = false;
						})
					}
				}

				bz.confirmarToken = function (opcion, val) {
					bz.peticion = true;
					if (opcion == true) {
						if (val) {
							clientesService.cambiarContrasena(bz.olvido).then(function (res) {

								$mdToast.show($mdToast.base({
									args: {
										mensaje: "Contraseña cambiada.",
										clase: "success"
									}
								}))

								bz.completadoLogin = true;

								var datos = {
									correo: bz.olvido.correo,
									pass: bz.olvido.pass
								};

								bz.loaderCargando2 = false;
								bz.login(datos, true);

							}).finally(function () {
								bz.peticion = false;
							})
						}
					} else {
						clientesService.confirmarToken(bz.olvido.token).then(function (res) {
							if (res) {
								bz.rc = 3;
								$mdToast.show($mdToast.base({
									args: {
										mensaje: "Codigo Confirmado.",
										clase: "success"
									}
								}))
							}
						}).catch(function (res) {
							console.log(res)
						}).finally(function () {
							bz.peticion = false;
						})

					}
				}


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

				bz.items = $scope.items;

				bz.changeCard = function (v) {
					if (v) {
						if (bz.items[bz.indice + 1] != undefined) {
							bz.indice++;
						}
					} else {
						if (bz.items[bz.indice - 1] != undefined) {
							bz.indice--;
						}
					}
				}

			}],
			controllerAs: "cards",
			scope: {
				items: "<"
			}
		};


	}])

	.directive("bazamCarousel", [function () {
		return {
			templateUrl: "landing/app/templates/bazam-carousel.tpl",
			controller: ["$scope", function ($scope) {

				var bz = this;

				bz.indice = 0;
				bz.items = $scope.items;
				bz.opciones = $scope.opciones;

				bz.changeRight = function (v) {
					if (bz.items[bz.indice + 1] != undefined) {
						bz.indice++;
					} else {
						bz.indice = 0;
					}
				}

				bz.changeLeft = function (v) {
					if (bz.items[bz.indice - 1] != undefined) {
						bz.indice--;
					} else {
						bz.indice = bz.items.length - 1;
					}
				}

			}],
			controllerAs: "ctrl",
			scope: {
				items: "<",
				opciones: "<"
			}
		};


	}])