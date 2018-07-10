var angularDragula = require('angularjs-dragula');

angular.module("disenador-de-logos", [angularDragula(angular), "ngMessages", "ui.router", "ngAnimate", "ngAria", "ngMaterial", "base64", "colorpicker", "720kb.socialshare", "ngFileUpload"])

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
						}, 3000);

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
				url: "/?datos",
				templateUrl: "app/views/inicio.tpl",
				controller: "inicioController as inicio",
				resolve: {
					landingResolve: ["LS", "$stateParams", function (LS, $stateParams) {

						/* Si es un logo compartido por url */
						
						if ($stateParams.datos) {
							return angular.fromJson(decodeURI($stateParams.datos));
						}

						/* Si el cliente viene de la landing */

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
									etiquetasSeleccionadas: datosLanding.etiquetasSeleccionadas,
									preferencias: datosLanding.preferencias
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
				templateUrl: "app/views/editor.tpl",
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

			.state({
				name: "pago",
				url: "/pago/",
				templateUrl: "app/views/pago.tpl",
				controller: "pagoController as pago",
				params: {
					status: null,
					datos: {

						logo: null,
						idCategoria: null,//TODO: revisar
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
					"designerAuth": ["$q", "disenadorService", function ($q, disenadorService) {

						if (disenadorService.autorizado()) {

							return $q.reject("DESIGNER_LOGUT_REQUIRED");

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
				name: "cuenta",
				url: "/cliente/cuenta/",
				templateUrl: "app/views/cuenta.tpl",
				controller: "cuentaController as cuenta",
				resolve: {
					"currentAuth": ["$q", "clientesService", function ($q, clientesService) {

						if (!clientesService.autorizado()) {

							return $q.reject("AUTH_REQUIRED");

						}

					}],
					"designerAuth": ["$q", "disenadorService", function ($q, disenadorService) {

						if (disenadorService.autorizado()) {

							return $q.reject("DESIGNER_LOGUT_REQUIRED");

						}

					}]
				}
			})

			.state({
				name: "logos",
				url: "/cliente/logos/",
				templateUrl: "app/views/logos.tpl",
				controller: "logosController as logos",
				resolve: {
					"currentAuth": ["$q", "clientesService", function ($q, clientesService) {

						if (!clientesService.autorizado()) {

							return $q.reject("AUTH_REQUIRED");

						}

					}],
					"designerAuth": ["$q", "disenadorService", function ($q, disenadorService) {

						if (disenadorService.autorizado()) {

							return $q.reject("DESIGNER_LOGUT_REQUIRED");

						}

					}]
				}
			})

			.state({
				name: "descargar",
				url: "/cliente/logos/descargar/{id:int}/",
				templateUrl: "app/views/descargar.tpl",
				controller: "descargarController as descargar",
				params: {
					id: null

				},
				resolve: {
					"currentAuth": ["$q", "clientesService", function ($q, clientesService) {

						if (!clientesService.autorizado()) {

							return $q.reject("AUTH_REQUIRED");

						}

					}],
					"designerAuth": ["$q", "disenadorService", function ($q, disenadorService) {

						if (disenadorService.autorizado()) {

							return $q.reject("DESIGNER_LOGUT_REQUIRED");

						}

					}],
					"logoResolve": ["$q", "$stateParams", "logosService", function ($q, $stateParams, logosService) {

						if ($stateParams.id) {
							var defered = $q.defer();
							var promise = defered.promise;

							logosService.obtenerPorId($stateParams.id).then(function (res) {
								if (res.estado == "Descargable") {
									defered.resolve({
										logo: res.logo,
										id: $stateParams.id,
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
				url: "/ingreso/?accion",
				templateUrl: "app/views/login.tpl",
				controller: "loginController as login",
				resolve: {
					"currentAuth": ["$q", "clientesService", function ($q, clientesService) {

						if (clientesService.autorizado()) {

							return $q.reject("LOGOUT_REQUIRED");

						}

					}],
					"designerAuth": ["$q", "disenadorService", function ($q, disenadorService) {

						if (disenadorService.autorizado()) {

							return $q.reject("DESIGNER_LOGUT_REQUIRED");

						}

					}]
				}
			})
			/*
			.state({
				name: "logosGaleria",
				url: "/logos-galeria/",
				templateUrl: "app/views/logosGaleria.tpl",
				controller: "logosGaleriaController as logosGaleria"
			})
			*/
			.state({
				name: "papeleria",
				url: "/cliente/logos/papeleria/:id/",
				templateUrl: "app/views/papeleria.tpl",
				controller: "papeleriaController as papeleriaCtrl",
				resolve: {
					"designerAuth": ["$q", "disenadorService", function ($q, disenadorService) {

						if (disenadorService.autorizado()) {

							return $q.reject("DESIGNER_LOGUT_REQUIRED");

						}

					}],
					"logoResolve": ["$q", "$stateParams", "logosService", "arrayToJsonMetasFactory", function ($q, $stateParams, logosService, arrayToJsonMetasFactory) {

						
						if ($stateParams.id) {
							var defered = $q.defer();
							var promise = defered.promise;

							logosService.obtenerPorId($stateParams.id).then(function (res) {
								if (res.estado == "Descargable") {
									defered.resolve({
										logo: res.logo,
										id: $stateParams.id,
										tipo: res.tipoLogo,
										atributos: arrayToJsonMetasFactory(res.atributos)
									});
								} else {
									defered.reject("INVALID_LOGO");
								}

							}).catch(function () {
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
				name: "papeleriaEditor",
				url: "/cliente/logos/papeleria/:id/crear",
				templateUrl: "app/views/papeleriaEditor.tpl",
				controller: "papeleriaEditorController as papeleriaEditor",
				params: {
					papeleria: null
				},
				resolve: {
					"currentAuth": ["$q", "clientesService", function ($q, clientesService) {

						if (!clientesService.autorizado()) {

							return $q.reject("AUTH_REQUIRED");

						}

					}],
					"designerAuth": ["$q", "disenadorService", function ($q, disenadorService) {

						if (disenadorService.autorizado()) {

							return $q.reject("DESIGNER_LOGUT_REQUIRED");

						}

					}],
					"logoResolve": ["$q", "$stateParams", "logosService", "arrayToJsonMetasFactory", function ($q, $stateParams, logosService, arrayToJsonMetasFactory) {
						
						if ($stateParams.id) {
							var defered = $q.defer();
							var promise = defered.promise;

							logosService.obtenerPorId($stateParams.id).then(function (res) {
								if (res.estado == "Descargable") {
									defered.resolve({
										logo: res.logo,
										id: $stateParams.id,
										tipo: res.tipoLogo,
										atributos: arrayToJsonMetasFactory(res.atributos)
									});
								} else {
									defered.reject("INVALID_LOGO");
								}

							}).catch(function () {
								defered.reject("INVALID_LOGO");
							});

							return promise;
						} else {
							return $q.reject("INVALID_LOGO");
						}



					}],
					"papeleriaResolve": ["$q", "$stateParams", function ($q, $stateParams) {

						/* VALIDACION DE PAPELERIA*/

						var papeleria = {};
						
						if ($stateParams.papeleria && $stateParams.papeleria.papeleria && $stateParams.papeleria.modelo) {

							papeleria = $stateParams.papeleria.papeleria;
							papeleria.modelo = $stateParams.papeleria.modelo;
							papeleria.fuentes = $stateParams.papeleria.fuentes; 
							
							if($stateParams.papeleria.pieza){

								papeleria.modelo.esquemas = $stateParams.papeleria.pieza.esquemas;
								angular.forEach($stateParams.papeleria.pieza.caras, function(cara, indiceCara){

									papeleria.modelo.caras[indiceCara].hooks = cara.hooks;
									papeleria.modelo.caras[indiceCara].logos = cara.logos;

								});

								if($stateParams.papeleria.pieza._id){
									papeleria.idPieza = $stateParams.papeleria.pieza._id;
								}
								
							}

							return papeleria;

						} else {

							return $q.reject("PAPELERIA_INVALID");

						}

					}],
					
				}
			});

	
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

		$rootScope.$on("$viewContentLoaded", function () {

			$timeout(function () {
				angular.element(document.querySelector(".overlay.full")).fadeOut(500);
			}, 3000);


		});

		$rootScope.$on("$stateChangeSuccess", function (event, toState, toParams, fromState, fromParams, error) {

			//Servicio para cerrar ayudas

		});

		$rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {

			

			if (error === "AUTH_REQUIRED") {

				switch (toState.name) {

					case "editor":

						switch (fromState.name) {

							default: $state.go("login");
						}

						break;

					case "pago":

						switch (fromState.name) {

							default: $state.go("login");
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

			} else if (error === "PAPELERIA_INVALID") {

				$state.go("papeleria", {
					id: toParams.id
				});

			} else if (error === "INVALID_LOGO") {

				switch (toState.name) {
					default:
						$state.go("logos");

				}

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