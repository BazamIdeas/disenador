angular.module("disenador-de-logos")
	.controller("papeleriaEditorController", ["papeleriaResolve", "logoResolve", "$base64", function(papeleriaResolve, logoResolve, $base64){
        
		var bz = this;

		bz.base64 = $base64;

		bz.papeleria = papeleriaResolve;
		bz.logo = logoResolve;
		

	}]);