angular.module("disenador-de-logos")
	.controller("papeleriaController", ["$base64", "$scope", "$stateParams", "$sce", "logoResolve", "$state", "papeleriaService", "$document", "elementosService", "fontService", "planesService", "pedidosService", function ($base64, $scope, $stateParams, $sce, logoResolve, $state, papeleriaService, $document, elementosService, fontService, planesService, pedidosService) {

		var bz = this;

		bz.base64 = $base64;
		bz.sce = $sce;
		bz.tienePiezas = false;
		bz.peticion = true;
		bz.idLogo = logoResolve.id;
		bz.planBajo = false;
		bz.plan = {};
		bz.planes = {};
		bz.monedas = {};
		bz.moneda = {};

		/* PLANES */

		planesService.porLogo(bz.idLogo).then(function (res) {
			bz.plan = res.caracteristicas;

			if(bz.plan.papeleria) bz.planBajo = true;

			bz.idPlan = res.idPlan;

			planesService.aumentarPlan(res.idPlan).then(function (res) {
				if (res.planes.superiores.length) {

					bz.moneda = {
						simbolo: res.monedaDefault.codigo,
						idMoneda: res.monedaDefault.idMoneda
					};

					bz.planes = res.planes.superiores;

					angular.forEach(res.planes.superiores, function (plan) {

						angular.forEach(plan.precios, function (precio) {

							if (!bz.monedas[precio.moneda]) {

								bz.monedas[precio.moneda] = {
									simbolo: precio.moneda,
									idMoneda: precio.idMoneda
								};

							}

						});

					});

					bz.mps = true; //mostrar Planes superiores = mps

					pedidosService.listarPasarelas(bz.moneda.idMoneda).then(function (res) {
						bz.pasarelas = res;
					});

				}
			})
		});

		bz.comprobarMonedas = function (plan) {

			var coincidencia = false;

			angular.forEach(plan.precios, function (valor) {

				if (valor.moneda == bz.moneda.simbolo) {

					coincidencia = true;
				}

			});

			return coincidencia;

		};

		bz.precioSeleccionado = function (precios) {

			var precioFinal = "";

			angular.forEach(precios, function (valor) {

				if (valor.moneda == bz.moneda.simbolo) {

					precioFinal = valor.moneda + " " + valor.precio;
				}

			});

			return precioFinal;

		};

		bz.seleccionar = function (formato) {

			bz.formatoSeleccionado = angular.copy(formato);

		};

		bz.paypal = function (idPaypal, plan) {

			if (bz.peticion) {
				return;
			}

			var datos = {
				idLogo: bz.logo.id,
				idPrecio: null,
				idPasarela: idPaypal
			};

			bz.peticion = true;

			angular.forEach(plan.precios, function (valor) {
				if (valor.moneda == bz.moneda.simbolo) {
					datos.idPrecio = valor.idPrecio;
				}
			});

			planesService.aumentarPedidoPlan(datos).then(function (res) {
				$window.location = res;
			}).catch(function () {
				//console.log(res)
			}).finally(function () {
				bz.peticion = false;
			});

		};

		bz.mostrarStripe = function (idStripe, plan) {

			var idPrecio;

			angular.forEach(plan.precios, function (valor) {
				if (valor.moneda == bz.moneda.simbolo) {
					idPrecio = valor.idPrecio;
				}
			});

			bz.datosStripe = {
				idStripe: idStripe,
				idPrecio: idPrecio,
				idLogo: bz.idLogo
			};


		};

		/* PAPELERIA */

		papeleriaService.listarPorClienteYlogo(bz.idLogo).then(function (res) {
			bz.papelerias = res;
			angular.forEach(bz.papelerias, function (papeleria, indicePapeleria) {
				papeleria.piezas = [];
				angular.forEach(papeleria.modelos, function (modelo, indiceModelo) {
					if (modelo.piezas) {
						papeleria.tienePiezas = true;
						bz.tienePiezas = true;

						angular.forEach(modelo.piezas, function (pieza) {
							pieza.indicePapeleria = indicePapeleria;
							pieza.indiceModelo = indiceModelo;
							papeleria.piezas.push(pieza);
						})
					}
				})
			})

			if (!bz.tienePiezas) {
				bz.crearPapeleria = true;
			}
			bz.papeleriaActiva = bz.papelerias[0].tipo;
		})

		elementosService.listarFuentes().then(function (res) {
			bz.fuentes = res;
			fontService.agregarGeneral(res);
			bz.peticion = false;
		});

		bz.enviarEditor = function (indicePapeleria, indiceModelo, pieza) {
			if (bz.peticion) return;
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

		bz.descargarPieza = function (id) {
			angular.element(document.querySelector(".overlay.full")).fadeIn(1000);
			papeleriaService.piezas.descargar(id, bz.idLogo).then(function (res) {
				var a = $document[0].createElement("a");
				$document[0].body.appendChild(a);
				a.style = "display:none";
				var url = res.url;
				a.href = url;
				a.download = res.nombreArchivo;
				a.target = "_blank";
				a.click();
				a.remove();
			}).finally(function () {
				angular.element(document.querySelector(".overlay.full")).fadeOut(1000);
			})
		}

		bz.duplicarPieza = function (papeleria, pieza, index) {
			if (bz.peticion) return;
			bz.papeleriaIndexElemento = pieza._id;
			bz.peticion = true;
			var piezaE = angular.copy(pieza);
			delete piezaE._id;

			papeleriaService.piezas.guardar(papeleria.tipo, papeleria.modelos[pieza.indiceModelo].nombre, piezaE).then(function (res) {
				res.insertId.indiceModelo = pieza.indiceModelo;
				res.insertId.indicePapeleria = pieza.indicePapeleria;
				console.log(res.insertId)
				papeleria.piezas.push(res.insertId);
				bz.peticion = false;
			});
		}

		bz.eliminarPieza = function (papeleria, index) {
			if (bz.peticion) return;
			pieza = papeleria.piezas[index];
			bz.papeleriaIndexElemento = pieza._id;
			bz.peticion = true;

			papeleriaService.piezas.eliminar(pieza._id).then(function (res) {
				papeleria.piezas.splice(index, 1);
				bz.peticion = false;
			});
		}
	}]);