angular.module("disenador-de-logos")

	.controller("cuentaController", ["$scope", "$state", "pedidosService", "clientesService", "$mdToast", "paisesValue", "verificarBase64Factory", function ($scope, $state, pedidosService, clientesService, $mdToast, paisesValue, verificarBase64Factory) {

		var bz = this;

		bz.formulario = 1;

		bz.paises = paisesValue;
        
		bz.verificarBase64 = verificarBase64Factory;

		bz.pedidos = [];
		bz.datos = {};
		bz.datosEspejo = {};

		clientesService.datos().then(function (res) {

			bz.datos = res;

		});

		pedidosService.listarPedidos().then(function (res) {

			angular.forEach(res, function (valor) {

				if (valor.estado != "EN ESPERA") {
					bz.pedidos.push(valor);
				}

			});

		});


		bz.editar = function (datos) {

			bz.datosEspejo = angular.copy(datos);
			bz.formulario = 2;

		};


		bz.completado = true;

		bz.guardar = function (datos, valido) {

			if (valido && bz.completado) {

				bz.completado = false;

				clientesService.modificar(datos.nombreCliente, datos.telefono, datos.pais)

					.then(function () {

						bz.datos = angular.copy(datos);
						bz.formulario = 1;

						$mdToast.show($mdToast.base({
							args: {
								mensaje: "¡Datos modificados!",
								clase: "success"
							}
						}));

					})
					.catch(function () {

						$mdToast.show($mdToast.base({
							args: {
								mensaje: "Un error ha ocurrido",
								clase: "danger"
							}
						}));

					})
					.finally(function () {

						bz.completado = true;

					});

			}

		};
		bz.fotoCargaCompletada = true;
		bz.cargarFoto = function(imagen){
			console.log(imagen)
			if(imagen){
				if(bz.fotoCargaCompletada){
					bz.fotoCargaCompletada = false;
			
					clientesService.avatar(imagen)
						.then(function(res){
							$mdToast.show($mdToast.base({
								args: {
									mensaje: "¡Foto de Perfil Cargada!",
									clase: "success"
								}
							}));
							bz.datos.foto = res;
						})
						.catch(function(){
							$mdToast.show($mdToast.base({
								args: {
									mensaje: "Error al cargar la foto",
									clase: "danger"
								}
							}));

						})
						.finally(function(){

							bz.fotoCargaCompletada = true;
						});
				}
			}
		};




		$scope.$on("sesionExpiro", function () {

			$state.go("principal.comenzar");

		});

	}]);
