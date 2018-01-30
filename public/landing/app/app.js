angular.module("landing", ["ngMessages", "ui.router", "ngAnimate", "ngAria", "ngMaterial", "ui.carousel", "base64"])

	.config(function ($stateProvider, $urlRouterProvider) {

		/*------------------------ Ui router states ----------------------*/

		$stateProvider.state({
			name: "comienzo",
			url: "",
			templateUrl: "/landing/app/views/comienzo.tpl",
			controller: "comienzoController as comienzo",
			params: {
				datos: null
			}
		})
          
          
			.state({
				name: "disenadores",
				url: "/disenadores",
				templateUrl: "/landing/app/views/disenadores.html",
				controller: "dienadoresController as dienadores",
				params: {
					datos: null
				}
			});

		$urlRouterProvider.otherwise("");

	});