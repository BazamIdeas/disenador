angular.module("disenador-de-logos", ["ngMessages", "ui.router", "ngAnimate", "ngAria", "ngMaterial", "base64", "colorpicker", "jQueryScrollbar", "720kb.socialshare", "ngFileUpload"])

	.config(function ($stateProvider, $httpProvider, $urlRouterProvider, $locationProvider, $mdToastProvider) {

		$locationProvider.html5Mode(true);

		/* INTERCEPTADOR */
		$httpProvider.interceptors.push("AuthInterceptor");

		$mdToastProvider.addPreset("base", {
			options: function () {
				return {
					templateUrl: "toast-base.html",
					hideDelay: 0,
					position: "top right",
					controller: ["$scope", "$mdToast", "$timeout", "args", function ($scope, $mdToast, $timeout, args) {

						if (args) {

							$scope.mensaje = args.mensaje;

							$scope.clase = args.clase;
						}

						var temporizador = $timeout(function () {
							$mdToast.hide();
						}, 2000);

						$scope.closeToast = function () {
							$timeout.cancel(temporizador);
							$mdToast.hide();

						};
					}],
					clickOutsideToClose: true
				};
			}
		});


		/*------------------------ Ui router states ----------------------*/


		$stateProvider

			.state({
				name: "inicio",
				url: "/",
				templateUrl: "app/views/v2/inicio.tpl",
				controller: "inicioController as inicio",
				resolve: {
					landingResolve: ["LS", function (LS) {

						var datosLanding = LS.obtener("comenzar");

						if (datosLanding) {

							return {
								datos: {
									nombre: datosLanding.nombre,
									categoria: {
										icono: datosLanding.idCategoria,
										fuente: datosLanding.idFuente
									},
									tags: datosLanding.etiquetasParaBusqueda,
									etiquetasSeleccionadas: datosLanding.etiquetasSeleccionadas				
								},
								palettesCopy: datosLanding.palettesCopy,
								iconos: datosLanding.iconos,
								fuentes: datosLanding.fuentes
							};
						}

						return false;
					}]
				}
			})
			.state({
				name: "editor",
				url: "/editor/",
				templateUrl: "app/views/v2/editor.tpl",
				controller: "editorController as editor",
				params: {
					status: null,
					datos: {
						logo: null,
						texto: null,
						fuentes: null,
						idLogoGuardado: null
					}
				},
				resolve: {
					/*currentAuth: ["$q", "clientesService", function ($q, clientesService) {

						if (!clientesService.autorizado()) {

							return $q.reject("AUTH_REQUIRED");

						}

					}],*/
					historicoResolve: ["$q", "$stateParams", "LS", function ($q, $stateParams, LS) {

						var defered = $q.defer();

						var promise = defered.promise;

						if ($stateParams.status) {

							LS.definir("editor", $stateParams.datos);

							defered.resolve($stateParams.datos);

						} else if (LS.obtener("editor")) {

							defered.resolve(LS.obtener("editor"));

						} else {

							defered.reject({
								error: "FALLO_HISTORICO"
							});
						}

						return promise;

					}]

				}
			})

			/* 
			.state({
				name: "planes",
				url: "/planes/",
				templateUrl: "app/views/v2/planes.tpl",
				controller: "planesController as planes",
				params: {
					status: null,
					datos: {
						logo: null,
						idElemento: null,
						tipo: null,
						fuentes: null
					}
				},
				resolve: {
					currentAuth: ["$q", "clientesService", function ($q, clientesService) {

						if (!clientesService.autorizado()) {

							return $q.reject("AUTH_REQUIRED");

						}

					}],
					historicoResolve: ["$q", "$stateParams", "LS", function ($q, $stateParams, LS) {

						var defered = $q.defer();

						var promise = defered.promise;

						if ($stateParams.status) {

							LS.definir("planes", $stateParams.datos);

							defered.resolve($stateParams.datos);

						} else if (LS.obtener("planes")) {

							defered.resolve(LS.obtener("planes"));

						} else {

							defered.reject({
								error: "FALLO_HISTORICO"
							});
						}

						return promise;

					}]
				}
			})
*/
			.state({
				name: "pago",
				url: "/pago/",
				templateUrl: "app/views/v2/pago.tpl",
				controller: "pagoController as pago",
				params: {
					status: null,
					datos: {

						logo: null,
						idElemento: null,
						tipo: null,
						plan: {
							nombre: null,
							idPlan: null
						},
						precio: {
							moneda: {
								simbolo: null,
								idMoneda: null
							},
							monto: null,
							idPrecio: null
						}

					}
				},
				resolve: {
					currentAuth: ["$q", "clientesService", function ($q, clientesService) {

						if (!clientesService.autorizado()) {

							return $q.reject("AUTH_REQUIRED");

						}

					}],
					historicoResolve: ["$q", "$stateParams", function ($q, $stateParams) {

						var defered = $q.defer();

						var promise = defered.promise;

						if ($stateParams.status) {

							defered.resolve($stateParams.datos);
						} else {

							defered.reject({
								error: "FALLO_HISTORICO"
							});
						}

						return promise;

					}]
				}
			})

			.state({
				name: "pagoCompleto",
				url: "/pago/completo/:id/",
				templateUrl: "app/views/v2/pagoCompleto.tpl",
				controller: "pagoCompletoController as pagoCompleto",
				resolve: {
					currentAuth: ["$q", "clientesService", function ($q, clientesService) {

						if (!clientesService.autorizado()) {

							return $q.reject("AUTH_REQUIRED");

						}

					}]
				}
			})

			.state({
				name: "cuenta",
				url: "/cliente/cuenta/",
				templateUrl: "app/views/v2/cuenta.tpl",
				controller: "cuentaController as cuenta",
				resolve: {
					currentAuth: ["$q", "clientesService", function ($q, clientesService) {

						if (!clientesService.autorizado()) {

							return $q.reject("AUTH_REQUIRED");

						}

					}]
				}
			})

			.state({
				name: "logos",
				url: "/cliente/logos/",
				templateUrl: "app/views/v2/logos.tpl",
				controller: "logosController as logos",
				resolve: {
					currentAuth: ["$q", "clientesService", function ($q, clientesService) {

						if (!clientesService.autorizado()) {

							return $q.reject("AUTH_REQUIRED");

						}

					}]
				}
			})

			.state({
				name: "descargar",
				url: "/cliente/logos/descargar/{id:int}/",
				templateUrl: "app/views/v2/descargar.tpl",
				controller: "descargarController as descargar",
				params: {
					id: null
					
				},
				resolve: {
					currentAuth: ["$q", "clientesService", function ($q, clientesService) {

						if (!clientesService.autorizado()) {

							return $q.reject("AUTH_REQUIRED");

						}

					}],
					logoResolve: ["$q", "$stateParams", "logosService", function ($q, $stateParams, logosService) {

						if ($stateParams.id) {
							var defered = $q.defer();
							var promise = defered.promise;

							logosService.obtenerPorId($stateParams.id).then(function (res) {
								if (res.estado == "Descargable") {
									defered.resolve({
										logo: res.logo,
										id: $stateParams.id,
										idElemento: res.elementos_idElemento,
										tipo: res.tipoLogo
									});
								} else {
									defered.reject("INVALID_LOGO");
								}

							}).catch(function () {

								// $state.go("logos");
								defered.reject("INVALID_LOGO");
							});

							return promise;
						} else {
							return $q.reject("INVALID_LOGO");
						}



					}]
				}
			})

			.state({
				name: "login",
				url: "/ingreso/",
				templateUrl: "app/views/v2/login.tpl",
				controller: "loginController as login",
				resolve: {
					"currentAuth": ["$q", "clientesService", function ($q, clientesService) {

						if (clientesService.autorizado()) {

							return $q.reject("LOGOUT_REQUIRED");

						}

					}]
				}
			})

			.state({
				name: "logosGaleria",
				url: "/logos-galeria/",
				templateUrl: "app/views/v2/logosGaleria.tpl",
				controller: "logosGaleriaController as logosGaleria"
			});

		/*

		$urlRouterProvider.when("/", ["$location", "$httpParamSerializer", function($location, $httpParamSerializer) {
            
			return $httpParamSerializer($location.search()) ?  "/comenzar/?" + $httpParamSerializer($location.search()) : "/comenzar/";
		}]);
		*/
		$urlRouterProvider.rule(function ($injector, $location) {
			var path = $location.url();

			if ("/" === path[path.length - 1] || path.indexOf("/?") > -1) {
				return;
			}

			if (path.indexOf("?") > -1) {
				return path.replace("?", "/?");
			}

			return path + "/";
		});

		$urlRouterProvider.otherwise("/404/");

	})


	.run(function ($rootScope, $state, $timeout) {

		$rootScope.$on("$viewContentLoaded", function (event) {

			$timeout(function () {

				angular.element(document.querySelector(".full-overlay")).fadeOut(1000);
			}, 500);


		});

		$rootScope.$on("$stateChangeSuccess", function (event, toState, toParams, fromState, fromParams, error) {

			//Servicio para cerrar ayudas

		});

		$rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {

			if (error === "AUTH_REQUIRED") {

				switch (toState.name) {

				case "editor":

					switch (fromState.name) {

					default:
						$state.go("login");
					}

					break;

				case "pago":

					switch (fromState.name) {

					default:
						$state.go("login");
					}

					break;


				case "pagoCompleto":
					switch (fromState.name) {

					case "":
						$state.go("login");
						break;

					default:
						$state.go("login");
					}

					break;

				case "cuenta":
					switch (fromState.name) {

					case "":
						$state.go("login");
						break;

					default:
						$state.go("login");
					}

					break;

				case "logos":
					switch (fromState.name) {

					case "":
						$state.go("login");
						break;

					default:
						$state.go("login");
					}

					break;

				case "descargar":
					switch (fromState.name) {

					case "":
						$state.go("login");
						break;

					default:
						$state.go("login");
					}

					break;
				
				default:
					$state.go("inicio");


				}


			} else if (error === "LOGOUT_REQUIRED") {

				$state.go("cuenta");

			} else if (error.error === "FALLO_HISTORICO") {


				switch (toState.name) {

				case "editor":

					$state.go("inicio");
					break;

				case "pago":

					$state.go("inicio");
					break;

				default: 
					$state.go("inicio")

				}

				


			}
			console.log(error);

		});
	});