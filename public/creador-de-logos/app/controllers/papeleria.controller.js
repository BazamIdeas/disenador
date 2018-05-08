angular.module("disenador-de-logos")
	.controller("papeleriaController", ["$base64", "$scope", "$stateParams", "$sce", "logoResolve", "$state", "papeleriaService", "$document", function ($base64, $scope, $stateParams, $sce, logoResolve, $state, papeleriaService, $document) {

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
			delete modelo.piezas;
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

		bz.descargarPieza = function(id){
			angular.element(document.querySelector(".overlay.full")).fadeIn(1000);
			papeleriaService.piezas.descargar(id).then(function(res){
				console.log(res)
				var a = $document[0].createElement("a");
				$document[0].body.appendChild(a);
				a.style = "display:none";
				var url = res.url;
				a.href = url;
				a.download = res.nombreArchivo;
				a.target = "_blank";
				a.click();
				a.remove();
			}).finally(function(){
				angular.element(document.querySelector(".overlay.full")).fadeOut(1000);
			})
		}
	}]);