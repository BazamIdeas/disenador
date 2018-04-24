angular.module("disenador-de-logos")

	.directive("bazamFormLogin", [function () {

		return {
			restrict: "E",
			templateUrl: "app/templates/bazamFormLogin.tpl",
			controller: ["$scope", "clientesService", "$mdToast", "paisesValue", "$rootScope", "socialAuth", function ($scope, clientesService, $mdToast, paisesValue, $rootScope, socialAuth) {

				var bz = this;

				bz.paises = paisesValue;

				bz.paisDefecto = null;

				bz.ingresar = true;

				clientesService.pais()
					.then(function (res) {
						bz.paisDefecto = res.iso;
					});

				bz.datosLogin = {};

				bz.completadoLogin = true;

				bz.login = function (datos, valido) {

					if (valido && bz.completadoLogin) {

						bz.completadoLogin = false;

						clientesService.login(datos).then(function () {

							if (clientesService.autorizado(true)) {

								$mdToast.show($mdToast.base({
									args: {
										mensaje: "¡Bienvenido!",
										clase: "success"
									}
								}));
								$rootScope.mostrarModalLogin = false;

								if ($rootScope.callbackLogin) {

									$rootScope.callbackLogin();
								}

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

								$rootScope.mostrarModalLogin = false;

								if ($rootScope.callbackLogin) {
									$rootScope.callbackLogin();
								}


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

				bz.olvido = {
					tipo: "cliente"
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
							}));
						}).catch(function () {
							bz.loaderCargando = false;
						}).finally(function () {
							bz.peticion = false;
						});
					}
				};

				bz.confirmarToken = function (opcion, val) {
					bz.peticion = true;
					if (opcion == true) {
						if (val) {
							clientesService.cambiarContrasena(bz.olvido).then(function () {

								bz.completadoLogin = true;

								var datos = {
									correo: bz.olvido.correo,
									pass: bz.olvido.pass
								};

								bz.loaderCargando2 = false;
								bz.login(datos, true);

							}).finally(function () {
								bz.peticion = false;
							});
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
								}));
							}
						}).catch(function () {
							//console.log(res)
						}).finally(function () {
							bz.peticion = false;
						});

					}
				};

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

	
									$rootScope.mostrarModalLogin = false;
	
									if ($rootScope.callbackLogin) {
										$rootScope.callbackLogin();
									}
	
								}
								

							}).catch(function (res) {
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

	
									$rootScope.mostrarModalLogin = false;
	
									if ($rootScope.callbackLogin) {
										$rootScope.callbackLogin();
									}
	
								}
							}).catch(function (res) {
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

	.directive("bazamModalLogin", [function () {
	return {
		restrict: "E",
		templateUrl: "app/templates/bazamModalLogin.tpl"
	};

}]);