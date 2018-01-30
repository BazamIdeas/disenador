angular.module("administrador")

	.controller("disenadoresController", ["$state", "$mdSidenav", "$mdDialog", "$scope", "administrarService", "paisesValue", "monedasValue", "notificacionService", "monedasService", "$base64", "designerService", function ($state, $mdSidenav, $mdMenu, $scope, administrarService, paisesValue, monedasValue, notificacionService, monedasService, $base64, designerService) {

		var bz = this;

		/* DATOS */

		bz.logos = [];
		bz.disenadores = [];
		bz.vista = 0;
		bz.monedas = monedasValue;
		bz.paises = paisesValue;
		bz.monedasDisponibles = {};

		/***************************/
		/**********LOGOS***********/
		/***************************/

		bz.listarLogos = function () {
			designerService.listarLogos().then(function (res) {
				bz.logos = res;
				bz.listaL = !bz.listaL;
			}).catch(function () {
				notificacionService.mensaje("No existen logos por aprobar!");
				bz.listaL = false;
				bz.listarDisenadores();
			});
		};

		bz.listarLogos();

		bz.aprobarLogo = function (i, id) {
			bz.cal = !bz.cal;
			bz.element = i;

			designerService.aprobarLogo(id).then(function () {
				notificacionService.mensaje("Aprobado!");
				bz.logos[i].estado = "Aprobado";
			}).catch(function (res) {
				notificacionService.mensaje(res);
			});
		};

		bz.borrarLogo = function (i, id, op) {
			designerService.borrarLogo(id).then(function () {
				notificacionService.mensaje("No Aprobado!");
				if(op){
					bz.modfire = false;
					bz.logosDisenador.splice(i, 1);
					angular.forEach(bz.logos, function (valor, llave) {
						if (valor.idLogo == id) {
							return bz.logos.splice(llave, 1);
						}
					});

				}
				bz.logos.splice(i, 1);
				bz.listaL = !bz.listaL;
				angular.forEach(bz.logosDisenador, function (valor, llave) {
					if (valor.idLogo == id) {
						return bz.logos.splice(llave, 1);
					}
				});
				
			}).catch(function (res) {
				notificacionService.mensaje(res);
			});
		};

		bz.ponerCalificacion = function (datos) {
			designerService.calificarLogo(datos).then(function () {

				bz.cal2 = false;
				bz.cal = !bz.cal;
				notificacionService.mensaje("Calificacion Colocada!");
			}).catch(function (res) {
				notificacionService.mensaje(res);
			});
		};

		bz.verLogo = function (logo, v) {
			bz.logoVisualizar = bz.base64(logo);
			bz.lda = v ? true : false;
			bz.modfire = false;
			bz.modInit = false;
			bz.vista = 3;
		};

		bz.mostrarPop = function () {
			bz.vista = bz.lda ? 1 : 0;
		};

		/***************************/
		/********DISEÑADORES********/
		/***************************/

		bz.listarDisenadores = function () {
			bz.listaD = !bz.listaD;
			designerService.listarDisenadores().then(function (res) {
				bz.disenadores = res;
			}).catch(function (res) {
				notificacionService.mensaje(res);
			});
		};

		bz.bloquearDisenador = function (id) {
			designerService.bloquearDisenador(id).then(function () {
				notificacionService.mensaje("Usuario Bloqueado!");
			}).catch(function (res) {
				notificacionService.mensaje(res);
			});
		};

		bz.notificarDisenador = function (idC, idF) {

			var datos = {
				idCliente: idC,
				fecha: formatDate(new Date()),
				monto: 0,
				idFacturacion: idF
			};

			angular.forEach(bz.disenadores, function (valor) {
				if (valor.idCliente == idC) {
					datos.monto = valor.deuda.deuda;
				}
			});

			designerService.notificarPago(datos).then(function () {
				notificacionService.mensaje("Usuario Notificado!");
				angular.forEach(bz.disenadores, function (valor) {
					if (valor.idCliente == idC) {
						valor.deuda.deuda = 0;
					}
				});
			}).catch(function (res) {
				notificacionService.mensaje(res);
			});
		};


		bz.mostrar = function (opcion, index, id) {
			if (opcion == "logos-designer") {
				bz.modfire = index;

				designerService.logosDisenador(id).then(function (res) {
					bz.logosDisenador = res;
					bz.vista = 1;
				}).catch(function (res) {
					notificacionService.mensaje(res);
				});

			} else if (opcion == "historial") {
				bz.vista = 2;
				designerService.historialDisenador(id).then(function (res) {
					bz.historialPagos = res;
				}).catch(function (res) {
					notificacionService.mensaje(res);
				});

			} else if (opcion == "calificacion-aprobados") {
				bz.cal2 = !bz.cal2;
				bz.modfire = index;
			}
		};

		/* UTILIDADES */

		bz.modFun = function (i) {
			bz.modfire = i;
			bz.modInit = !bz.modInit;
		};

		bz.base64 = function (icono) {

			return $base64.decode(icono);

		};

		function formatDate(date) {
			var d = new Date(date),
				month = "" + (d.getMonth() + 1),
				day = "" + d.getDate(),
				year = d.getFullYear();

			if (month.length < 2) month = "0" + month;
			if (day.length < 2) day = "0" + day;

			return [year, month, day].join("-");
		}

	}]);