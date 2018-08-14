angular.module("disenador-de-logos")
	.directive("bazamAyudas", [function () {
		return {
			templateUrl: "app/templates/bazamAyudas.tpl",
			scope: {
				estado: "="
			},
			controller: ["$scope", "$window", function ($scope, $window) {

				$scope.textos = $window.traducciones.general.app_editor.secciones.planes;

				$scope.temas = [{
					title: "Editor de logos",
					preguntas: [{
						title: "¿Como crear un logo?",
						description: "Lorem ipsum, dolor sit amet consectetur  adipisicing elit. Provident ut minus vero voluptatem odio  illum, magni ullam nulla deserunt pariatur nemo vel autem  incidunt et? Quisquam soluta blanditiis dolorem quo!"
					}, {
						title: "¿Como ser millonario?",
						description: "Lorem ipsum, dolor sit amet consectetur  adipisicing elit. Provident ut minus vero voluptatem odio  illum, magni ullam nulla deserunt pariatur nemo vel autem  incidunt et? Quisquam soluta blanditiis dolorem quo!"
					}, {
						title: "¿Como ser bueno y malo?",
						description: "Lorem ipsum, dolor sit amet consectetur  adipisicing elit. Provident ut minus vero voluptatem odio  illum, magni ullam nulla deserunt pariatur nemo vel autem  incidunt et? Quisquam soluta blanditiis dolorem quo!"
					}]
				},
				{
					title: "Pagos",
					preguntas: [{
						title: "¿Como pagar con creditcard?",
						description: "Lorem ipsum, dolor sit amet consectetur  adipisicing elit. Provident ut minus vero voluptatem odio  illum, magni ullam nulla deserunt pariatur nemo vel autem  incidunt et? Quisquam soluta blanditiis dolorem quo!"
					}, {
						title: "¿Como pagar con paypal?",
						description: "Lorem ipsum, dolor sit amet consectetur  adipisicing elit. Provident ut minus vero voluptatem odio  illum, magni ullam nulla deserunt pariatur nemo vel autem  incidunt et? Quisquam soluta blanditiis dolorem quo!"
					}, {
						title: "¿Como hacer un renmbolso?",
						description: "Lorem ipsum, dolor sit amet consectetur  adipisicing elit. Provident ut minus vero voluptatem odio  illum, magni ullam nulla deserunt pariatur nemo vel autem  incidunt et? Quisquam soluta blanditiis dolorem quo!"
					}]
				}];

			}],
			controllerAs: "ctrl",
		};
	}]);