angular.module("disenador-de-logos")

	.controller("descargarController", ["logoResolve", "logosService", "$state", "$scope", "$base64", "$filter", "planesService", "pedidosService", "$window", "$document", function (logoResolve, logosService, $state, $scope, $base64, $filter, planesService, pedidosService, $window, $document) {

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

									if (precio.moneda == 'USD') {
										bz.moneda = {
											idMoneda: precio.idMoneda,
											simbolo: precio.moneda
										}
										bz.mps = true;
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



		bz.aumentarPlan = function (plan) {

			bz.peticion = true;

			var datos = {
				idLogo: bz.logo.id,
				idPrecio: null,
				idPasarela: null
			};

			angular.forEach(plan.precios, function (valor) {
				if (valor.moneda == bz.moneda.simbolo) {
					datos.idPrecio = valor.idPrecio;
				}
			})

			pedidosService.listarPasarelas(bz.moneda.idMoneda).then(function (res) {

				angular.forEach(res, function (valor) {
					if (valor.pasarela == 'Paypal') {
						datos.idPasarela = valor.idPasarela;
					}
				})

				planesService.aumentarPedidoPlan(datos).then(function (res) {
					$window.location = res;
				}).catch(function () {
					//console.log(res)
				}).finally(function () {
					bz.peticion = false;
				});


			});


		};

		bz.completado = true;
		bz.descargar = function (nombre, ancho) {

			if (bz.completado) {

				bz.completado = false;

				angular.element(document.querySelector(".full-overlay")).fadeIn(1000);

				logosService.descargarLogo(bz.logo.id, ancho, $filter("uppercase")(nombre), nombre)

					.then(function (res) {

						//get the headers' content disposition
						var cd = res.headers["content-disposition"];
					
						//get the file name with regex
						var regex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
						var match = regex.exec(cd);
					
						//is there a fiel name?
						var fileName = match[1] || "LogoPro.zip";
					
						//replace leading and trailing slashes that C# added to your file name
						fileName = fileName.replace(/\"/g, "");
						//determine the content type from the header or default to octect stream
						var contentType = res.headers["content-type"];
					
						//finally, download it
						var blob = new Blob([res.data], {type: contentType});
				
						//downloading the file depends on the browser
						//IE handles it differently than chrome/webkit
						if ($window.navigator && $window.navigator.msSaveOrOpenBlob) {
							$window.navigator.msSaveOrOpenBlob(blob, fileName);
						} else {
							var a = $document[0].createElement("a");
							$document[0].body.appendChild(a);
							a.style = "display:none";
							var url = $window.URL.createObjectURL(blob);
							a.href = url;
							a.download = fileName;
							a.target = "_blank";
							a.click();
							$window.URL.revokeObjectURL(url);
							a.remove();
						}

					})

					.finally(function () {

						bz.completado = true;
						angular.element(document.querySelector(".full-overlay")).fadeOut(1000);

					});

			}

		};

		bz.descargarTodo = function () {

			if (bz.completado) {

				bz.completado = false;

				angular.element(document.querySelector(".full-overlay")).fadeIn(1000);

				var formatos = {};
				var formatosCopia = angular.copy(bz.formatos);
				
				formatosCopia.push(bz.formatosNoSociales[1]);

				angular.forEach(formatosCopia, function (formato, indice){
					formatos[formato.nombre] = formato.ancho;
				});
				
				logosService.descargarTodo(bz.logo.id, formatos)

					.then(function (res) {

						//get the headers' content disposition
						var cd = res.headers["content-disposition"];
					
						//get the file name with regex
						var regex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
						var match = regex.exec(cd);
					
						//is there a fiel name?
						var fileName = match[1] || "LogoPro.zip";
					
						//replace leading and trailing slashes that C# added to your file name
						fileName = fileName.replace(/\"/g, "");
						//determine the content type from the header or default to octect stream
						var contentType = res.headers["content-type"];
					
						//finally, download it
						var blob = new Blob([res.data], {type: contentType});
				
						//downloading the file depends on the browser
						//IE handles it differently than chrome/webkit
						if ($window.navigator && $window.navigator.msSaveOrOpenBlob) {
							$window.navigator.msSaveOrOpenBlob(blob, fileName);
						} else {
							var a = $document[0].createElement("a");
							$document[0].body.appendChild(a);
							a.style = "display:none";
							var url = $window.URL.createObjectURL(blob);
							a.href = url;
							a.download = fileName;
							a.target = "_blank";
							a.click();
							$window.URL.revokeObjectURL(url);
							a.remove();
						}

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
				bz.esperaManual = false;
				angular.element(document.querySelector(".full-overlay")).fadeOut(1000);
			});

		};

		$scope.$on("sesionExpiro", function () {

			$state.go("inicio");

		});


	}]);