angular.module("disenador-de-logos")
	.controller("papeleriaController", ["$base64", "$scope", "$stateParams", "$sce", "logoResolve", "$state", "papeleriaService", "$document", "elementosService", "fontService", function ($base64, $scope, $stateParams, $sce, logoResolve, $state, papeleriaService, $document, elementosService, fontService) {

		var bz = this;

		bz.base64 = $base64;
		bz.sce = $sce;
		bz.tienePiezas = false;
    
		bz.idLogo = logoResolve.id;

		elementosService.listarFuentes().then(function(res){
			bz.fuentes = res;
			fontService.agregarGeneral(res);
		});

		papeleriaService.listarPorClienteYlogo(bz.idLogo).then(function(res){
			bz.papelerias = res;
			angular.forEach(bz.papelerias, function(papeleria){
				angular.forEach(papeleria.modelos, function(modelo){
					if(modelo.piezas){
						papeleria.tienePiezas = true;
						bz.tienePiezas = true;
					}
				})
			})

			if(!bz.tienePiezas){
				bz.crearPapeleria = true;
			}
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

		bz.duplicarPieza = function(tipo, modelo, pieza, index){
			if(bz.peticion) return;
			bz.papeleriaIndexElemento = index;
			bz.peticion = true;

			var piezaE = angular.copy(pieza);

			delete piezaE._id;

			papeleriaService.piezas.guardar(tipo, modelo.nombre, piezaE).then(function(res){
				modelo.piezas.push(res.insertId);
				bz.peticion = false;
			});
		}

		bz.eliminarPieza = function(arr, index){
			if(bz.peticion) return;
			bz.papeleriaIndexElemento = index;
			bz.peticion = true;

			pieza = arr[index];

			papeleriaService.piezas.eliminar(pieza._id).then(function(res){
				arr.splice(index, 1);
				bz.peticion = false;
			});
		}
	}]);