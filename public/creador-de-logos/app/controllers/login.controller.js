angular.module("disenador-de-logos")

	.controller("loginController", ["$state", "$rootScope", function ($state, $rootScope) {

			// $rootScope.mostrarModalLogin = true;
			// $rootScope.mostrarCerrarPop = true;
			$rootScope.callbackLogin = function(){
				$state.go('logos');
			};

	}]);