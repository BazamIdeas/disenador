angular.module("disenador-de-logos")

	.controller("loginController", ["clientesService", "$state", "$mdToast", "$timeout", "paisesValue","socialAuth", function (clientesService, $state, $mdToast, $timeout, paisesValue, socialAuth) {

		var bz = this;

		bz.paises = paisesValue;

		bz.paisDefecto = null;

		clientesService.pais().then(function (res) {

			bz.paisDefecto = res.iso;

		});

		bz.datosRegistro = {};
		bz.datosLogin = {};


		/* INGRESO */

		bz.completadoLogin = true;

		bz.login = function (datos, valido) {

			if (valido && bz.completadoLogin) {

				bz.completadoLogin = false;


				clientesService.login(datos).then(function (res) {

					if (clientesService.autorizado(true)) {


						$mdToast.show($mdToast.base({
							args: {
								mensaje: "¡Bienvenido!",
								clase: "success"
							}
						}));



						$state.go("logos");

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


		/* REGISTRO */

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

						$state.go("logos");

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


		/* OLVIDO DE CONTRASEÑA */

		bz.olvido = {
			tipo: 'cliente'
		};

		bz.forgotPass = function (datos, v) {

			datos.tipo = 'cliente';
			if (!v) return $mdToast.show($mdToast.base({
				args: {
					mensaje: "Verifica los campos del formulario.",
					clase: "danger"
				}
			}));

			bz.peticion = true;
			bz.loaderCargando2 = true;

			clientesService.forgotPass(datos).then(function () {
				bz.rc = 2;
				bz.loaderCargando2 = false;
				$mdToast.show($mdToast.base({
					args: {
						mensaje: "Codigo Enviado al correo.",
						clase: "success"
					}
				}));
			}).catch(function () {
				bz.loaderCargando = false;
			}).finally(function () {
				bz.peticion = false;
			})

		}

		bz.confirmarToken = function (opcion, val) {

			if (opcion == 'cambiar') {
				if (!val) return;
				bz.peticion = true;
				clientesService.cambiarContrasena(bz.olvido).then(function () {
					var datos = {
						correo: bz.olvido.correo,
						pass: bz.olvido.pass
					};
					bz.login(datos, true);

				}).catch(function () {}).finally(function () {
					bz.peticion = false;
				})

			} else {
				bz.peticion = true;
				clientesService.confirmarToken(bz.olvido.token).then(function (res) {
					if (res) {
						bz.rc = 3;
						$mdToast.show($mdToast.base({
							args: {
								mensaje: "Codigo confirmado.",
								clase: "success"
							}
						}));
					}
				}).catch(function () {
					bz.loaderCargando = false;
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
						console.log(res)
					}).catch(function (res) {
						console.log(res)
					}).finally(function () {

					});

					break;

				case 'gg':

					socialAuth.google().then(function () {
						console.log(res)
					}).catch(function (res) {
						console.log(res)
					}).finally(function () {

					});

					break;
			}
		}
	}]);