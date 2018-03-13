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
			controller: "comienzoController as comienzo"
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
				name: "blog",
				url: "/blog/",
				templateUrl: "/landing/app/views/blog.tpl",
				controller: "blogController as ctrl"
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
    