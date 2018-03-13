angular.module("disenador-de-logos")

	.controller("loginController", ["clientesService", "$state", "$mdToast", "$timeout", "paisesValue", function (clientesService, $state, $mdToast, $timeout, paisesValue) {

		var bz = this;

		bz.paises = paisesValue;

		bz.paisDefecto = null;

		clientesService.pais().then(function (res) {

			bz.paisDefecto = res.iso;

		})


		bz.datosRegistro = {};
		bz.datosLogin = {};
		bz.olvido = {
			tipo: 'cliente'
		};


		bz.completadoLogin = true;

		bz.login = function (datos, valido) {

			if (valido && bz.completadoLogin) {

				bz.completadoLogin = false;


				clientesService.login(datos).then(function (es) {

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


				})

			};

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

				})

			};

		}


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


	}])