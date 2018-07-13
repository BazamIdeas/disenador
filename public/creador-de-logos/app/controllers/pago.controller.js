angular.module("disenador-de-logos")


	.controller("pagoController", ["$scope", "historicoResolve", "pedidosService", "$window", "$state", "$base64", function ($scope, historicoResolve, pedidosService, $window, $state, $base64) {

		var bz = this;

		bz.base64 = $base64;

		bz.pedido = historicoResolve;

		bz.pasarelas = [];

		pedidosService.listarPasarelas(bz.pedido.precio.moneda.idMoneda).then(function (res) {

			bz.pasarelas = res;

			bz.pasarelaElegida = bz.pasarelas[1];

		});

		bz.terminos = true;


		bz.mostrarMetodo = function (indice, terminos) {

			if(!terminos){
				return;
			}

			angular.forEach(bz.pasarelas, function (pasarela, llave) {

				if (pasarela.idPasarela != indice) {

					bz.pasarelas[llave].mostrar = false;

				} else {

					bz.pasarelas[llave].mostrar = true;

				}

			});

		};


		bz.completado = true;

		bz.pagar = function (idPasarela, terminos) {

			if (terminos && bz.completado) {

				bz.completado = false;
				
				angular.element(document.querySelector(".overlay.full")).fadeIn(1000);

				switch (idPasarela) {
					/*TODO: revisar*/
					case 1: //PAYPAL
						pedidosService.pagar.paypal(bz.pedido.idCategoria, bz.pedido.atributos, bz.base64.encode(bz.pedido.logo), bz.pedido.precio.idPrecio, bz.pedido.tipo, idPasarela, bz.pedido.noun)

							.then(function (res) {

								$window.location = res;

							})

							.finally(function () {

								bz.completado = true;

							});
						break;

					case 2: //STRIPE

						break;

					case 3: //PAYU

						break;

					default:
						break;
				}

			}


		};






		$scope.$on("sesionExpiro", function () {

			$state.go("inicio");

		});


	}]);