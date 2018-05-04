angular.module("disenador-de-logos")
	.controller("papeleriaController", ["$base64", "$scope", "$stateParams", "$sce", function ($base64, $scope, $stateParams, $sce) {

		var bz = this;

		bz.base64 = $base64;
		bz.sce = $sce;

       
		//bz.papeleriaActiva = bz.papelerias[0].tipo;



	}]);