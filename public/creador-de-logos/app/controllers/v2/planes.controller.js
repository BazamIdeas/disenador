angular.module("disenador-de-logos")

    /* Editor */

    .controller('planesController', ["historicoResolve", "pedidosService", "$scope", "$state", "$base64", function (historicoResolve, pedidosService, $scope, $state, $base64) {

        var bz = this;

        bz.base64 = $base64;


        bz.logo = historicoResolve.logo;


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

            angular.forEach(res.planes, function (plan, indicePlan) {

                bz.planes = res.planes;

                angular.forEach(plan.precios, function (precio, indicePrecio) {

                    if (!bz.monedas[precio.moneda]) {

                        bz.monedas[precio.moneda] = {
                            simbolo: precio.moneda,
                            idMoneda: precio.idMoneda
                        };

                    }

                })

            })

            bz.moneda = bz.monedaDefault;

        });



        bz.comprobarMonedas = function (plan) {

            var coincidencia = false;

            angular.forEach(plan.precios, function (valor, llave) {


                if (valor.moneda == bz.moneda.simbolo) {

                    coincidencia = true;
                }


            })


            return coincidencia;

        }

        bz.precioSeleccionado = function (precios, moneda) {

            var precioFinal = "";

            angular.forEach(precios, function (valor, llave) {

                if (valor.moneda == bz.moneda.simbolo) {

                    precioFinal = valor.moneda + " " + valor.precio;
                }

            })

            return precioFinal;

        }


        bz.avanzarCheckout = function (plan, moneda) {

            angular.forEach(plan.precios, function (precio, llave) {

                if (precio.moneda == bz.moneda.simbolo) {

                    $state.go('pago', {
                        status: true,
                        datos: {

                            logo: historicoResolve.logo,
                            idElemento: null,
                            tipo: 'Logo y nombre',
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
                            impuesto: bz.impuesto

                        }
                    });

                }

            })


        }


        $scope.$on('sesionExpiro', function (event, data) {

            $state.go('principal.comenzar');

        });


    }])
