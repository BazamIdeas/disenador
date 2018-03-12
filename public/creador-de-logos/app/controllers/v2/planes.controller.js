angular.module("disenador-de-logos")

	.controller("planesController", ["historicoResolve", "pedidosService", "$scope", "$state", "$base64", function (historicoResolve, pedidosService, $scope, $state, $base64) {

		var bz = this;

		bz.base64 = $base64;

		bz.logo = historicoResolve.logo;
		bz.idElemento = historicoResolve.idElemento;
		bz.fuentes  = {
			principal: historicoResolve.fuentes.principal,
			eslogan: historicoResolve.fuentes.eslogan
		};
        
		bz.colores = historicoResolve.colores;

		bz.monedas = {};
		bz.moneda = {};
		bz.monedaDefault = {};
		bz.planes = [];
		bz.impuesto = 0;

		pedidosService.listarPlanes().then(function (res) {

			bz.monedaDefault = {
				simbolo: res.monedaDefault.codigo,
				idMoneda: res.monedaDefault.idMoneda
			};
            
			bz.impuesto = res.impuesto;
			
			bz.planes = res.planes;

			angular.forEach(res.planes, function (plan) {

				angular.forEach(plan.precios, function (precio) {

					if (!bz.monedas[precio.moneda]) {

						bz.monedas[precio.moneda] = {
							simbolo: precio.moneda,
							idMoneda: precio.idMoneda
						};

					}

				});

			});

			bz.moneda = bz.monedaDefault;

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


		bz.avanzarCheckout = function (plan) {

			angular.forEach(plan.precios, function (precio) {

				if (precio.moneda == bz.moneda.simbolo) {
                    
					var datosPago = {
						status: true,
						datos: {
							logo: historicoResolve.logo,
							idElemento: bz.idElemento,
							tipo: "Logo y nombre",
							plan: {
								nombre: plan.plan,
								idPlan: plan.idPlan
							},
							precio: {
								moneda: {
									simbolo: precio.moneda,
									idMoneda: precio.idMoneda
								},
								monto: precio.precio,
								idPrecio: precio.idPrecio
							}, 
							impuesto: bz.impuesto,
							atributos: {
								principal: bz.fuentes.principal,
								"color-nombre": bz.colores.nombre,
								"color-icono": bz.colores.icono
							}    

						}
					};
                    
                    
					if(historicoResolve.idPadre){
						datosPago.datos.atributos.padre = historicoResolve.idPadre;
					}
                   
					if(bz.fuentes.eslogan){
						datosPago.datos.atributos.eslogan = bz.fuentes.eslogan;
					}
                    
					if(bz.colores.eslogan){
						datosPago.datos.atributos["color-eslogan"] = bz.colores.eslogan;
					}
                    
					$state.go("pago", datosPago);

				}

			});

		};


		$scope.$on("sesionExpiro", function () {

			$state.go("principal.comenzar");

		});

	}]);
