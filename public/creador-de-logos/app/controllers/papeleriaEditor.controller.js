angular.module("disenador-de-logos")
	.controller("papeleriaEditorController", ["papeleriaResolve", "logoResolve", "$base64", "$scope", "elementosService", "fontService", function (papeleriaResolve, logoResolve, $base64, $scope, elementosService, fontService) {

		var bz = this;

		bz.base64 = $base64;

		bz.logo = logoResolve;

		elementosService.listarFuentes().then(function(res){
			fontService.agregarGeneral(bz.fuentes);
			bz.fuentes = res;			
		});
		
		bz.papeleria = papeleriaResolve;		

	}]);