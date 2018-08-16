angular.module("disenador-de-logos")

	.controller("logosController", ["$scope", "pedidosService", "$window", "$state", "logosService", "$base64", "$mdToast", "arrayToJsonMetasFactory", "$location", "Socialshare","$q", "langFactory", "elementosService", "fontService", function ($scope, pedidosService, $window, $state, logosService, $base64, $mdToast, arrayToJsonMetasFactory, $location, Socialshare, $q, langFactory, elementosService, fontService) {

		var bz = this;

		bz.base64 = $base64;

		bz.opcionMostrar = "guardados";

		bz.lang = langFactory.langsEstadoActual();

		bz.guardados = [];
		bz.comprados = [];

		bz.elegido = null;

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

		elementosService.listarFuentes().then(function (res) {

			bz.fuentes = res;

			fontService.agregarGeneral(bz.fuentes);

		});

		bz.actual = 0;
		
		$scope.$watch("logos.actual", function (newValue, oldValue) {

			if (newValue === oldValue) {
				return;
			}

			bz.mostrarPlanes(newValue, true);
		});

		logosService.mostrarGuardados()
			.then(function (res) {

				bz.guardados = res;
				bz.cantidad.guardados = bz.guardados.length;

				bz.mostrarPlanes(bz.actual, true);

			})
			.catch(function () {

			})
			.finally(function () {
				bz.terminados.guardados = true;
			});


		logosService.mostrarComprados()
			.then(function (res) {

				bz.comprados = res;
				bz.cantidad.comprados = bz.comprados.length;

			})
			.catch(function () {

			})
			.finally(function () {
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


		bz.urlCompartir = $location.port() != "80" ? $location.protocol() + "://" + $location.host() + ":" + $location.port() : $location.protocol() + "://" + $location.host();

		bz.mostrarModalSocial = false;
		bz.idLogoCompartir = null;

		bz.abrirModal = function (idLogo) {
			bz.mostrarModalSocial = true;
			bz.idLogoCompartir = idLogo;

		};

		bz.borradoCompleto = true;

		bz.borrarLogo = function (idLogo) {
			
			if (bz.borradoCompleto) {

				var defered = $q.defer();

				var promise = defered.promise;

				bz.borradoCompleto = false;

				logosService.borrarLogo(idLogo)
					.then(function () {

						angular.forEach(bz.guardados, function (valor, indice) {
							if (valor.idLogo == idLogo) {
								bz.guardados.splice(indice, 1);
								return false;
							}
						});

						defered.resolve(true);

					})
					.catch(function () {

						defered.reject();

					})
					.finally(function () {

						bz.borradoCompleto = true;

					});

				return promise;

			}
		};


		bz.buscarAtributo = function (lista, objetivo) {

			var valor = null;

			angular.forEach(lista, function (atributo) {

				if (atributo.clave == objetivo) {

					valor = atributo.valor;

				}

			});

			return valor;
		};


		bz.mostrarPlanes = function (index, previsualizar) {

			var datos = angular.copy(bz.guardados[index]);
			datos.atributos = arrayToJsonMetasFactory(datos.atributos);

			bz.datosComprar = {
				idLogo: datos.idLogo,
				logo: bz.base64.decode(datos.logo),
				idCategoria: datos.categorias_idCategoria,
				idElemento: datos.elementos_idElemento,
				tipo: "Logo y nombre",
				fuentes: {
					principal: datos.atributos.principal
				},
				colores: {
					icono: datos.atributos["color-icono"],
					nombre: datos.atributos["color-nombre"],

				},
				planes: bz.planes,
				moneda: bz.moneda
			};

			if(datos.atributos.eslogan){
					
				bz.datosComprar.fuentes.eslogan = datos.atributos.eslogan;
			}

			if (datos.atributos["color-eslogan"]) {
				bz.datosComprar.colores.eslogan = datos.atributos["color-eslogan"];
			}
			/*
			if (bz.idLogoPadre) {
				bz.datosComprar.idPadre = bz.idLogoPadre;
			}*/

			if (previsualizar) {
				return;
			}

			bz.abrirPlanes = true; // modelo para abrir la directiva

		};

		$scope.$on("sesionExpiro", function () {

			$state.go("inicio");

		});


		bz.compartir = function(provider, idLogo) {

			var unix = Date.now();

			var attrs = {
				socialshareUrl : bz.urlCompartir+"?idLogo="+idLogo+"&unix="+unix
			};

			switch (provider) {
			case "twitter":
				attrs.socialshareHashtags = "Liderlogo";
				break;
				
			case "pinterest":
				attrs.socialshareMedia = bz.urlCompartir+"/app/logo/compartido/"+idLogo; attrs.socialshareText = "Pinterest";
				break;
			}

			Socialshare.share({
				"provider": provider,
				"attrs": attrs
			});
		};

	}]);