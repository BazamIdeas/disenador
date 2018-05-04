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
				url: "/:datos?",
				templateUrl: "app/views/inicio.tpl",
				controller: "inicioController as inicio",
				resolve: {
					landingResolve: ["LS", "$stateParams", function (LS, $stateParams) {

						/* Si es un logo compartido por url */

						if ($stateParams && $stateParams.datos != '' && $stateParams.datos != undefined) {
							return JSON.parse(decodeURI($stateParams.datos));
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
				templateUrl: "app/views/planes.tpl",
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
				templateUrl: "app/views/pago.tpl",
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
				templateUrl: "app/views/pagoCompleto.tpl",
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
				templateUrl: "app/views/cuenta.tpl",
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
				templateUrl: "app/views/logos.tpl",
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
				templateUrl: "app/views/descargar.tpl",
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
				templateUrl: "app/views/login.tpl",
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
				templateUrl: "app/views/logosGaleria.tpl",
				controller: "logosGaleriaController as logosGaleria"
			})

			.state({
				name: "papeleria",
				url: "/cliente/logos/papeleria/:id",
				templateUrl: "app/views/papeleria.tpl",
				controller: "papeleriaController as papeleriaCtrl"
			})

			.state({
				name: "papeleriaEditor",
				url: "/cliente/logos/papeleria/:id/crear",
				templateUrl: "app/views/papeleriaEditor.tpl",
				controller: "papeleriaEditorController as papeleriaEditor",
				resolve: {
					"currentAuth": ["$q", "clientesService", function ($q, clientesService) {

						if (!clientesService.autorizado()) {

							return $q.reject("AUTH_REQUIRED");

						}

					}],
					"papeleriaResolve" : ["$q", "$stateParams", function($q, $stateParams){

						var defered = $q.defer();
						var promise = defered.promise;
						
						/* VALIDACION DE PAPELERIA*/

						var papeleria = {};

						/////////TODO:
						papeleria = {
							tipo: "tarjeta", //tarjeta, carta, sobre
							items: [
								//items permitidos para esta papeleria
								{
									nombre: "nombre",
									tipo: "text",
									tag: "text",
									icono: ""
								},
								{
									nombre: "cargo",
									tipo: "text",
									tag: "text",
									icono: ""
								},
								{
									nombre: "direccion",
									tipo: "textarea",
									tag: "text",
									icono: ""
								},
								{
									nombre: "email",
									tipo: "email",
									tag: "text",
									icono: ""
								},
								{
									nombre: "telefono",
									tipo: "tel",
									tag: "text",
									icono: ""
								},
								{
									nombre: "web",
									tipo: "text",
									tag: "text",
									icono: ""
								}
							]
						}

						papeleria.modelo = {
							nombre: "modelo #1",
							iconos: [{
								orientacion: "right",
								svg: `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="45"></circle></svg>`,
								clases: ["color-secundario"]
							}, {
								orientacion: "right",
								svg: `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="45"></circle></svg>`,
								clases: ["color-secundario"]
							}, {
								orientacion: "right",
								svg: `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="45"></circle></svg>`,
								clases: ["color-secundario"]
							}],
							caras: [{
									nombre: 'delantera',
									svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 241.94 156.91">
											<g id="Layer_2" data-name="Layer 2">
												<g id="Layer_1-2" data-name="Layer 1">
													<rect x="0.5" y="0.5" width="240.94" height="155.91" style="fill:#fff;stroke:#b6b7b7;stroke-miterlimit:10"/>
													<path id="_Path_" data-name="&lt;Path&gt;" d="M.5,156.41H53.66a99.07,99.07,0,0,0,5-31.77,105.3,105.3,0,0,0-2.78-21.78C44.64,89.74,33.73,76.59,29.4,62.06c-4-13.43-2-27.23,3.93-40.44-.18-2.78-.24-5.58-.14-8.39A66.3,66.3,0,0,1,34.87.5H.5" style="fill:#162259" class="color-primario"/>
													<g id="_Group_" data-name="&lt;Group&gt;" class="color-secundario">
														<path d="M45.25,69.08C39.77,53.78,34.38,37.95,33.33,21.62c-5.91,13.22-7.93,27-3.93,40.44,4.32,14.53,15.24,27.67,26.49,40.79C53.28,91.35,49.2,80.13,45.25,69.08Z"/>
													</g>
													<g id="_Group_2" data-name="&lt;Group&gt;" class="color-secundario">
														<path d="M89.07,156.41a92.72,92.72,0,0,0-12.31-27.27c-5.91-9-13.47-17.64-20.87-26.28a105.29,105.29,0,0,1,2.78,21.78,99.07,99.07,0,0,1-5,31.77Z"/>
													</g>
													<g id="_Group_3" data-name="&lt;Group&gt;" class="color-secundario">
														<path d="M34.87.5a66.3,66.3,0,0,0-1.68,12.73c-.09,2.81,0,5.61.14,8.39A103.94,103.94,0,0,1,46.27.5Z"/>
													</g>
													<!--<rect x="104.31" y="44.17" width="56.69" height="56.69" style="fill:transparent" class="logo"/>-->
												</g>
											</g>
										</svg>`,
									// Contenedores que puede tener
									hooks: [],
									logos: [{
										clases: [],
										caracteristicas: {
											x: "95",
											y: "40",
											width: "70",
											height: "70"
										}
									}]
								},
								{
									nombre: "frontal",
									svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 241.94 156.91">
										<g id="Layer_2" data-name="Layer 2">
											<g id="Layer_1-2" data-name="Layer 1">
												<rect x="0.5" y="0.5" width="240.94" height="155.91" style="fill:#5a5a5a;stroke:#b6b7b7;stroke-miterlimit:10"/>
												
												<path id="_Path_5" data-name="&lt;Path&gt;" d="M.5,156.41H53.66a99.07,99.07,0,0,0,5-31.77,105.3,105.3,0,0,0-2.78-21.78C44.64,89.74,33.73,76.59,29.4,62.06c-4-13.43-2-27.23,3.93-40.44-.18-2.78-.24-5.58-.14-8.39A66.3,66.3,0,0,1,34.87.5H.5" style="fill:#162259" class="color-primario"/>
												<g id="_Group_4" data-name="&lt;Group&gt;" class="color-secundario">
													<path d="M45.25,69.08C39.77,53.78,34.38,37.95,33.33,21.62c-5.91,13.22-7.93,27-3.93,40.44,4.32,14.53,15.24,27.67,26.49,40.79C53.28,91.35,49.2,80.13,45.25,69.08Z"/>
												</g>
												<g id="_Group_5" data-name="&lt;Group&gt;"  class="color-secundario">
													<path d="M89.07,156.41a92.72,92.72,0,0,0-12.31-27.27c-5.91-9-13.47-17.64-20.87-26.28a105.29,105.29,0,0,1,2.78,21.78,99.07,99.07,0,0,1-5,31.77Z" />
												</g>
												<g id="_Group_6" data-name="&lt;Group&gt;"  class="color-secundario">
													<path d="M34.87.5a66.3,66.3,0,0,0-1.68,12.73c-.09,2.81,0,5.61.14,8.39A103.94,103.94,0,0,1,46.27.5Z" />
												</g>
												
											</g>
										</g>
									</svg>`,
									// Contenedores que puede tener
									hooks: [{
											id: "A",
											caracteristicas: {
												"x": "50",
												"y": "10",
												"width": "80",
												"height": "30"
											},
											items: [{
													tipo: "text",
													tag: "text", //"text", "g", etc.
													valor: "Nombre",
													nombre: "nombre",
													icono: null,
													caracteristicas: {
														//"fill": "white"
													}
												}
											], //items
											limite: 1, //limite de items
											tamanoTexto: "10px",
											orientacion: "left",
											fuente: {
												nombre: "BalooPaaji",
												url: "/fuentes/BalooPaaji-Regular.ttf",
												fill: "#0080c0"
											}
										},
										{
											id: "B",
											caracteristicas: {
												"x": "105",
												"y": "40",
												"width": "120",
												"height": "70"
											},
											items: [{
													tipo: "text",
													tag: "text", //"text", "g", etc.
													valor: "+549336451810",
													nombre: "telefono",
													icono: {
														orientacion: "right",
														svg: `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="45"></circle></svg>`,
														clases: ["color-secundario"]
													},
													caracteristicas: {
														//"fill": "white"
													}
												},
												{
													tipo: "text",
													tag: "text", //"text", "g", etc.
													valor: "www.logo.pro",
													nombre: "web",
													icono: {
														orientacion: "right",
														svg: `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="45"></circle></svg>`,
														clases: ["color-primario"]
													},
													caracteristicas: {
														//"fill": "white"
													}
												},
												{
													tipo: "text",
													tag: "text", //"text", "g", etc.
													valor: "xarias13@gmail.com",
													nombre: "email",
													icono: {
														orientacion: "right",
														svg: `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="45"></circle></svg>`,
														clases: ["color-primario"]
													},
													caracteristicas: {
														//"fill": "white"
													}
												},
												{
													tipo: "textarea",
													tag: "text", //"text", "g", etc.
													valor: ["Av alguna,", "San Nicolas de los arroyos,", "Buenos Aires"],
													nombre: "direccion",
													icono: {
														orientacion: "right",
														svg: `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="45"></circle></svg>`,
														clases: ["color-primario"]
													},
													caracteristicas: {
														//"fill": "white"
													}
												}
			
											], //items
											limite: 4, //limite de items
											orientacion: "right",
											tamanoTexto: "7px",
											fuente: {
												url: "/fuentes/Chewy-Regular.ttf",
												nombre: "Chevy",
												fill: "#0080c0"
											}
										}
									],
									logos: [{
										clases: ["total-blanco"],
										caracteristicas: {
											x: "11.36",
											y: "109.46",
											width: "28.35",
											height: "28.35"
										}
									}]
								},
							],
							itemsDefaults: {
								nombre: {
									valor: "Nombre Def",
									icono: null,
									caracteristicas: {
										//"fill": "#1d1d1b"
									}
								},
								web: {
									valor: "www.algo.com",
									icono: {
										orientacion: "right",
										svg: `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="45"></circle></svg>`,
										clases: ["color-primario"]
									},
									caracteristicas: {
										//"fill": "#1d1d1b"
									}
								},
								email: {
									valor: "algo@gmail.com",
									icono: {
										orientacion: "right",
										svg: `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="45"></circle></svg>`,
										clases: ["color-primario"]
									},
									caracteristicas: {
										//"fill": "#1d1d1b"
									}
								},
								cargo: {
									valor: "cargo",
									icono: {
										orientacion: "right",
										svg: `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="45"></circle></svg>`,
										clases: ["color-primario"]
									},
									caracteristicas: {
										//"fill": "#1d1d1b"
									}
								},
								direccion: {
									valor: ["av algo", "calle algo", "aaalgo"],
									icono: {
										orientacion: "right",
										svg: `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="45"></circle></svg>`,
										clases: ["color-primario"]
									},
									caracteristicas: {
										//"fill": "#1d1d1b"
									}
								},
								telefono: {
									valor: "32454356",
									icono: {
										orientacion: "right",
										svg: `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="45"></circle></svg>`,
										clases: ["color-primario"]
									},
									caracteristicas: {
										//"fill": "#1d1d1b"
									}
								}
							}
						};

						defered.resolve(papeleria);
					
						return promise;
						//////////TODO:

						if($stateParams.papeleria && $stateParams.papeleria.tipo && $stateParams.papeleria.modelo){

							papeleria = $stateParams.papeleria.tipo;
							papeleria.modelo = $stateParams.papeleria.modelo;

							defered.resolve(papeleria);
							
						} else {

							defered.reject("PAPELERIA_INVALID");

						}
						

						return promise;

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
										idElemento: res.elementos_idElemento,
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