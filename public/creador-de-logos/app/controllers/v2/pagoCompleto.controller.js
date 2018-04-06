angular.module("disenador-de-logos")

	.controller("pagoCompletoController", ["arrayToJsonMetasFactory", "$scope", "$state", "logosService", "$stateParams", "$base64", function (arrayToJsonMetasFactory, $scope, $state, logosService, $stateParams, $base64) {

		var bz = this;

		bz.base64 = $base64;

		bz.logo = false;

		bz.calificacionTentativa = 5;

		bz.atributos = {
			padre: null,
			calificacion: null
		};

		bz.padre = null;

		/*MOVER A RESOLVE*/

		logosService.obtenerPorId($stateParams.id).then(function (res) {

			bz.logo = res;

			var atributos = arrayToJsonMetasFactory(bz.logo.atributos);

			if (atributos.padre) {

				bz.atributos.padre = true;
				bz.padre = parseInt(atributos.padre);

				logosService.obtenerPorId(bz.padre).then(function (res) {

					var atributosPadre = arrayToJsonMetasFactory(res.atributos);

					if (atributosPadre["calificacion-cliente"]) {

						bz.atributos.calificacion = true;

					} else {

						bz.atributos.calificacion = false;

					}

				}).catch(function (res) {


				}).finally(function () {

                    
				});

			}

		}).catch(function (res) {


		}).finally(function () {


		});

		/*MOVER A RESOLVE*/

		bz.completado = true;
		bz.calificar = function (calificacion, comentario, valido) {

			if (valido && bz.completado) {
				bz.completado = false;

				// promesa de calificacion
				logosService.calificar(bz.padre, calificacion, comentario).finally(function () {

					bz.completado = true;
					bz.atributos.calificacion = true;

				});

			}
		};


		$scope.$on("sesionExpiro", function (event, data) {

			$state.go("inicio");

		});


	}]);
