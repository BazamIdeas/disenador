angular.module("disenador-de-logos")
	.controller("papeleriaController", ["$base64", "$scope", "$stateParams", "$sce", "logoResolve", "$state", "papeleriaService", "$document", "elementosService", "fontService", function ($base64, $scope, $stateParams, $sce, logoResolve, $state, papeleriaService, $document, elementosService, fontService) {

		var bz = this;

		bz.base64 = $base64;
		bz.sce = $sce;
		bz.tienePiezas = false;
		bz.peticion = true;
		bz.idLogo = logoResolve.id;

		papeleriaService.listarPorClienteYlogo(bz.idLogo).then(function(res){
			bz.papelerias = res;
			angular.forEach(bz.papelerias, function(papeleria, indicePapeleria){
				papeleria.piezas = [];
				angular.forEach(papeleria.modelos, function(modelo, indiceModelo){
					if(modelo.piezas){
						papeleria.tienePiezas = true;
						bz.tienePiezas = true;

						angular.forEach(modelo.piezas, function(pieza){
							pieza.indicePapeleria = indicePapeleria;
							pieza.indiceModelo = indiceModelo;
							papeleria.piezas.push(pieza);
						})
					}
				})
			})

			if(!bz.tienePiezas){
				bz.crearPapeleria = true;
			}
			bz.papeleriaActiva = bz.papelerias[0].tipo;
		})

		elementosService.listarFuentes().then(function(res){
			bz.fuentes = res;
			fontService.agregarGeneral(res);
			bz.peticion = false;
		});

		bz.enviarEditor = function (indicePapeleria, indiceModelo, pieza) {
			if(bz.peticion) return;
			var papeleria = angular.copy(bz.papelerias[indicePapeleria]);
			delete papeleria.modelos;

			var modelo = angular.copy(bz.papelerias[indicePapeleria].modelos[indiceModelo]);
			delete modelo.piezas;

			bz.datos = {
				papeleria: papeleria,
				modelo: modelo,
				pieza: pieza,
				fuentes: bz.fuentes
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

		bz.duplicarPieza = function(papeleria, pieza, index){
			if(bz.peticion) return;
			bz.papeleriaIndexElemento = pieza._id;
			bz.peticion = true;
			var piezaE = angular.copy(pieza);
			delete piezaE._id;

			papeleriaService.piezas.guardar(papeleria.tipo, papeleria.modelos[pieza.indiceModelo].nombre, piezaE).then(function(res){
				res.insertId.indiceModelo = pieza.indiceModelo;
				res.insertId.indicePapeleria = pieza.indicePapeleria;
				console.log(res.insertId)
				papeleria.piezas.push(res.insertId);
				bz.peticion = false;
			});
		}
		
		bz.eliminarPieza = function(papeleria, index){
			if(bz.peticion) return;
			pieza = papeleria.piezas[index];
			bz.papeleriaIndexElemento = pieza._id;
			bz.peticion = true;

			papeleriaService.piezas.eliminar(pieza._id).then(function(res){
				papeleria.piezas.splice(index, 1);
				bz.peticion = false;
			});
		}
	}]);