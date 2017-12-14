angular.module("disenador-de-logos")

    .filter('unique', function () {

        return function (items, filterOn) {

            if (filterOn === false) {
                return items;
            }

            if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
                var hashCheck = {},
                    newItems = [];

                var extractValueToCompare = function (item) {
                    if (angular.isObject(item) && angular.isString(filterOn)) {
                        return item[filterOn];
                    } else {
                        return item;
                    }
                };

                angular.forEach(items, function (item) {
                    var valueToCheck, isDuplicate = false;

                    for (var i = 0; i < newItems.length; i++) {
                        if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
                            isDuplicate = true;
                            break;
                        }
                    }
                    if (!isDuplicate) {
                        newItems.push(item);
                    }

                });
                items = newItems;
            }
            return items;
        };
    })



    /*-------------------------- Services --------------------------*/


    /***************************/
    /*******CATEGORIAS**********/
    /***************************/

    .service('categoriasService', ["$http", "$q", function ($http, $q) {


        this.listaCategorias = function (tipo) {

            var defered = $q.defer();

            var promise = defered.promise;

            $http.post("/app/categorias", {
                tipo: tipo
            }).then(function (res) {

                defered.resolve(res.data);


            }).catch(function (res) {

                defered.reject();

            })

            return promise;


        };


        this.listaCategoriasElementos = function (idCategoria, tipo) {

            var defered = $q.defer();

            var promise = defered.promise;

            $http.post("/app/elementos/categorias", {
                idCategoria: idCategoria,
                tipo: tipo
            }).then(function (res) {

                defered.resolve(res.data);


            }).catch(function (res) {

                defered.reject();

            })

            return promise;

        }


    }])



    /***************************/
    /******PREFERENCIAS*********/
    /***************************/

    .service('preferenciasService', ["$http", "$q", function ($http, $q) {


        this.listaPreferencias = function () {

            var defered = $q.defer();

            var promise = defered.promise;

            $http.get("/app/preferencias").then(function (res) {

                defered.resolve(res.data);


            }).catch(function (res) {

                defered.reject();

            })

            return promise;

        };

    }])


    /***************************/
    /*********ELEMENTOS*********/
    /***************************/



    .service('elementosService', ["$http", function ($http) {

        this.listaSegunPref = function (datos) {

            return $http.post("/app/elementos/busqueda", datos)

                .then(function (res) {

                    return res.data;

                })

                .catch(function (res) {



                })
        }
    }])


    /*********************/
    /********PEDIDOS******/
    /*********************/

    .service("pedidosService", ["$http", "$q", '$rootScope', function ($http, $q, $rootScope) {


        this.listarPlanes = function () {

            var defered = $q.defer();

            var promise = defered.promise;

            $http.get("/app/planes/comprar").then(function (res) {

                defered.resolve(res.data);

            }).catch(function (res) {

                defered.reject(res);

            })


            return promise;

        }

        this.listarPasarelas = function (idMoneda) {

            var defered = $q.defer();

            var promise = defered.promise;

            $http.post("/app/pasarelas/moneda", {
                idMoneda: idMoneda
            }).then(function (res) {

                defered.resolve(res.data);

            }).catch(function (res) {

                defered.reject(res);

            })

            return promise;

        }


        this.pagar = {
            paypal: function (idElemento, logo, idPrecio, tipoLogo, idPasarela) {


                var defered = $q.defer();

                var promise = defered.promise;

                var datos = {
                    idElemento: idElemento,
                    logo: logo,
                    idPrecio: idPrecio,
                    tipoLogo: tipoLogo,
                    idPasarela: idPasarela
                }



                $http.post("/app/pedido", datos).then(function (res) {

                    defered.resolve(res.data);

                }).catch(function (res) {

                    defered.reject(res);

                })


                return promise;

            }
        }

    }])

    /***************************************/
    /***************CLIENTES****************/
    /***************************************/

    .factory("clienteDatosFactory", [function () {


        var cliente = null;


        return {
            obtener: function () {

                return cliente;

            },
            definir: function (objectoCliente) {

                cliente = objectoCliente;


            },
            eliminar: function () {

                cliente = null;

            }
        }

    }])


    .service('clientesService', ['$http', '$q', '$window', '$rootScope', "clienteDatosFactory", function ($http, $q, $window, $rootScope, clienteDatosFactory) {


        this.registrar = function (datos) {

            var defered = $q.defer();

            var promise = defered.promise;

            $http.post("/app/cliente", datos).then(function (res) {

                    defered.resolve(res);

                })
                .catch(function (res) {

                    defered.reject(res);
                })

            return promise;

        }

        this.login = function (datos) {

            var defered = $q.defer();

            var promise = defered.promise;

            $http.post("/app/cliente/login", datos)

                .then(function (res) {

                    $window.localStorage.setItem('bzToken', angular.toJson(res.data));
                    clienteDatosFactory.definir(res.data);
                    defered.resolve();

                })
                .catch(function (res) {
                    $window.localStorage.removeItem('bzToken');
                    defered.reject()
                })


            return promise;

        }

        this.autorizado = function (emitir) {

            if (clienteDatosFactory.obtener()) {

                if (emitir) {
                    $rootScope.$broadcast('sesionInicio', "true");
                }

                return clienteDatosFactory.obtener();

            } else {

                if ($window.localStorage.getItem('bzToken')) {

                    clienteDatosFactory.definir(angular.fromJson($window.localStorage.getItem('bzToken')));

                    if (emitir) {
                        $rootScope.$broadcast('sesionInicio', "true");
                    }

                    return clienteDatosFactory.obtener();

                } else {

                    return false;

                }

            }

        }

        this.salir = function (emitir, desactivarAlerta) {

            $window.localStorage.removeItem('bzToken');
            clienteDatosFactory.eliminar();

            if (emitir) {

                $rootScope.$broadcast("sesionExpiro")

            }

            if (!desactivarAlerta) {
                alert("Alerta Sesion Expiro");
            }
        }


    }])



    /*--------------------------- Factories aislados ------------------*/

    .factory('compararLogosFactory', [function () {

        var logos = {

            comparar: [],
            comprar: ""

        };

        var informacion = {

            definir: function (valor, tipo) {

                if (tipo == "comprar") {

                    logos.comprar = valor;

                } else if (tipo == "comparar")

                {
                    logos.comparar.push(valor)
                }

            },

            obtener: function (tipo) {

                if (tipo == "comprar") {

                    return logos.comprar;

                } else if (tipo == "comparar") {
                    return logos.comparar;
                }
            }

        }

        return informacion;

    }])

    .factory('compartirFactory', [function () {
        var estados = [];
        var informacion = {
            definir: function (nombre, valor) {
                estados[nombre] = valor;
            },
            obtener: function (nombre) {
                return estados[nombre];
            }
        }
        return informacion;
    }])

    .factory('crearLogoFactory', [function () {

        return function (iconos, fuentes) {

            var logos = [];

            angular.forEach(iconos, function (icono, indice) {

                if (icono.estado == true) {

                    angular.forEach(fuentes, function (fuente, indice) {

                        if (fuente.estado == true) {

                            var logo = {

                                icono: icono,
                                fuente: fuente

                            };

                            logos.push(logo);
                        }
                    })

                }

            })

            return logos;

        }


    }])

    .factory('LS', ['$window', '$rootScope', function ($window, $rootScope) {
        return {
            definir: function (llave, valor) {

                $window.localStorage.setItem(llave, angular.toJson(valor));

            },
            obtener: function (llave) {

                return angular.fromJson($window.localStorage.getItem(llave));
            }
        };

    }])



    /*********************/
    /***** Logos *********/
    /*********************/

    .service("logosService", ["$http", "$q", function ($http, $q, clientesService) {


        this.guardarLogo = function (logo, tipoLogo, idElemento) {

            var defered = $q.defer();

            var promise = defered.promise;

            var datos = {
                logo: logo,
                tipoLogo: tipoLogo,
                idElemento: idElemento
            }

            $http.post("/app/logo/guardar", datos).then(function (res) {

                defered.resolve(res);

            }).catch(function (res) {

                defered.reject(res);

            })


            return promise;

        }


        this.mostrarGuardados = function () {

            var defered = $q.defer();

            var promise = defered.promise;

            $http.post("/app/logos/guardados/").then(function (res) {

                defered.resolve(res.data);

            }).catch(function (res) {

                defered.reject();

            })

            return promise;

        }

        this.mostrarComprados = function () {

            var defered = $q.defer();

            var promise = defered.promise;

            $http.post("/app/logos/descargables/").then(function (res) {

                defered.resolve(res.data);

            }).catch(function (res) {

                defered.reject();

            })

            return promise;

        }

        this.descargarLogo = function (idLogo, ancho, nombre, tipo) {

            var defered = $q.defer();

            var promise = defered.promise;

            var datos = {
                idLogo: idLogo,
                ancho: ancho,
                descarga: nombre,
                tipo: tipo
            }

            $http.post("/app/logo/zip/", datos).then(function (res) {

                defered.resolve(res.data);

            }).catch(function (res) {

                defered.reject(res);

            })

            return promise;

        }


        this.obtenerPorId = function (idLogo) {


            var defered = $q.defer();

            var promise = defered.promise;


            $http.get("/app/logo/" + idLogo).then(function (res) {

                defered.resolve(res.data);

            }).catch(function (res) {

                defered.reject();

            })

            return promise;

        }

    }])

    /*********************/
    /***** planes *********/
    /*********************/

    .service("planesService", ["$http", "$q", function ($http, $q) {

        this.listar = function () {

            var defered = $q.defer();
            var promise = defered.promise;

            $http.get('/app/planesAll').then(function (res) {
                defered.resolve(res.data);
            }).catch(function (res) {
                defered.reject(res);
            })
            return promise;
        }

    }])


    .factory('AuthInterceptor', function ($window, $q, $rootScope, clienteDatosFactory) {
        function salir() {
            $window.localStorage.removeItem('bzToken')
            clienteDatosFactory.eliminar();
            $rootScope.$broadcast('sesionExpiro', "true");
        }

        function autorizado() {
            if (clienteDatosFactory.obtener()) {
                //$rootScope.$broadcast('sesionInicio', "true")
                return clienteDatosFactory.obtener();
            } else {
                if ($window.localStorage.getItem('bzToken')) {

                    clienteDatosFactory.definir(angular.fromJson($window.localStorage.getItem('bzToken')));
                    //$rootScope.$broadcast('sesionInicio', "true")
                    return clienteDatosFactory.obtener();
                } else {
                    return false;
                }
            }
        }
        return {
            request: function (config) {


                config.headers = config.headers || {};
                if (autorizado()) {
                    config.headers.auth = autorizado().token;
                }

                return config || $q.when(config);


            },
            response: function (response) {

                return response || $q.when(response);
            },

            responseError: function (response) {


                if (response.status === 401 || response.status === 403) {
                    salir();


                }

            }
        };
    });
