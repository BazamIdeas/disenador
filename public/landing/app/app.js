angular.module("landing", ["ngMessages", "ui.router", "ngAnimate", "ngAria", "ngMaterial", "ui.carousel", "base64"])

	.config(function ($stateProvider, $urlRouterProvider, $locationProvider, $mdToastProvider) {

		$locationProvider.html5Mode(true);


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

		$stateProvider.state({
				name: "comienzo",
				url: "/",
				templateUrl: "/landing/app/views/comienzo.tpl",
				controller: "comienzoController as ctrl"
			}).state({
				name: "no-encontrado",
				url: "/404/",
				templateUrl: "/landing/app/views/404.tpl"
			})
			.state({
				name: "terminos",
				url: "/terminos-y-condiciones/",
				templateUrl: "/landing/app/views/terminos.tpl"
			})
			.state({
				name: "legales",
				url: "/avisos-legales/",
				templateUrl: "/landing/app/views/legales.tpl"
			})
			.state({
				name: "disenadores",
				url: "/disenadores/",
				templateUrl: "/landing/app/views/disenadores.tpl",
				controller: "disenadoresController as disenadores"
			})
			.state({
				name: "disenador",
				url: "/disenador/:id/",
				templateUrl: "/landing/app/views/disenador.tpl",
				controller: "disenadorController as disenador",
				resolve: {

					"clienteResolve": ["$stateParams", "$q", "clientesService", function ($stateParams, $q, clientesService) {

						var defered = $q.defer();

						var promise = defered.promise;

						if (!$stateParams.id) {
							return $q.reject("NO_ID_SUPPLIED");

						} else {

							clientesService.datos($stateParams.id)

								.then(function (res) {
									defered.resolve(res);
								})
								.catch(function () {
									defered.reject();
								});


						}

						return promise;
					}]
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

	});