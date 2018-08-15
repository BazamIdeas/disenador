angular.module("disenador-de-logos")

	.controller("cuentaController", ["$scope", "$state", "pedidosService", "clientesService", "$mdToast", "paisesValue", "verificarBase64Factory", "clienteDatosFactory", "$window", "langFactory", function ($scope, $state, pedidosService, clientesService, $mdToast, paisesValue, verificarBase64Factory, clienteDatosFactory, $window, langFactory) {

		var bz = this;

		bz.formulario = 1;

		bz.paises = paisesValue;

		bz.lang = langFactory.langsEstadoActual();

		bz.verificarBase64 = verificarBase64Factory;

		bz.pedidos = [];
		bz.datos = {};
		bz.datosEspejo = {};

		clientesService.datos().then(function (res) {

			bz.datos = res;

		});

		pedidosService.listarPedidos().then(function (res) {

			angular.forEach(res, function (valor) {

				if (valor.estado != "EN ESPERA") {
					bz.pedidos.push(valor);
				}

			});

		});


		bz.editar = function (datos) {

			bz.datosEspejo = angular.copy(datos);
			bz.formulario = 2;

		};


		bz.completado = true;

		bz.guardar = function (datos, valido) {

			if (valido && bz.completado) {

				bz.completado = false;

				clientesService.modificar(datos.nombreCliente, datos.telefono, datos.pais)

					.then(function () {

						bz.datos = angular.copy(datos);
						bz.formulario = 1;

						$mdToast.show($mdToast.base({
							args: {
								mensaje: "¡Datos modificados!",
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

						bz.completado = true;

					});

			}

		};
		bz.fotoCargaCompletada = true;
		bz.cargandoFoto = false;
		bz.cargarFoto = function (imagen) {

			console.log(imagen)

			if (imagen) {
				if (bz.fotoCargaCompletada) {
					bz.cargandoFoto = true;

					clientesService.avatar(imagen)
						.then(function (res) {
							bz.cargandoFoto = false;
							$mdToast.show($mdToast.base({
								args: {
									mensaje: "¡Foto de Perfil Cargada!",
									clase: "success"
								}
							}));

							var user = clienteDatosFactory.obtener()
							user.foto = res;
							$window.localStorage.setItem("bzToken", angular.toJson(user));
							clienteDatosFactory.definir(user);

							bz.datos.foto = res;
						})
						.catch(function () {
							bz.cargandoFoto = false;
							$mdToast.show($mdToast.base({
								args: {
									mensaje: "Error al cargar la foto",
									clase: "danger"
								}
							}));

						})
						.finally(function () {

							bz.fotoCargaCompletada = true;
						});
				}
			}
		};

		bz.datosOlvido = {
			tipo: 'cliente',
		};

		bz.cambiarContrasena = function (datos, v) {
			bz.peticion = true;
			if (!v){
				bz.peticion = false;
				return $mdToast.show($mdToast.base({
					args: {
						mensaje: "LLene los campos correctamente.",
						clase: "danger"
					}
				}));
			}
			clientesService.verificarCambiaContrasena(datos).then(function (res) {
				
				bz.formulario = 1;
				$mdToast.show($mdToast.base({
					args: {
						mensaje: "Contraseña Modificada.",
						clase: "success"
					}
				}));

				bz.datosOlvido = {
					tipo: 'cliente',
				};
			}).catch(function () {
				bz.peticion = false;
				//console.log(res)
			}).finally(function () {
				bz.peticion = false;
			})
		}




		$scope.$on("sesionExpiro", function () {

			$state.go("inicio");

		});

	}]);