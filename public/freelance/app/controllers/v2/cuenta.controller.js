angular.module("disenador-de-logos")

	.controller("cuentaController", ["$scope", "$state", "pedidosService", "clientesService", "$mdToast", "paisesValue", "verificarBase64Factory", function ($scope, $state, pedidosService, clientesService, $mdToast, paisesValue, verificarBase64Factory) {

		var bz = this;

		bz.formulario = 1;

		bz.paises = paisesValue;
        
		bz.verificarBase64 = verificarBase64Factory;

		//bz.pedidos = [];
		bz.facturacion = [];
		bz.datos = {};
		bz.datosEspejo = {};
		bz.datosMetodo = {};

		clientesService.datos(true).then(function (res) {

			if (res.facturacion) {
				bz.facturacion = angular.copy(res.facturacion);
				delete res.facturacion;
			}

			bz.datos = res;
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


		bz.completadoMetodo = true;

		bz.guardarFacturacion = function (datos, valido) {

			if (valido && bz.completadoMetodo) {

				bz.completadoMetodo = false;

				clientesService.nuevaFacturacion(datos.nombre, datos.email).then(function (res) {

					var facturacion = {
						correo: datos.email,
						idFacturacion: res.insertId,
						medio: datos.nombre
					};

					bz.facturacion.push(facturacion);

					$mdToast.show($mdToast.base({
						args: {
							mensaje: "¡Método agregado!",
							clase: "success"
						}
					}));



				}).catch(function () {

					$mdToast.show($mdToast.base({
						args: {
							mensaje: "Un error ha ocurrido",
							clase: "danger"
						}
					}));

				}).finally(function () {

					bz.completadoMetodo = true;

				});

			}

		};


		bz.completadoBorrar = true;
		bz.eliminarFacturacion = function (idMetodo) {

			if (bz.completadoBorrar) {

				bz.completadoBorrar = false;

				clientesService.eliminarFacturacion(idMetodo).then(function () {

					angular.forEach(bz.facturacion, function (valor, indice) {

						if (valor.idFacturacion == idMetodo) {

							bz.facturacion.splice(indice, 1);

						}
					});

					$mdToast.show($mdToast.base({
						args: {
							mensaje: "¡Método eliminado!",
							clase: "success"
						}
					}));

				}).catch(function () {

					$mdToast.show($mdToast.base({
						args: {
							mensaje: "Un error ha ocurrido",
							clase: "danger"
						}
					}));

				}).finally(function () {

					bz.completadoBorrar = true;

				});

			}

		};
        
		bz.fotoCargaCompletada = true;
		bz.cargarFoto = function(imagen){
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
