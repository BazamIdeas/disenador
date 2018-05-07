angular.module("disenador-de-logos")

	.controller("loginController", ["$state", "$rootScope", function ($state, $rootScope) {
		
		$rootScope.callbackLogin = function () {
			$state.go('logos');
		};

	}]);