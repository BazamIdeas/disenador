angular.module("disenador-de-logos")
	.controller("papeleriaEditorController", ["papeleriaResolve", "logoResolve", "$base64", "$scope", "elementosService", "fontService", function (papeleriaResolve, logoResolve, $base64, $scope, elementosService, fontService) {

		var bz = this;

		bz.base64 = $base64;

		bz.logo = logoResolve;

		elementosService.listarFuentes().then(function(res){
			bz.fuentes = res;		
			fontService.agregarGeneral(bz.fuentes);	
		});
		
		bz.papeleria = papeleriaResolve;	
		
		
		bz.datos = {
			tipo: "",
			modelo: "",
			pieza: {
				caras: [],
				nombre: "",
				_id: "", //id de la pieza si esta existia
				logo: 0 //id del logo
			}
		};

		bz.datos.pieza.logo = bz.logo.id;

		if(bz.papeleria.idPieza){
			bz.datos.pieza._id = bz.papeleria.idPieza;
		}
	
	}]);