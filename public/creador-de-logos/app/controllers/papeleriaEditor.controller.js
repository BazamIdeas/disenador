angular.module("disenador-de-logos")
	.controller("papeleriaEditorController", ["papeleriaResolve", "logoResolve", "$base64", "$scope", "elementosService", "fontService", "papeleriaService", "$document", "$state", "$sce", function (papeleriaResolve, logoResolve, $base64, $scope, elementosService, fontService, papeleriaService, $document, $state, $sce) {

		var bz = this;

		bz.base64 = $base64;

		bz.sce = $sce;

		bz.logo = logoResolve;

		bz.papeleria = papeleriaResolve;
		bz.fuentes = papeleriaResolve.fuentes;
		bz.caraSeleccionada = bz.papeleria.modelo.caras[0];
		bz.esquemaActivo = 'original';

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

		if (bz.papeleria.idPieza) {
			bz.datos.pieza._id = bz.papeleria.idPieza;
		}

		bz.volver = function () {
			if(bz.peticion) return;
			$state.go('papeleria', {
				id: bz.logo.id
			})
		}

		bz.descargarPieza = function (id) {
			bz.selectorfuentes = false;
			bz.preticionB =true;

			if (bz.datos.pieza._id != undefined &&  bz.datos.pieza._id.length != 0) {
				descargar(bz.datos.pieza._id);
			} else {
				bz.guardar().then(function () {
					descargar(bz.datos.pieza._id);
				});
			}

			function descargar(id){
				angular.element(document.querySelector(".overlay.full")).fadeIn(1000);
				papeleriaService.piezas.descargar(id, bz.logo.id).then(function(res){
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
					bz.peticion = false;
					bz.preticionB =false;
				})
			}
		}

	}]);