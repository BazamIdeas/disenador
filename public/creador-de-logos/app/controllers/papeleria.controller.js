angular.module("disenador-de-logos")
	.controller("papeleriaController", ["$base64", "$scope", "$stateParams", "$sce", "logoResolve", "$state", "papeleriaService", function ($base64, $scope, $stateParams, $sce, logoResolve, $state, papeleriaService) {

		var bz = this;

		bz.base64 = $base64;
		bz.sce = $sce;
    
		bz.idLogo = logoResolve.id;

		papeleriaService.listarPorCliente().then(function(res){
			bz.papelerias = res;
			bz.papeleriaActiva = bz.papelerias[0].tipo;
		})

		bz.enviarEditor = function (indicePapeleria, indiceModelo, indicePieza) {

			var papeleria = angular.copy(bz.papelerias[indicePapeleria]);
			delete papeleria.modelos;

			var modelo = angular.copy(bz.papelerias[indicePapeleria].modelos[indiceModelo]);

			var pieza = angular.copy(bz.papelerias[indicePapeleria].modelos[indiceModelo].piezas[indicePieza]);

			bz.datos = {
				papeleria: papeleria,
				modelo: modelo,
				pieza: pieza
			};

			$state.go('papeleriaEditor', {
				id: bz.idLogo,
				papeleria: bz.datos
			});
		}
	}]);