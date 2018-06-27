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

	}).directive("bazamActualizar", function () {

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

	})
	.directive("bazamFormLogin", [function () {

		return {
			restrict: "E",
			templateUrl: "landing/app/templates/bazamFormLogin.tpl",
			scope: {
				callback: "<",
				mostrar: "=",
				opcion: "="
			},
			controller: ["$scope", "clientesService", "$mdToast", "socialAuth", function ($scope, clientesService, $mdToast, socialAuth) {

				var bz = this;

				bz.ingresar = $scope.opcion;

				bz.olvido = {
					tipo: 'cliente'
				};

				bz.completadoLogin = true;

				bz.login = function (datos, valido) {

					if (valido) {

						bz.loginForm.falloLogin = false;
						bz.completadoLogin = false;

						clientesService.login(datos).then(function () {

							if (clientesService.autorizado(true)) {

								$scope.mostrar = false;
								$scope.callback();

							}

						}).catch(function () {

							$mdToast.show($mdToast.base({
								args: {
									mensaje: "Su usuario o contraseña son erroneos por favor verifique los mismos y vuelva a ingresar",
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

								$scope.mostrar = false;
								$scope.callback();

							}

						}).catch(function () {

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
							//console.log(res)
						}).finally(function () {
							bz.peticion = false;
						})

					}
				}


				/* REDES SOCIALES */

				bz.social = function (op) {

					switch (op) {
						case 'fb':

							socialAuth.facebook().then(function (res) {

								if (clientesService.autorizado(true)) {

									$mdToast.show($mdToast.base({
										args: {
											mensaje: "¡Bienvenido! " + res.data.msg,
											clase: "success"
										}
									}));

									$scope.mostrar = false;

								}

							}).catch(function () {
								$mdToast.show($mdToast.base({
									args: {
										mensaje: "Un error ha ocurrido",
										clase: "danger"
									}
								}));
							}).finally(function () {

							});

							break;

						case 'gg':

							socialAuth.google().then(function (res) {
								if (clientesService.autorizado(true)) {

									$mdToast.show($mdToast.base({
										args: {
											mensaje: "¡Bienvenido! " + res.data.msg,
											clase: "success"
										}
									}));

									$scope.mostrar = false;
								}
							}).catch(function () {
								$mdToast.show($mdToast.base({
									args: {
										mensaje: "Un error ha ocurrido",
										clase: "danger"
									}
								}));
							}).finally(function () {

							});

							break;
					}
				}


			}],
			controllerAs: "bazamLogin"
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
