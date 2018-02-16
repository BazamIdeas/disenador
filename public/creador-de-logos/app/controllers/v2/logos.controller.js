angular.module("disenador-de-logos")

	.controller("logosController", ["$scope", "pedidosService", "$window", "$state", "logosService", "$base64", "$mdToast", function ($scope, pedidosService, $window, $state, logosService, $base64, $mdToast) {

		var bz = this;

		bz.base64 = $base64;

		bz.opcionMostrar = "guardados";

		bz.guardados = [];
		bz.comprados = [];

		bz.salto = {
			comprados: 0,
			guardados: 0
		};

		bz.cantidad = {

			comprados: 0,
			guardados: 0

		};

		bz.terminados = {

			comprados: false,
			guardados: false

		};

		logosService.mostrarGuardados().then(function (res) {

			bz.guardados = res;
			bz.cantidad.guardados = bz.guardados.length;
			bz.terminados.guardados = true;

		}).catch(function () {
			bz.terminados.guardados = true;
		});


		logosService.mostrarComprados().then(function (res) {

			bz.comprados = res;
			bz.cantidad.comprados = bz.comprados.length;
			bz.terminados.comprados = true;            

		}).catch(function () {
			bz.terminados.comprados = true;        
		});


		bz.modificarSalto = function (accion, objetivo) {

			if (accion) {

				if (bz[objetivo][bz.salto[objetivo] + 9]) {

					bz.salto[objetivo] = bz.salto[objetivo] + 9;
				}

			} else if ((bz.salto[objetivo] - 9) >= 0) {

				bz.salto[objetivo] = bz.salto[objetivo] - 9;
			}

		};


		bz.urlCompartir = $window.location.protocol + "//" + $window.location.hostname + angular.element(document.querySelector("base")).attr("href");
		bz.mostrarModalSocial = false;
		bz.idLogoCompartir = null;

		bz.abrirModal = function (idLogo) {
			bz.mostrarModalSocial = true;
			bz.idLogoCompartir = idLogo;

		};

		bz.borradoCompleto = true;

		bz.borrarLogo = function (idLogo) {
			if (bz.borradoCompleto) {

				bz.borradoCompleto = false;

				logosService.borrarLogo(idLogo).then(function () {

					angular.forEach(bz.guardados, function (valor, indice) {
						if (valor.idLogo == idLogo) {
							bz.guardados.splice(indice, 1);
							return false;
						}
					});

					$mdToast.show($mdToast.base({
						args: {
							mensaje: "El logo fue borrado exitosamente!",
							clase: "success"
						}
					}));

				}).catch(function () {

					$mdToast.show($mdToast.base({
						args: {
							mensaje: "Un error ha ocurrido",
							clase: "danger"
						}
					}));

				}).finally(function () {

					bz.borradoCompleto = true;

				});
			}
		};


		bz.buscarAtributo = function (lista, objetivo) {

			var idFuente = null;

			angular.forEach(lista, function (atributo) {

				if (atributo.clave == objetivo) {

					idFuente = atributo.valor;

				}

			});

			return idFuente;
		};

		$scope.$on("sesionExpiro", function () {

			$state.go("principal.comenzar");

		});

	}]);
