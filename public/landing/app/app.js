angular.module("landing", ["ngMessages", "ngAnimate", "ngAria", "ngMaterial", "base64"])
	.config(function ( /*  $urlRouterProvider, $locationProvider, */ $mdToastProvider , $interpolateProvider) {

		$interpolateProvider.startSymbol('${');
		$interpolateProvider.endSymbol('}$');


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
		
	}); 