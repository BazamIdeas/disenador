angular.module("disenador-de-logos")
    .directive("bazamListarPlanes", [function () {
        return {
            templateUrl: "app/templates/listar-planes.tpl",
            controllerAs: "listarPlanes",
            scope: {
                datos: "=",
                verlogo: "<",
                promocion: "="
            },
            controller: ["pedidosService", "$scope", "$state", "$base64", "$window", "$http", "$mdToast", "facebookService", "logosService", "$filter", "$timeout", "$q", "clientesService", "$rootScope", "$document", function (pedidosService, $scope, $state, $base64, $window, $http, $mdToast, facebookService, logosService, $filter, $timeout, $q, clientesService, $rootScope, $document) {

                var bz = this;

                bz.base64 = $base64;

                bz.estado = $scope.estado;

                bz.promocion = $scope.promocion;

                /* PLANES */

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

                }).catch(function (res) {
                    //console.log(res)
                });

                bz.precioSeleccionado = function (precios) {

                    var precioFinal = "";

                    angular.forEach(precios, function (valor) {

                        if (valor.moneda == bz.moneda.simbolo) {

                            precioFinal = valor.moneda + " " + valor.precio;
                        }

                    });

                    return precioFinal;

                };

                bz.comprobarMonedas = function (plan) {

                    var coincidencia = false;

                    angular.forEach(plan.precios, function (valor) {

                        if (valor.moneda == bz.moneda.simbolo) {

                            coincidencia = true;
                        }

                    });

                    return coincidencia;

                };

                bz.verificarLogin = function (plan) {
                    bz.planElegido = plan;
                    // Verificar si el usuario que esta logueado
                    if (!clientesService.autorizado()) {
                        $rootScope.mostrarModalLogin = true;
                        $rootScope.callbackLogin = bz.avanzarCheckout;
                        return;
                    }

                    bz.avanzarCheckout();
                };


                bz.avanzarCheckout = function () {

                    var plan = bz.planElegido;

                    bz.logo = $scope.datos.logo; //SVG del logo
                    bz.idElemento = $scope.datos.idElemento;
                    bz.fuentes = {
                        principal: $scope.datos.fuentes.principal,
                        eslogan: $scope.datos.fuentes.eslogan
                    };
                    bz.colores = $scope.datos.colores;

                    if (plan === true) {
                        angular.element(document.querySelector(".overlay.full")).fadeIn(1000);
                        bz.peticion = true;
                        var nombre = "gratis";
                        var ancho = 80;

                        bz.compatirFacebook({
                            url: ''
                        }).then(function (res) {

                            if ($scope.datos.idLogo) {
                                logosService.descargarLogo($scope.datos.idLogo, ancho, $filter("uppercase")(nombre), nombre).then(function (res) {

                                    //get the headers' content disposition
                                    var cd = res.headers["content-disposition"];

                                    //get the file name with regex
                                    var regex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                                    var match = regex.exec(cd);

                                    //is there a fiel name?
                                    var fileName = match[1] || "myDefaultFileName.zip";

                                    //replace leading and trailing slashes that C# added to your file name
                                    fileName = fileName.replace(/\"/g, "");
                                    //determine the content type from the header or default to octect stream
                                    var contentType = res.headers["content-type"];

                                    //finally, download it
                                    var blob = new Blob([res.data], {
                                        type: contentType
                                    });

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

                                    bz.desabilitado = true;
                                    bz.promocion = true;
                                    bz.peticion = false;
                                    angular.element(document.querySelector(".overlay.full")).fadeOut(1000);

                                });
                            } else {
                                bz.guardarLogo(bz.logo, "Logo y nombre", $scope.datos.idElemento, $scope.datos.fuentes.principal, true).then(function (res) {

                                    logosService.descargarLogo(res, ancho, $filter("uppercase")(nombre), nombre).then(function (res) {

                                        //get the headers' content disposition
                                        var cd = res.headers["content-disposition"];

                                        //get the file name with regex
                                        var regex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                                        var match = regex.exec(cd);

                                        //is there a fiel name?
                                        var fileName = match[1] || "myDefaultFileName.zip";

                                        //replace leading and trailing slashes that C# added to your file name
                                        fileName = fileName.replace(/\"/g, "");
                                        //determine the content type from the header or default to octect stream
                                        var contentType = res.headers["content-type"];

                                        //finally, download it
                                        var blob = new Blob([res.data], {
                                            type: contentType
                                        });

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

                                        angular.element(document.querySelector(".overlay.full")).fadeOut(1000);

                                    }).catch(function (res) {
                                        console.log(res)
                                        angular.element(document.querySelector(".overlay.full")).fadeOut(1000);
                                    }).finally(function () {


                                        bz.desabilitado = true;
                                        bz.promocion = true;
                                        bz.peticion = false;
                                    });
                                });
                            }


                        }).catch(function (res) {
                            if (res === "exceso") {
                                $mdToast.show($mdToast.base({
                                    args: {
                                        mensaje: "Tiempo excedido, Debes compartir en facebook para obtener tu logo gratis.",
                                        clase: "danger"
                                    }
                                }));

                                angular.element(document.querySelector(".overlay.full")).fadeOut(1000);

                                return;

                            }

                            $mdToast.show($mdToast.base({
                                args: {
                                    mensaje: "Debes compartir en facebook para obtener tu logo gratis.",
                                    clase: "danger"
                                }
                            }));

                            bz.peticion = false;
                            angular.element(document.querySelector(".overlay.full")).fadeOut(1000);


                        }).finally(function () {
                            bz.peticion = false;
                        });


                        return;
                    }

                    angular.forEach(plan.precios, function (precio) {

                        if (precio.moneda == bz.moneda.simbolo) {

                            var datosPago = {
                                status: true,
                                datos: {
                                    logo: $scope.datos.logo,
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


                            if ($scope.datos.idPadre) {
                                datosPago.datos.atributos.padre = $scope.datos.idPadre;
                            }

                            if (bz.fuentes.eslogan) {
                                datosPago.datos.atributos.eslogan = bz.fuentes.eslogan;
                            }

                            if (bz.colores.eslogan) {
                                datosPago.datos.atributos["color-eslogan"] = bz.colores.eslogan;
                            }

                            $state.go("pago", datosPago);

                        }

                    });

                };

                bz.compatirFacebook = function () {
                    var defered = $q.defer();
                    var promise = defered.promise;

                    var promesas = [$timeout(function () {
                        return "exceso";
                    }, 60000), facebookService.compartir()];

                    $q.race(promesas).then(function (res) {
                        if (res === "exceso") {
                            defered.reject("exceso");
                        } else {
                            defered.resolve(res);
                        }
                    }).catch(function () {
                        defered.reject();
                    });
                    return promise;

                };


                bz.guardarLogo = function (logo, tipoLogo, idElemento, idFuentePrincipal) {

                    var defered = $q.defer();
                    var promise = defered.promise;

                    logosService.guardarLogo(bz.base64.encode(logo), tipoLogo, idElemento, idFuentePrincipal)

                        .then(function (res) {
                            defered.resolve(res);
                        })
                        .catch(function (res) {
                            defered.reject(res);
                        })

                    return promise;

                };

            }]
        };
    }])

    .directive("bazamPlanes", [function () {
        return {
            templateUrl: "app/templates/planes.tpl",
            controllerAs: "planes",
            scope: {
                datos: "=",
                estado: "="
            }
        };

    }])

    .directive("bazamPrevisualizarDos", [function () {
        return {
            templateUrl: "app/templates/ver-logo.tpl",
            scope: {
                datos: "=",
                estado: "="
            }
        };
    }]);