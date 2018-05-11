angular.module("disenador-de-logos")
	.controller("papeleriaController", ["$base64", "$scope", "$stateParams", "$sce", "logoResolve", "$state", "papeleriaService", "$document", function ($base64, $scope, $stateParams, $sce, logoResolve, $state, papeleriaService, $document) {

		var bz = this;

		bz.base64 = $base64;
		bz.sce = $sce;
    
		bz.idLogo = logoResolve.id;

		papeleriaService.listarPorClienteYlogo(bz.idLogo).then(function(res){
			bz.papelerias = res;
			angular.forEach(bz.papelerias, function(papeleria){
				angular.forEach(papeleria.modelos, function(modelo){
					if(modelo.piezas){
						papeleria.tienePiezas = true;
					}
				})
			})
			bz.papeleriaActiva = bz.papelerias[0].tipo;
		})

		bz.enviarEditor = function (indicePapeleria, indiceModelo, indicePieza) {
			if(bz.peticion) return;
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
			papeleriaService.piezas.descargar(id, bz.idLogo).then(function(res){
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

		bz.duplicarPieza = function(tipo, modelo, pieza){
			if(bz.peticion) return;
			bz.peticion = true;

			piezaNueva = angular.copy(pieza);
			delete piezaNueva._id;
			piezaNueva.logo = bz.idLogo;
			modelo.piezas.push(piezaNueva);
			indice = modelo.piezas.indexOf(piezaNueva);

			papeleriaService.piezas.guardar(tipo, modelo.nombre, piezaNueva).then(function(res){
				modelo.piezas[indice]._id = res.insertId._id;
				bz.peticion = false;
			});
		}

		bz.eliminarPieza = function(arr, pieza, index){
			if(bz.peticion) return;
			bz.peticion = true;
			papeleriaService.piezas.eliminar(pieza._id).then(function(res){
				arr.splice(index, 1);
				bz.peticion = false;
			});;
		}

	}]);