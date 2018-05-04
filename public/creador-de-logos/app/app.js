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
					"papeleriaResolve" : ["$q", function($q){

						/* VALIDACION DE PAPELERIA VALIDA*/

						var papeleria = {
							tipo: {},
							modelo: {},
							pieza: {}
						};

						papeleria.tipo = {
							id: "XXX",
							nombre: "tarjeta",
							meta: [
								"nombre", 
								"cargo", 
								"direccion", 
								"correo", 
								"telefono",
								"web"
							]
						}

						papeleria.modelo = {
							_id: "XXXXX",
							nombre: "Modelo1",
							svg: [`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 241.94 156.91">
							<style>.blanco, .blanco *{
								fill: white !important;
								stroke: white !important;
							}</style>
							<title>Asset 2</title>
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
									<rect x="104.31" y="44.17" width="56.69" height="56.69" style="fill:transparent" class="logo"/>
								</g>
							</g>
						</svg>`, 
						`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 241.94 156.91">
						<title>Asset 3</title>
						<g id="Layer_2" data-name="Layer 2">
							<g id="Layer_1-2" data-name="Layer 1">
								<rect x="0.5" y="0.5" width="240.94" height="155.91" style="fill:#fff;stroke:#b6b7b7;stroke-miterlimit:10"/>
								<rect x="152.47" y="36.06" width="72.67" height="20.25" style="fill:#fafafa"/>
								<rect x="152.47" y="36.06" width="72.67" height="20.25" style="fill:#fff"/>
								<rect x="152.14" y="56.23" width="72.67" height="20.25" style="fill:#fafafa"/>
								<rect x="152.14" y="56.23" width="72.67" height="20.25" style="fill:#fff"/>
								<rect x="152.14" y="75.04" width="72.67" height="20.25" style="fill:#fafafa"/>
								<rect x="152.14" y="75.04" width="72.67" height="20.25" style="fill:#fff"/>
								<rect x="152.47" y="95.9" width="72.67" height="20.25" style="fill:#fafafa"/>
								<rect x="152.47" y="95.9" width="72.67" height="20.25" style="fill:#fff"/>
								<path id="_Path_" data-name="&lt;Path&gt;" d="M210.44,114.59h0a8.76,8.76,0,0,1-8.76-8.76h0a8.76,8.76,0,0,1,8.76-8.76h0a8.76,8.76,0,0,1,8.76,8.76h0A8.76,8.76,0,0,1,210.44,114.59Z" class="color-primario"/>
								<path id="_Path_2" data-name="&lt;Path&gt;" d="M210.1,74.42h0a8.76,8.76,0,0,1-8.76-8.76h0a8.76,8.76,0,0,1,8.76-8.76h0a8.76,8.76,0,0,1,8.76,8.76h0A8.76,8.76,0,0,1,210.1,74.42Z" style="fill:#003a76" class="color-primario"/>
								<path id="_Path_3" data-name="&lt;Path&gt;" d="M210.1,93.92h0a8.76,8.76,0,0,1-8.76-8.76h0a8.76,8.76,0,0,1,8.76-8.76h0a8.76,8.76,0,0,1,8.76,8.76h0A8.76,8.76,0,0,1,210.1,93.92Z" style="fill:#0075ad" class="color-secundario"/>
								<path id="_Path_4" data-name="&lt;Path&gt;" d="M210.1,54.92h0a8.76,8.76,0,0,1-8.76-8.76h0a8.76,8.76,0,0,1,8.76-8.76h0a8.76,8.76,0,0,1,8.76,8.76h0A8.76,8.76,0,0,1,210.1,54.92Z" style="fill:#009fe3" class="color-secundario"/>
								<g id="_Group_" data-name="&lt;Group&gt;">
									<path id="_Compound_Path_" data-name="&lt;Compound Path&gt;" d="M214.91,87.57a1.19,1.19,0,0,1-.15.58l-3-3.4,3-2.63a1.19,1.19,0,0,1,.19.64Zm-4.81-2.2,4.18-3.66a1.18,1.18,0,0,0-.57-.15H206.5a1.18,1.18,0,0,0-.57.15Zm1.17-.22-1,.85a.3.3,0,0,1-.4,0l-1-.85-3.08,3.44a1.19,1.19,0,0,0,.63.18h7.21a1.19,1.19,0,0,0,.63-.18Zm-5.79-3a1.19,1.19,0,0,0-.19.64v4.81a1.19,1.19,0,0,0,.15.58l3-3.4Zm0,0" style="fill:#fff"/>
								</g>
								<g id="_Group_2" data-name="&lt;Group&gt;">
									<path id="_Compound_Path_2" data-name="&lt;Compound Path&gt;" d="M210.44,101.22a3.19,3.19,0,0,0-3.18,3.18,8.81,8.81,0,0,0,1.38,3.52c.66,1.18,1.3,2.16,1.33,2.2l.47.72.47-.72s.67-1,1.33-2.2a8.81,8.81,0,0,0,1.38-3.52,3.19,3.19,0,0,0-3.18-3.18Zm0,4.81a1.65,1.65,0,1,1,1.65-1.65,1.65,1.65,0,0,1-1.65,1.65Zm0,0" style="fill:#fff"/>
								</g>
								<path id="_Compound_Path_3" data-name="&lt;Compound Path&gt;" d="M214.91,48.94a.47.47,0,0,1-.14.41l-1.36,1.35a.76.76,0,0,1-.24.17,1,1,0,0,1-.29.09h-.19a4.69,4.69,0,0,1-.63-.07,4.75,4.75,0,0,1-1.06-.33,8.91,8.91,0,0,1-1.42-.78,10.59,10.59,0,0,1-1.69-1.43A11.17,11.17,0,0,1,206.71,47a9.59,9.59,0,0,1-.75-1.19,6.4,6.4,0,0,1-.43-1,5.26,5.26,0,0,1-.19-.76,2.53,2.53,0,0,1,0-.5q0-.18,0-.2a1,1,0,0,1,.09-.29.76.76,0,0,1,.17-.24l1.36-1.36a.45.45,0,0,1,.33-.14.38.38,0,0,1,.23.08.71.71,0,0,1,.17.19l1.09,2.07a.5.5,0,0,1,.05.36.63.63,0,0,1-.17.33l-.5.5a.17.17,0,0,0,0,.07.25.25,0,0,0,0,.08,1.84,1.84,0,0,0,.18.49,4.5,4.5,0,0,0,.38.6,6.61,6.61,0,0,0,.72.81,6.73,6.73,0,0,0,.82.73,4.72,4.72,0,0,0,.6.38,1.59,1.59,0,0,0,.37.15l.13,0,.07,0,.07,0,.58-.59a.62.62,0,0,1,.43-.16.53.53,0,0,1,.27.06h0l2,1.16a.51.51,0,0,1,.25.34Zm0,0" style="fill:#fff"/>
								<g id="_Group_3" data-name="&lt;Group&gt;">
									<path id="_Compound_Path_4" data-name="&lt;Compound Path&gt;" d="M210.1,60.85a4.81,4.81,0,1,0,4.81,4.81,4.83,4.83,0,0,0-4.81-4.81Zm3.32,2.89H212a7.5,7.5,0,0,0-.67-1.73,3.86,3.86,0,0,1,2.07,1.73Zm-3.32-1.92a6.44,6.44,0,0,1,.91,1.92h-1.83a7,7,0,0,1,.91-1.92Zm-3.7,4.81a3.31,3.31,0,0,1,0-1.93H208a6.56,6.56,0,0,0,0,1c0,.34,0,.62,0,1Zm.38,1h1.4a7.49,7.49,0,0,0,.67,1.73,3.86,3.86,0,0,1-2.07-1.73Zm1.4-3.85h-1.4A4,4,0,0,1,208.85,62a7.49,7.49,0,0,0-.67,1.73Zm1.92,5.77a6.44,6.44,0,0,1-.91-1.92H211a7,7,0,0,1-.91,1.92Zm1.11-2.88H209a4.87,4.87,0,0,1,0-1.93h2.26a6.73,6.73,0,0,1,.09,1,6.54,6.54,0,0,1-.14,1Zm.14,2.69a6.76,6.76,0,0,0,.67-1.73h1.4a3.86,3.86,0,0,1-2.07,1.73Zm.87-2.69a6.33,6.33,0,0,0,0-1c0-.34,0-.62,0-1h1.63a3.26,3.26,0,0,1,0,1.93Zm0,0" style="fill:#fff"/>
								</g>
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
								<rect x="11.36" y="109.46" width="28.35" height="28.35" style="fill:transparent" class="logo blanco"/>
								<text transform="translate(58.68 31.45)" style="font-size:14px;fill:#1d1d1b;" class="nombre">
									NOMBRE
								</text>
								<text xmlns="http://www.w3.org/2000/svg" transform="translate(58.68 43.01)" style="font-size:11.062707901000977px;fill:#1d1d1b;" class="cargo">Cargo</text>
							direccion: "Av. Alguna",
								<text transform="translate(190 48.97)" class="telefono" text-anchor="end" style="font-size:9px;fill:#1d1d1b;font-family:HelveticaNeueMedium, HelveticaNeue">123456789</text>
								<text transform="translate(190 68.97)" class="web" text-anchor="end" style="font-size:9px;fill:#1d1d1b;font-family:HelveticaNeueMedium, HelveticaNeue">web</text>
								<text transform="translate(190 87.44)"  class="correo" text-anchor="end" style="font-size:9px;fill:#1d1d1b;font-family:HelveticaNeueMedium, HelveticaNeue">correo</text>
								<text transform="translate(190 108.41)" class="direccion"  text-anchor="end" style="font-size:9px;fill:#1d1d1b;font-family:HelveticaNeueMedium, HelveticaNeue">direccion</text>
							</g>
						</g>
					</svg>`],
							fuentes: ["CarterOne"],
						};
						 
						papeleria.pieza = {
							nombre: "XAVIER",
							cargo: "Dev",
							direccion: "Av. Alguna",
							correo: "xaria13@gmail.COM",
							web: "www.liderlogo.com",
							telefono: "666"
						};

						return papeleria;

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

								// $state.go("logos");
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