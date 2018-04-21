angular.module("disenador-de-logos")

	.controller("inicioController", ["categoriasService", "preferenciasService", "elementosService", "$stateParams", "$q", "$scope", "$state", "crearLogoFactory", "clientesService", "$mdToast", "$timeout", "logosService", "$base64", "coloresFactory", "landingResolve", "coloresPaletteValue", "etiquetasService", "pedidosService", "$rootScope", "$httpParamSerializer", "$window", function (categoriasService, preferenciasService, elementosService, $stateParams, $q, $scope, $state, crearLogoFactory, clientesService, $mdToast, $timeout, logosService, $base64, coloresFactory, landingResolve, coloresPaletteValue, etiquetasService, pedidosService, $rootScope, $httpParamSerializer, $window) {

		var bz = this;

		bz.base64 = $base64;

		bz.obtenerColores = coloresFactory;

		bz.palettes = coloresPaletteValue;

		if (landingResolve) {
			bz.palettesCopy = landingResolve.palettesCopy;
		}

		bz.datos = landingResolve ? landingResolve.datos : {
			nombre: "Mi logo",
			preferencias: [],
			categoria: {
				icono: "",
				fuente: ""
			},
			etiquetasSeleccionadas: []
		};

		bz.compartirPorEmailUrl = function () {

			var datosFormat = angular.copy(bz.datos);

			angular.forEach(datosFormat.etiquetasSeleccionadas, function(valor){
				if(valor.$$hashKey){
					delete valor.$$hashKey;
				}
			});

			delete datosFormat.fuentes;
			delete datosFormat.colores;

			var datos = {
				datos: datosFormat,
				palettesCopy: bz.palettesCopy,
				logoCompartido: true
			};

			bz.urlCompartir = $window.location.port !== "80" ? $window.location.protocol + "//" + $window.location.hostname + ":" + $window.location.port : $window.location.protocol + "//" + $window.location.hostname;

			var url = $window.location + encodeURI(JSON.stringify(datos));

			return url;
		}

		categoriasService.listaCategorias("FUENTE")
			.then(function (res) {
				bz.datos.fuentes = res;
			})
			.catch(function () {});

		bz.coloresIguales = function (color) {

			var coincidencia;

			angular.forEach(bz.datos.colores, function (datosColor) {

				if (angular.equals(color, datosColor)) {
					coincidencia = true;
				}
			});

			return coincidencia;

		};

		bz.jqueryScrollbarOptions = {};

		bz.iconos = [];

		bz.fuentes = [];

		bz.logos = [];

		bz.aprobados = [];

		bz.logoSeleccionado = null;
		bz.logoElegido = null;
		bz.predisenadoSeleccionado = null;

		bz.objetivoEditor = null; //posibles valores 'nuevo' o 'predisenado'

		bz.categoriasPosibles = {
			fuentes: [],
			iconos: []
		};

		bz.preferencias = [];

		categoriasService.listaCategorias("ICONO").then(function (res) {
			bz.categoriasPosibles.iconos = res;
		}).catch(function () {});

		categoriasService.listaCategorias("FUENTE").then(function (res) {
			bz.categoriasPosibles.fuentes = res;
		}).catch(function () {});

		bz.combinar = function (iconos, fuentes) {

			bz.datos.colores = [];

			angular.forEach(bz.palettesCopy, function (palettes, indicePalettes) {
				angular.forEach(palettes, function (palette, indicePalette) {
					if (palette) {
						bz.datos.colores.push(bz.palettes[indicePalettes][indicePalette]);
					}
				});
			});

			var logos = crearLogoFactory(iconos, fuentes);

			var cantidadLogos = logos.length;

			while (cantidadLogos) {

				var indiceRandom = Math.floor(Math.random() * (cantidadLogos - 1)) + 0;
				bz.logos.push(logos[indiceRandom]);
				logos.splice(indiceRandom, 1);
				cantidadLogos--;
			}

			angular.element(".contenedor-principal > div").animate({
				scrollTop: 0
			}, 1000);

		};

		bz.completado = true;

		// Si no es un logo compartido

		if (landingResolve && !landingResolve.logoCompartido) {
			bz.combinar(landingResolve.iconos, landingResolve.fuentes);
		}

		bz.solicitarElementos = function (inicial) {

			if (bz.completado) {

				if (bz.datosForm && !bz.datosForm.$valid && !landingResolve.logoCompartido) return;

				bz.completado = false;

				var tags = [];

				angular.forEach(bz.datos.etiquetasSeleccionadas, function (tag) {
					tags.push(tag.traduccion.valor);
				})

				var promesaIconos = inicial ? elementosService.listarIniciales(inicial) : elementosService.listarIconosSegunTags(tags, bz.datos.categoria.icono, bz.iconos, 12);
				var promesaFuentes = elementosService.listaFuentesSegunPref(bz.datos.categoria.fuente, bz.datos.preferencias, 12);

				$q.all([
						promesaIconos,
						promesaFuentes
					])
					.then(function (res) {

						angular.forEach(res[0], function (icono) {
							bz.iconos.push(icono.idElemento);
						});

						bz.combinar(res[0], res[1]);


					})
					.catch(function (res) {
						console.log(res)
					})
					.finally(function () {

						bz.completado = true;

					});

			}

		};

		// Si es un logo compartido 
		if (landingResolve && landingResolve.logoCompartido) {
			bz.solicitarElementos();
		}

		bz.preAvanzar = function (logo) {
			bz.logoSeleccionado = bz.logos.indexOf(logo);
			bz.avanzar();
		};

		bz.avanzar = function () {

			var datos = {
				status: true,
				datos: {
					logo: bz.logos[bz.logoSeleccionado],
					texto: bz.datos.nombre,
					categoria: bz.logos[bz.logoSeleccionado].icono.categorias_idCategoria,
					colores: bz.logos[bz.logoSeleccionado].colores
				}
			};

			$state.go("editor", datos);

		};

		bz.comprarLogo = function (svg, colores, logo, idLogo, v) {

			bz.datosComprar = {
				logo: svg,
				idLogo: idLogo,
				idElemento: logo.icono.idElemento,
				tipo: "Logo y nombre",
				fuentes: {
					principal: logo.fuente.idElemento
				},
				colores: {
					fondo: colores[0],
					icono: colores[1],
					nombre: colores[2]
				},
				planes: bz.planes,
				moneda: bz.moneda
			};

			if (v) {
				return bz.verPrevisualizar = true;
			}
			bz.abrirPlanes = true;
		};

		/* guardar logo */


		bz.preGuardarLogo = function (logo) {

			if (logo.idLogo) {
				return;
			}

			if (!clientesService.autorizado()) {

				$rootScope.mostrarModalLogin = true;
				$rootScope.callbackLogin = false;
				return;
			}


			bz.guardarLogo(logo.cargado, "Logo y nombre", logo.icono.idElemento, logo.fuente.idElemento)

				.then(function (res) {

					var indiceLogo = bz.logos.indexOf(logo);

					bz.logos[indiceLogo].idLogo = res;

					$mdToast.show($mdToast.base({
						args: {
							mensaje: "Su logo ha sido guardado con exito!",
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
				});

		};

		bz.completadoGuardar = true;

		bz.guardarLogo = function (logo, tipoLogo, idElemento, idFuentePrincipal) {

			var defered = $q.defer();
			var promise = defered.promise;

			if (bz.completadoGuardar) {

				bz.completadoGuardar = false;

				logosService.guardarLogo(bz.base64.encode(logo), tipoLogo, idElemento, idFuentePrincipal)

					.then(function (res) {
						defered.resolve(res);
					})
					.catch(function (res) {
						defered.reject(res);
					})
					.finally(function () {
						bz.completadoGuardar = true;
					});

			}

			return promise;

		};

		bz.completadoCompartir = true;
		bz.compartirPorEmail = function (email, logo, valido) {

			if (!clientesService.autorizado()) {

				$rootScope.mostrarModalLogin = true;
				$rootScope.callbackLogin = false;
				return;
			}

			if (valido && bz.completadoCompartir) {

				bz.completadoCompartir = false;

				var defered = $q.defer();
				var emailPromise = defered.promise;

				if (!logo.idLogo) {

					bz.guardarLogo(logo.cargado, "Logo y nombre", logo.icono.idElemento, logo.fuente.idElemento)
						.then(function (res) {
							logo.idLogo = res;
							var url = bz.compartirPorEmailUrl();

							logosService.enviarPorEmail(logo.idLogo, email, url)
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
									defered.resolve();
								});

						})
						.catch(function () {
							$mdToast.show($mdToast.base({
								args: {
									mensaje: "Un error ha ocurrido",
									clase: "danger"
								}
							}));
							defered.resolve();
						});

				} else {
					var url = bz.compartirPorEmailUrl();
					logosService.enviarPorEmail(logo.idLogo, email, url)
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
							defered.resolve();
						});


				}


				emailPromise.finally(function () {
					bz.completadoCompartir = true;
				});


			}
		};

		/* Etiquetas */

		bz.selectedItem = null;
		bz.searchText = null;
		bz.etiquetasFunciones = etiquetasService;

		etiquetasService.listarEtiquetas().then(function (res) {
			bz.etiquetas = etiquetasService.loadEtiquetas(res.data);
		}).catch(function () {
			//console.log(res)
		});

	}]);