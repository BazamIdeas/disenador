angular.module("disenador-de-logos")

	.controller("descargarController", ["logoResolve", "logosService", "$state", "$scope", "$base64", "$filter", "planesService", function (logoResolve, logosService, $state, $scope, $base64, $filter, planesService) {

		var bz = this;

		bz.base64 = $base64;

		bz.formatosNoSociales = [{
				nombre: "editable",
				ancho: 400
			},
			{
				nombre: "papeleria",
				ancho: 300
			}
		];

		bz.formatos = [{
				nombre: "facebook",
				ancho: 180
			},
			{
				nombre: "whatsapp",
				ancho: 300
			},
			{
				nombre: "instagram",
				ancho: 110
			},
			{
				nombre: "google-plus",
				ancho: 250
			},
			{
				nombre: "youtube",
				ancho: 200
			},
			{
				nombre: "twitter",
				ancho: 400
			},
			{
				nombre: "linkedin",
				ancho: 400
			},
			{
				nombre: "pinterest",
				ancho: 60
			},
			{
				nombre: "telegram",
				ancho: 300
			},
			{
				nombre: "vimeo",
				ancho: 300
			},
		];

		//bz.formatoSeleccionado = bz.formatos[0];

		bz.logo = logoResolve;

		bz.plan = {};
		bz.planes = {};
		bz.monedas = {};
		bz.moneda = {};

		bz.mostrarAumento = false;

		planesService.porLogo(bz.logo.id)
			.then(function (res) {
				bz.plan = res.caracteristicas;

				bz.idPlan = res.idPlan;

				bz.monedaDefault = res.monedaDefault;

				planesService.aumentarPlan(bz.idPlan)
					.then(function (res) {
						if (res.planes.superiores.length) {
							bz.mostrarAumento = true;
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

						}
					})
					.catch(function () {

					})
					.finally(function () {

					});

				if (bz.plan && bz.plan.png.valor == "1") {
					bz.formatoSeleccionado = bz.formatos[0];
				} else if (bz.plan && (bz.plan.editable.valor == "1" || (bz.plan.png.valor == "0" && bz.plan.editable.valor == "0"))) {
					bz.formatoSeleccionado = bz.formatosNoSociales[0];
				}
			})
			.catch(function () {

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




		bz.dispararDescarga = logosService.dispararDescarga;

		bz.completado = true;
		bz.descargar = function (nombre, ancho) {

			if (bz.completado) {

				bz.completado = false;

				angular.element(document.querySelector(".full-overlay")).fadeIn(1000);

				logosService.descargarLogo(bz.logo.id, ancho, $filter("uppercase")(nombre), nombre)

					.then(function (res) {
						var url = "";
						if (res.zip) {

							url = res.zip.replace("public", "");

						} else if (res.png) {

							url = res.png.replace("public", "");

						}

						bz.dispararDescarga(url, nombre, ancho);

					})

					.finally(function () {

						bz.completado = true;
						angular.element(document.querySelector(".full-overlay")).fadeOut(1000);

					});

			}

		};


		bz.manualMarca = function (id) {
			bz.esperaManual = true;
			angular.element(document.querySelector(".full-overlay")).fadeIn(1000);

			logosService.manualMarca(id).then(function (res) {
				var pdf = document.createElement('a');
				pdf.setAttribute('href', res.url);
				pdf.setAttribute('download', res.nombreArchivo);
				simulateClick(pdf);
			}).finally(function () {
				bz.esperaManual = false;
				angular.element(document.querySelector(".full-overlay")).fadeOut(1000);
			});

		};

		function simulateClick(control) {
			if (document.all) {
				control.click();
			} else {
				var evObj = document.createEvent("MouseEvents");
				evObj.initMouseEvent("click", true, true, window, 1, 12, 345, 7, 220, false, false, true, false, 0, null);
				control.dispatchEvent(evObj);
			}
		}

		$scope.$on("sesionExpiro", function () {

			$state.go("principal.comenzar");

		});


	}]);