angular.module("administrador")

    /***************************/
    /*******DATOS CLIENTE*******/
    /***************************/
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

    .service('clientesService', ['$http', '$q', '$window', '$rootScope', 'SweetAlert', "clienteDatosFactory", "$state", function ($http, $q, $window, $rootScope, SweetAlert, clienteDatosFactory, $state) {


        this.registrar = function (datos) {

            var defered = $q.defer();

            var promise = defered.promise;

            $http.post("/app/usuario", datos).then(function (res) {

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

            $http.post("/app/usuario/login", datos)

                .then(function (res) {

                    $window.localStorage.setItem('bzTokenAdmin', angular.toJson(res.data));
                    clienteDatosFactory.definir(res.data);
                    defered.resolve();

                })
                .catch(function () {
                    $window.localStorage.removeItem('bzTokenAdmin');
                    defered.reject()
                })


            return promise;

        }

        this.forgotPass = function (datos) {

            var defered = $q.defer();

            var promise = defered.promise;

            $http.post("/app/recuperar-password", datos)
                .then(function (res) {
                    defered.resolve(res);
                })
                .catch(function (res) {
                    defered.reject(res)
                })

            return promise;

        }

        this.confirmarToken = function (datos) {

            var defered = $q.defer();

            var promise = defered.promise;

            $http.get("/app/recuperar-password/" + datos)
                .then(function (res) {
                    defered.resolve(res);
                })
                .catch(function (res) {
                    defered.reject(res)
                })

            return promise;

        }

        this.cambiarContrasena = function (datos) {

            var defered = $q.defer();

            var promise = defered.promise;

            $http.post("/app/cambiar-password", datos)
                .then(function (res) {
                    defered.resolve(res);
                })
                .catch(function (res) {
                    defered.reject(res)
                })

            return promise;

        }

        this.modificarU = function (datos) {

            var defered = $q.defer();

            var promise = defered.promise;

            $http.post("/app/usuario/modificar/", datos)
                .then(function (res) {
                    defered.resolve(res);
                })
                .catch(function (res) {
                    defered.reject(res)
                })

            return promise;

        }

        this.autorizado = function () {

            if (clienteDatosFactory.obtener()) {

                return clienteDatosFactory.obtener();

            } else {

                if ($window.localStorage.getItem('bzTokenAdmin')) {

                    clienteDatosFactory.definir(angular.fromJson($window.localStorage.getItem('bzTokenAdmin')));

                    return clienteDatosFactory.obtener();

                } else {

                    return false;

                }

            }

        }

        this.salir = function (desactivarAlerta) {

            $window.localStorage.removeItem('bzTokenAdmin')
            clienteDatosFactory.eliminar();

            if (!desactivarAlerta) {
                SweetAlert.swal("¡Ups!", "Tu sesion ha expirado", "warning");
                $state.go('login')
            }
        }


    }])

    /* SERVICIO PARA PROCESO DE CLIENTES */

    .service('clientesServiceAdmin', ['$http', '$q', function ($http, $q) {

        /* MODULO DE CLIENTES */
        this.listarClientes = function () {
            var defered = $q.defer();
            var promise = defered.promise;

            $http.get('/app/clientes').then(function (res) {

                defered.resolve(res);

            }).catch(function (res) {

                defered.reject(res.data.msg);

            })

            return promise;
        }

        this.borrarCliente = function (id) {

            var defered = $q.defer();

            var promise = defered.promise;

            $http.post('/app/cliente/bloquear/' + id).then(function (res) {

                defered.resolve(res);

            }).catch(function (res) {

                defered.reject(res.data.msg);

            })

            return promise;
        }

        this.borrarUsuario = function (id) {

            var defered = $q.defer();

            var promise = defered.promise;

            $http.get('/app/usuario/borrar/' + id).then(function (res) {

                defered.resolve(res);

            }).catch(function (res) {

                defered.reject(res.data.msg);

            })

            return promise;
        }

        /* MODULO DE USUARIOS */

        this.listarUsuarios = function () {
            var defered = $q.defer();
            var promise = defered.promise;

            $http.get('/app/usuarios').then(function (res) {

                defered.resolve(res);

            }).catch(function (res) {

                defered.reject(res.data.msg);

            })
            return promise;
        }

    }])

    /* SERVICIO PARA PROCESO DE PEDIDOS */


    .service('pedidosService', ['$http', '$q', function ($http, $q) {

        /* LISTAR TODOS LOS PEDIDOS */

        this.listarPedidos = function () {
            var defered = $q.defer();
            var promise = defered.promise;

            $http.get('/app/pedidos').then(function (res) {

                defered.resolve(res);

            }).catch(function (res) {

                defered.reject(res.data.msg);

            })
            return promise;
        }

        /* DATOS DE UN PEDIDO */

        this.datosPedido = function (id) {

            var defered = $q.defer();
            var promise = defered.promise;
            $http.get('/app/pedido/' + id).then(function (res) {

                defered.resolve(res);

            }).catch(function (res) {

                defered.reject(res.data.msg);

            })
            return promise;
        }

        /* LISTAR LOS PEDIDOS DE UN CLIENTE */

        this.pedidosCliente = function (id) {

            var defered = $q.defer();
            var promise = defered.promise;

            $http.get('/app/pedidos/cliente/' + id).then(function (res) {

                defered.resolve(res);

            }).catch(function (res) {

                defered.reject(res);

            })
            return promise;
        }

        /* CAMBIAR ESTADO DE UN PEDIDO */

        this.cambiarEstado = function (id, estadoP) {

            var defered = $q.defer();
            var promise = defered.promise;

            var datos = {
                idPedido: id,
                estado: estadoP,
            }

            $http.post('/app/pedido/cambiar/', datos).then(function (res) {

                defered.resolve(res);

            }).catch(function (res) {

                defered.reject(res.data.msg);

            })
            return promise;
        }


    }])

    /* SERVICIO PARA PROCESO DE CATEGORIAS */


    .service('categoriasService', ['$http', '$q', function ($http, $q) {

        /* CATEGORIAS */

        this.listarCategorias = function (datos) {
            var defered = $q.defer();
            var promise = defered.promise;

            $http.post("/app/categorias", datos).then(function (res) {

                defered.resolve(res);

            }).catch(function (res) {

                defered.reject(res.data.msg);

            })
            return promise;
        }

        this.modificarCategoria = function (datos) {
            var defered = $q.defer();
            var promise = defered.promise;

            $http.post('/app/categoria/modificar/', datos).then(function (res) {

                defered.resolve(res);

            }).catch(function (res) {

                defered.reject(res.data.msg);

            })
            return promise;
        }

        this.nuevaCategoria = function (datos) {
            var defered = $q.defer();
            var promise = defered.promise;

            $http.post('/app/categoria', datos).then(function (res) {

                defered.resolve(res);

            }).catch(function (res) {

                defered.reject(res.data.msg);

            })
            return promise;
        }

        this.eliminarCategoria = function (id) {
            var defered = $q.defer();
            var promise = defered.promise;

            $http.get('/app/categoria/borrar/' + id).then(function (res) {

                defered.resolve(res);

            }).catch(function (res) {

                defered.reject(res);

            })
            return promise;
        }

        /* PREFERENCIAS */

        this.listarPreferencias = function () {
            var defered = $q.defer();
            var promise = defered.promise;

            $http.get("/app/preferencias").then(function (res) {

                defered.resolve(res);

            }).catch(function (res) {

                defered.reject(res.data.msg);

            })
            return promise;
        }

        this.modificarPreferencia = function (datos) {
            var defered = $q.defer();
            var promise = defered.promise;

            $http.post('/app/preferencia/modificar/', datos).then(function (res) {

                defered.resolve(res);

            }).catch(function (res) {

                defered.reject(res.data.msg);

            })
            return promise;
        }

        this.nuevaPreferencia = function (datos) {
            var defered = $q.defer();
            var promise = defered.promise;

            $http.post('/app/preferencia', datos).then(function (res) {

                defered.resolve(res);

            }).catch(function (res) {

                defered.reject(res.data.msg);

            })
            return promise;
        }

        this.eliminarPreferencia = function (id) {
            var defered = $q.defer();
            var promise = defered.promise;

            $http.get('/app/preferencia/borrar/' + id).then(function (res) {

                defered.resolve(res);

            }).catch(function (res) {

                defered.reject(res);

            })
            return promise;
        }

    }])

    /* SERVICIO PARA ICONOS */

    .service('iconoFuente', ['$http', 'Upload', '$q', function ($http, Upload, $q) {

        this.listar = function (datos) {
            var defered = $q.defer();
            var promise = defered.promise;

            $http.post('/app/elementos/busqueda', datos).then(function (res) {

                defered.resolve(res);

            }).catch(function (res) {

                defered.reject(res);

            })
            return promise;
        }

        this.modificarPreferencias = function (datos) {
            var defered = $q.defer();
            var promise = defered.promise;

            $http.post('/app/elemento/preferencias/modificar', datos).then(function (res) {

                defered.resolve(res);

            }).catch(function (res) {

                defered.reject(res);

            })
            return promise;
        }

        this.nuevoIcono = function (datos) {

            var defered = $q.defer();
            var promise = defered.promise;

            /* Ver si se envia el archivo 
            console.log(datos)
            */

            Upload.upload({
                url: '/app/elemento/icono/',
                method: 'POST',
                file: {
                    misvg: datos.misvg
                },
                data: datos
            }).then(function (res) {

                defered.resolve(res);

            }).catch(function (res) {

                defered.reject(res);

            })
            return promise;
        }

        this.nuevaFuente = function (datos) {

            var defered = $q.defer();
            var promise = defered.promise;


            /* Ver si se envia el archivo 
            console.log(datos)
            */

            Upload.upload({
                url: '/app/elemento/fuente/',
                method: 'POST',
                file: {
                    mifuente: datos.mifuente
                },
                data: datos
            }).then(function (res) {

                defered.resolve(res);

            }).catch(function (res) {

                defered.reject(res);

            })
            return promise;
        }

        this.subidaMasiva = function (datos) {

            var defered = $q.defer();

            Upload.upload({
                url: '/app/elemento/masivo',
                method: 'POST',
                data: datos
            }).then(function (res) {

                defered.resolve(res);

            }).catch(function (res) {

                defered.reject(res);

            })

        }

    }])


    /* SERVICIO PARA ADMINISTRAR */

    .service('administrarService', ['$http', '$q', function ($http, $q) {

        /***************************/
        /**********PLANES***********/
        /***************************/

        this.listarPlanes = function () {
            var defered = $q.defer();
            var promise = defered.promise;

            $http.get('/app/planes/').then(function (res) {
                defered.resolve(res.data);
            }).catch(function (res) {
                defered.reject(res);
            })
            return promise;
        }

        this.agregarPlan = function (datos) {
            var defered = $q.defer();
            var promise = defered.promise;

            var datosn = datos;

            $http.post('/app/plan', datosn).then(function (res) {

                angular.forEach(datosn.caracteristicas, function (valor) {
                    valor.idPlan = res.data.insertId;
                });

                datosn.idPlan = res.data.insertId;

                $http.post('/app/plan/caracteristicas/', datosn).then(function () {

                    defered.resolve(datosn);

                }).catch(function (res) {

                    defered.reject(res);

                })

            }).catch(function (res) {

                defered.reject(res);

            })
            return promise;
        }

        this.agregarPrecioPlan = function (datos) {
            var defered = $q.defer();
            var promise = defered.promise;

            $http.post('/app/precio', datos).then(function (res) {

                defered.resolve(res);

            }).catch(function (res) {

                defered.reject(res);

            })
            return promise;
        }

        this.listarPreciosPlan = function (id) {
            var defered = $q.defer();
            var promise = defered.promise;

            $http.get('/app/plan/precios/' + id).then(function (res) {
                defered.resolve(res);
            }).catch(function (res) {
                defered.reject(res);
            })
            return promise;
        }

        this.modificarNombrePlan = function (datos) {
            var defered = $q.defer();
            var promise = defered.promise;

            $http.post('/app/plan/modificar', datos).then(function (res) {

                defered.resolve(res);

            }).catch(function (res) {

                defered.reject(res);

            })

            return promise;
        }

        this.modificarPrecioPlan = function (datos) {
            var defered = $q.defer();
            var promise = defered.promise;

            $http.post('/app/precio/modificar', datos).then(function (res) {

                defered.resolve(res);

            }).catch(function (res) {

                defered.reject(res);

            })

            return promise;
        }

        this.borrarPrecioPlan = function (opcion, id) {
            var defered = $q.defer();
            var promise = defered.promise;

            $http.get('/app/precio/borrar/' + id).then(function (res) {

                defered.resolve(res);

            }).catch(function (res) {

                defered.reject(res);

            })
            return promise;
        }

        this.bloquearPlan = function (datos) {
            var defered = $q.defer();
            var promise = defered.promise;

            $http.post('/app/plan/bloquear', datos).then(function (res) {
                defered.resolve(res);
            }).catch(function (res) {
                defered.reject(res);
            })
            return promise;
        }

        /***************************/
        /********IMPUESTOS**********/
        /***************************/

        this.listarImpuestos = function () {
            var defered = $q.defer();
            var promise = defered.promise;

            $http.get('/app/impuestos').then(function (res) {
                defered.resolve(res.data);
            }).catch(function (res) {
                defered.reject(res);
            })
            return promise;
        }

        this.agregarImpuesto = function (opcion, datos) {
            var defered = $q.defer();
            var promise = defered.promise;

            $http.post('/app/impuesto', datos).then(function (res) {

                defered.resolve(res);

            }).catch(function (res) {

                defered.reject(res);

            })
            return promise;
        }

        this.modificar = function (opcion, datos) {
            var defered = $q.defer();
            var promise = defered.promise;

            $http.post('/app/impuesto/modificar/', datos).then(function (res) {

                defered.resolve(res);

            }).catch(function (res) {

                defered.reject(res);

            })

            return promise;
        }

        this.borrarImpuesto = function (opcion, id) {
            var defered = $q.defer();
            var promise = defered.promise;

            $http.get('/app/impuesto/borrar/' + id).then(function (res) {

                defered.resolve(res);

            }).catch(function (res) {

                defered.reject(res);

            })
            return promise;
        }

    }])

    /* SERVICIO PARA DISEÑADORES */

    .service('designerService', ['$http', '$q', function ($http, $q) {

        /***************************/
        /**********LOGOS***********/
        /***************************/

        this.listarLogos = function () {
            var defered = $q.defer();
            var promise = defered.promise;

            var datos = {
                estado: 'Por Aprobar'
            }

            $http.post('/app/logos/por-aprobar', datos).then(function (res) {
                defered.resolve(res.data);
            }).catch(function (res) {
                defered.reject(res);
            })
            return promise;
        }

        this.aprobarLogo = function (id) {
            var defered = $q.defer();
            var promise = defered.promise;

            var datos = {
                idLogo: id
            }

            $http.post('/app/logo/aprobar', datos).then(function (res) {
                defered.resolve(res);
            }).catch(function (res) {
                defered.reject(res);
            })
            return promise;

        }

        this.borrarLogo = function (id) {
            var defered = $q.defer();
            var promise = defered.promise;

            $http.get('/app/logo/borrar/' + id).then(function (res) {
                defered.resolve(res);
            }).catch(function (res) {
                defered.reject(res);
            })
            return promise;
        }

        this.destacado = function (datos) {
            var defered = $q.defer();
            var promise = defered.promise;

            $http.post('/app/logo/destacar', datos).then(function (res) {
                defered.resolve(res);
            }).catch(function (res) {
                defered.reject(res);
            })
            return promise;
        }
        

        this.calificarLogo = function (datos) {
            var defered = $q.defer();
            var promise = defered.promise;

            // idLogo, valor
            $http.post('/app/logo/calificar-admin/', datos).then(function (res) {
                defered.resolve(res);

            }).catch(function (res) {

                defered.reject(res);

            })
            return promise;
        }

        /* DISENADORES */

        this.listarDisenadores = function () {
            var defered = $q.defer();
            var promise = defered.promise;

            $http.get('/app/clientes/freelancer').then(function (res) {
                defered.resolve(res.data);
            }).catch(function (res) {
                defered.reject(res);
            })
            return promise;
        }

        this.logosDisenador = function (id) {
            var defered = $q.defer();
            var promise = defered.promise;

            $http.get('/app/logos/' + id + '/aprobados').then(function (res) {
                defered.resolve(res.data);
            }).catch(function (res) {
                defered.reject(res);
            })
            return promise;
        }

        this.historialDisenador = function (id) {
            var defered = $q.defer();
            var promise = defered.promise;

            $http.get('/app/cliente/' + id + '/pagos').then(function (res) {
                defered.resolve(res.data);
            }).catch(function (res) {
                defered.reject(res);
            })
            return promise;
        }

        // TODO: RUTA MALA
        this.notificarPago = function (datos) {
            var defered = $q.defer();
            var promise = defered.promise;

            $http.post('/app/cliente/pago', datos).then(function (res) {

                defered.resolve(res);

            }).catch(function (res) {

                defered.reject(res);

            })
            return promise;
        }

        this.bloquearDisenador = function (id) {
            var defered = $q.defer();
            var promise = defered.promise;

            $http.get('/app/cliente/bloquear/' + id).then(function (res) {

                defered.resolve(res);

            }).catch(function (res) {

                defered.reject(res);

            })

            return promise;
        }

    }])

    /* NOTIFICACION */

    .service('notificacionService', ['$http', '$q', '$mdToast', function ($http, $q, $mdToast) {
        this.mensaje = function (mensaje) {
            $mdToast.show($mdToast.simple().textContent(mensaje).position('bottom right').hideDelay(3000));
        }
    }])

    .factory('AuthInterceptor', function ($window, $q, $rootScope, clienteDatosFactory) {
        function salir() {
            $rootScope.$broadcast("sesionExpiro");
        }

        function autorizado() {
            if (clienteDatosFactory.obtener()) {
                $rootScope.$broadcast('sesionInicio', "true")
                return clienteDatosFactory.obtener();
            } else {
                if ($window.localStorage.getItem('bzTokenAdmin')) {


                    $rootScope.$broadcast('sesionInicio', "true")
                    clienteDatosFactory.definir(angular.fromJson($window.localStorage.getItem('bzToken')));
                    return clienteDatosFactory.obtener();
                } else {
                    return false;
                }
            }
        }
        return {
            request: function (config) {

                if (config.url == 'http://ip-api.com/json/') {
                    return config;
                } else {
                    config.headers = config.headers || {};
                    if (autorizado()) {
                        config.headers.auth = autorizado().token;
                    }

                    return config || $q.when(config);
                }

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
    })

    .service('paisesService', ['$http', '$q', function ($http, $q) {

        /* MODULO DE CLIENTES */
        this.listarPaises = function () {
            var defered = $q.defer();
            var promise = defered.promise;

            $http.get('/app/paises').then(function (res) {

                defered.resolve(res);

            }).catch(function (res) {

                defered.reject(res);

            })

            return promise;
        }

        /* MODULO DE CLIENTES */
        this.borrarPais = function (id) {
            var defered = $q.defer();
            var promise = defered.promise;

            $http.get('/app/pais/borrar/' + id).then(function (res) {

                defered.resolve(res);

            }).catch(function (res) {

                defered.reject(res.data.msg);

            })

            return promise;
        }

        this.modificarPais = function (datos) {

            var defered = $q.defer();

            var promise = defered.promise;

            $http.post('/app/pais/modificar', datos).then(function (res) {

                defered.resolve(res);

            }).catch(function (res) {

                defered.reject(res.data.msg);

            })

            return promise;
        }

        this.guardarPais = function (datos) {

            var defered = $q.defer();

            var promise = defered.promise;

            $http.post('/app/pais', datos).then(function (res) {

                defered.resolve(res);

            }).catch(function (res) {

                defered.reject(res.data.msg);

            })

            return promise;
        }

        this.asignarMoneda = function (datos) {

            var defered = $q.defer();

            var promise = defered.promise;

            $http.post('/app/pais/moneda', datos).then(function (res) {

                defered.resolve(res);

            }).catch(function (res) {

                defered.reject(res.data.msg);

            })

            return promise;
        }

        this.desasignarMoneda = function (datos) {

            var defered = $q.defer();

            var promise = defered.promise;

            $http.post('/app/pais/moneda/desasignar', datos).then(function (res) {

                defered.resolve(res);

            }).catch(function (res) {

                defered.reject(res.data.msg);

            })

            return promise;
        }


        this.paisMonedas = function (id) {

            var defered = $q.defer();

            var promise = defered.promise;

            $http.get('/app/pais/monedas/' + id).then(function (res) {

                defered.resolve(res);

            }).catch(function (res) {

                defered.reject(res.data.msg);

            })

            return promise;
        }


    }])

    .service('monedasService', ['$http', '$q', function ($http, $q) {

        /* MODULO DE CLIENTES */
        this.listarMonedas = function () {
            var defered = $q.defer();
            var promise = defered.promise;

            $http.get('/app/monedas').then(function (res) {

                defered.resolve(res);

            }).catch(function (res) {

                defered.reject(res.data.msg);

            })

            return promise;
        }

        /* MODULO DE CLIENTES */
        this.guardarMoneda = function (datos) {
            var defered = $q.defer();
            var promise = defered.promise;

            $http.post('/app/moneda', datos).then(function (res) {

                defered.resolve(res);

            }).catch(function (res) {

                defered.reject(res.data.msg);

            })

            return promise;
        }

        this.modificarMoneda = function (datos) {

            var defered = $q.defer();

            var promise = defered.promise;

            $http.post('/app/moneda/modificar', datos).then(function (res) {

                defered.resolve(res);

            }).catch(function (res) {

                defered.reject(res.data.msg);

            })

            return promise;
        }

        this.borrarMoneda = function (id) {

            var defered = $q.defer();

            var promise = defered.promise;

            $http.get('/app/moneda/borrar' + id).then(function (res) {

                defered.resolve(res);

            }).catch(function (res) {

                defered.reject(res.data.msg);

            })

            return promise;
        }


    }])

    .service('pasarelasService', ['$http', '$q', function ($http, $q) {

        /* MODULO DE CLIENTES */
        this.listarPasarelas = function () {
            var defered = $q.defer();
            var promise = defered.promise;

            $http.get('/app/pasarelas').then(function (res) {

                defered.resolve(res);

            }).catch(function (res) {

                defered.reject(res.data.msg);

            })

            return promise;
        }

        /* MODULO DE CLIENTES */
        this.guardarPasarela = function (datos) {
            var defered = $q.defer();
            var promise = defered.promise;

            $http.post('/app/pasarela', datos).then(function (res) {

                defered.resolve(res);

            }).catch(function (res) {

                defered.reject(res.data.msg);

            })

            return promise;
        }

        this.modificarPasarela = function (datos) {

            var defered = $q.defer();

            var promise = defered.promise;

            $http.post('/app/pasarela/modificar', datos).then(function (res) {

                defered.resolve(res);

            }).catch(function (res) {

                defered.reject(res.data.msg);

            })

            return promise;
        }

        this.asignarMoneda = function (datos) {

            var defered = $q.defer();

            var promise = defered.promise;

            $http.post('/app/pasarela/moneda', datos).then(function (res) {

                defered.resolve(res);

            }).catch(function (res) {

                defered.reject(res.data.msg);

            })

            return promise;
        }

        this.desasignarMoneda = function (datos) {

            var defered = $q.defer();

            var promise = defered.promise;

            $http.post('/app/pasarela/moneda/desasignar', datos).then(function (res) {

                defered.resolve(res);

            }).catch(function (res) {

                defered.reject(res.data.msg);

            })

            return promise;
        }


        this.pasarelaMonedas = function (id) {

            var defered = $q.defer();

            var promise = defered.promise;

            $http.get('/app/pasarela/monedas/' + id).then(function (res) {

                defered.resolve(res);

            }).catch(function (res) {

                defered.reject(res.data.msg);

            })

            return promise;
        }



    }])

    .filter('unique', function () {

        return function (items, filterOn) {

            if (filterOn === false) {
                return items;
            }

            if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
                    newItems = [];

                var extractValueToCompare = function (item) {
                    if (angular.isObject(item) && angular.isString(filterOn)) {
                        return item[filterOn];
                    } else {
                        return item;
                    }
                };

                angular.forEach(items, function (item) {
                    var isDuplicate = false;

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

    .value("caracteristicasValue", [{
        clave: 'resolucion',
        valor: false,
        descripcion: 'Logo en Alta Resolución.'
    }, {
        clave: 'png',
        valor: false,
        descripcion: 'Archivo Png Transparente.'
    }, {
        clave: 'licencia',
        valor: false,
        descripcion: 'Licencia comercial.'
    }, {
        clave: 'copia',
        valor: false,
        descripcion: 'Copia de seguridad de por vida.'
    }, {
        clave: 'tamanios',
        valor: false,
        descripcion: 'Tamaño del logo adaptado a papeleria y redes sociales.'
    }, {
        clave: 'editable',
        valor: false,
        descripcion: 'Archivo editable con la  tipografia incluida.'
    }, {
        clave: 'manual',
        valor: false,
        descripcion: 'Manual de marca.'
    }])

    .value("monedasValue", {
        "USD": {
            "symbol": "$",
            "nombre": "Dólar estadounidense",
            "name": "US Dollar",
            "symbol_native": "$",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "USD"
        },
        "CAD": {
            "symbol": "CA$",
            "nombre": "Dólar canadiense",
            "name": "Canadian Dollar",
            "symbol_native": "$",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "CAD"
        },
        "EUR": {
            "symbol": "€",
            "nombre": "Euro",
            "name": "Euro",
            "symbol_native": "€",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "EUR"
        },
        "AED": {
            "symbol": "AED",
            "nombre": "Dirham de los Emiratos Árabes Unidos",
            "name": "United Arab Emirates Dirham",
            "symbol_native": "د.إ.‏",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "AED"
        },
        "AFN": {
            "symbol": "Af",
            "nombre": "Afgani afgano",
            "name": "Afghan Afghani",
            "symbol_native": "؋",
            "decimal_digits": 0,
            "rounding": 0,
            "code": "AFN"
        },
        "ALL": {
            "symbol": "ALL",
            "nombre": "Lek albanés",
            "name": "Albanian Lek",
            "symbol_native": "Lek",
            "decimal_digits": 0,
            "rounding": 0,
            "code": "ALL"
        },
        "AMD": {
            "symbol": "AMD",
            "nombre": "Dram armenio",
            "name": "Armenian Dram",
            "symbol_native": "դր.",
            "decimal_digits": 0,
            "rounding": 0,
            "code": "AMD"
        },
        "ARS": {
            "symbol": "AR$",
            "nombre": "Peso Argentino",
            "name": "Argentine Peso",
            "symbol_native": "$",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "ARS"
        },
        "AUD": {
            "symbol": "AU$",
            "nombre": "Dólar australiano",
            "name": "Australian Dollar",
            "symbol_native": "$",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "AUD"
        },
        "AZN": {
            "symbol": "man.",
            "nombre": "Manat azerí",
            "name": "Azerbaijani Manat",
            "symbol_native": "ман.",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "AZN"
        },
        "BAM": {
            "symbol": "KM",
            "nombre": "Marco convertible",
            "name": "Bosnia-Herzegovina Convertible Mark",
            "symbol_native": "KM",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "BAM"
        },
        "BDT": {
            "symbol": "Tk",
            "nombre": "Taka bangladeshí",
            "name": "Bangladeshi Taka",
            "symbol_native": "৳",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "BDT"
        },
        "BGN": {
            "symbol": "BGN",
            "nombre": "Lev búlgaro",
            "name": "Bulgarian Lev",
            "symbol_native": "лв.",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "BGN"
        },
        "BHD": {
            "symbol": "BD",
            "nombre": "Dinar bahreiní",
            "name": "Bahraini Dinar",
            "symbol_native": "د.ب.‏",
            "decimal_digits": 3,
            "rounding": 0,
            "code": "BHD"
        },
        "BIF": {
            "symbol": "FBu",
            "nombre": "Franco de Burundi",
            "name": "Burundian Franc",
            "symbol_native": "FBu",
            "decimal_digits": 0,
            "rounding": 0,
            "code": "BIF"
        },
        "BND": {
            "symbol": "BN$",
            "nombre": "Dólar de Brunéi",
            "name": "Brunei Dollar",
            "symbol_native": "$",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "BND"
        },
        "BOB": {
            "symbol": "Bs",
            "nombre": "Boliviano",
            "name": "Bolivian Boliviano",
            "symbol_native": "Bs",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "BOB"
        },
        "BRL": {
            "symbol": "R$",
            "nombre": "Real brasileño",
            "name": "Brazilian Real",
            "symbol_native": "R$",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "BRL"
        },
        "BWP": {
            "symbol": "BWP",
            "nombre": "Pula",
            "name": "Belarusian Ruble",
            "symbol_native": "P",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "BWP"
        },
        "BYR": {
            "symbol": "BYR",
            "nombre": "Belarusian Ruble",
            "name": "Belarusian Ruble",
            "symbol_native": "BYR",
            "decimal_digits": 0,
            "rounding": 0,
            "code": "BYR"
        },
        "BZD": {
            "symbol": "BZ$",
            "nombre": "Dólar beliceño",
            "name": "Belize Dollar",
            "symbol_native": "$",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "BZD"
        },
        "CDF": {
            "symbol": "CDF",
            "nombre": "Franco congoleño",
            "name": "Congolese Franc",
            "symbol_native": "FrCD",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "CDF"
        },
        "CHF": {
            "symbol": "CHF",
            "nombre": "Franco suizo",
            "name": "Swiss Franc",
            "symbol_native": "CHF",
            "decimal_digits": 2,
            "rounding": 0.05,
            "code": "CHF"
        },
        "CLP": {
            "symbol": "CL$",
            "nombre": "Peso chileno",
            "name": "Chilean Peso",
            "symbol_native": "$",
            "decimal_digits": 0,
            "rounding": 0,
            "code": "CLP"
        },
        "CNY": {
            "symbol": "CN¥",
            "nombre": "Yuan chino",
            "name": "Chinese Yuan",
            "symbol_native": "CN¥",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "CNY"
        },
        "COP": {
            "symbol": "CO$",
            "nombre": "Peso Colombiano",
            "name": "Colombian Peso",
            "symbol_native": "$",
            "decimal_digits": 0,
            "rounding": 0,
            "code": "COP"
        },
        "CRC": {
            "symbol": "₡",
            "nombre": "Colón costarricense",
            "name": "Costa Rican Colón",
            "symbol_native": "₡",
            "decimal_digits": 0,
            "rounding": 0,
            "code": "CRC"
        },
        "CVE": {
            "symbol": "CV$",
            "nombre": "Escudo caboverdiano",
            "name": "Cape Verdean Escudo",
            "symbol_native": "CV$",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "CVE"
        },
        "CZK": {
            "symbol": "Kč",
            "nombre": "Corona checa",
            "name": "Czech Republic Koruna",
            "symbol_native": "Kč",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "CZK"
        },
        "DJF": {
            "symbol": "Fdj",
            "nombre": "Franco yibutiano",
            "name": "Djiboutian Franc",
            "symbol_native": "Fdj",
            "decimal_digits": 0,
            "rounding": 0,
            "code": "DJF"
        },
        "DKK": {
            "symbol": "Dkr",
            "nombre": "Corona danesa",
            "name": "Danish Krone",
            "symbol_native": "kr",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "DKK"
        },
        "DOP": {
            "symbol": "RD$",
            "nombre": "Peso Dominicano",
            "name": "Dominican Peso",
            "symbol_native": "RD$",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "DOP"
        },
        "DZD": {
            "symbol": "DA",
            "nombre": "Dinar argelino",
            "name": "Algerian Dinar",
            "symbol_native": "د.ج.‏",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "DZD",
            "name_plural": "Algerian dinars"
        },
        "EEK": {
            "symbol": "Ekr",
            "nombre": "Estonian Kroon",
            "name": "Estonian Kroon",
            "symbol_native": "kr",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "EEK",
            "name_plural": "Estonian kroons"
        },
        "EGP": {
            "symbol": "EGP",
            "name": "Egyptian Pound",
            "nombre": "Libra egipcia",
            "symbol_native": "ج.م.‏",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "EGP",
            "name_plural": "Egyptian pounds"
        },
        "ERN": {
            "symbol": "Nfk",
            "nombre": "Nakfa",
            "name": "Eritrean Nakfa",
            "symbol_native": "Nfk",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "ERN",
            "name_plural": "Eritrean nakfas"
        },
        "ETB": {
            "symbol": "Br",
            "nombre": "Birr etíope",
            "name": "Ethiopian Birr",
            "symbol_native": "Br",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "ETB",
            "name_plural": "Ethiopian birrs"
        },
        "GBP": {
            "symbol": "£",
            "nombre": "Libra británica",
            "name": "British Pound Sterling",
            "symbol_native": "£",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "GBP",
            "name_plural": "British pounds sterling"
        },
        "GEL": {
            "symbol": "GEL",
            "nombre": "Lari georgiano",
            "name": "Georgian Lari",
            "symbol_native": "GEL",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "GEL",
            "name_plural": "Georgian laris"
        },
        "GHS": {
            "symbol": "GH₵",
            "nombre": "Cedi",
            "name": "Ghanaian Cedi",
            "symbol_native": "GH₵",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "GHS",
            "name_plural": "Ghanaian cedis"
        },
        "GNF": {
            "symbol": "FG",
            "nombre": "Franco guineano",
            "name": "Guinean Franc",
            "symbol_native": "FG",
            "decimal_digits": 0,
            "rounding": 0,
            "code": "GNF",
            "name_plural": "Guinean francs"
        },
        "GTQ": {
            "symbol": "GTQ",
            "nombre": "Quetzal guatemalteco",
            "name": "Guatemalan Quetzal",
            "symbol_native": "Q",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "GTQ",
            "name_plural": "Guatemalan quetzals"
        },
        "HKD": {
            "symbol": "HK$",
            "nombre": "Hong Kong Dolar",
            "name": "Hong Kong Dollar",
            "symbol_native": "$",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "HKD",
            "name_plural": "Hong Kong dollars"
        },
        "HNL": {
            "symbol": "HNL",
            "nombre": "Lempira hondureño",
            "name": "Honduran Lempira",
            "symbol_native": "L",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "HNL",
            "name_plural": "Honduran lempiras"
        },
        "HRK": {
            "symbol": "kn",
            "nombre": "Kuna croata",
            "name": "Croatian Kuna",
            "symbol_native": "kn",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "HRK",
            "name_plural": "Croatian kunas"
        },
        "HUF": {
            "symbol": "Ft",
            "nombre": "Forinto húngaro",
            "name": "Hungarian Forint",
            "symbol_native": "Ft",
            "decimal_digits": 0,
            "rounding": 0,
            "code": "HUF",
            "name_plural": "Hungarian forints"
        },
        "IDR": {
            "symbol": "Rp",
            "nombre": "Rupia indonesia",
            "name": "Indonesian Rupiah",
            "symbol_native": "Rp",
            "decimal_digits": 0,
            "rounding": 0,
            "code": "IDR",
            "name_plural": "Indonesian rupiahs"
        },
        "ILS": {
            "symbol": "₪",
            "nombre": "Nuevo shéquel",
            "name": "Israeli New Sheqel",
            "symbol_native": "₪",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "ILS",
            "name_plural": "Israeli new sheqels"
        },
        "INR": {
            "symbol": "Rs",
            "nombre": "Rupia india",
            "name": "Indian Rupee",
            "symbol_native": "টকা",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "INR",
            "name_plural": "Indian rupees"
        },
        "IQD": {
            "symbol": "IQD",
            "nombre": "Dinar iraquí",
            "name": "Iraqi Dinar",
            "symbol_native": "د.ع.‏",
            "decimal_digits": 0,
            "rounding": 0,
            "code": "IQD",
            "name_plural": "Iraqi dinars"
        },
        "IRR": {
            "symbol": "IRR",
            "nombre": "Rial iraní",
            "name": "Iranian Rial",
            "symbol_native": "﷼",
            "decimal_digits": 0,
            "rounding": 0,
            "code": "IRR",
            "name_plural": "Iranian rials"
        },
        "ISK": {
            "symbol": "Ikr",
            "nombre": "Corona islandes",
            "name": "Icelandic Króna",
            "symbol_native": "kr",
            "decimal_digits": 0,
            "rounding": 0,
            "code": "ISK",
            "name_plural": "Icelandic krónur"
        },
        "JMD": {
            "symbol": "J$",
            "nombre": "Dólar jamaiquino",
            "name": "Jamaican Dollar",
            "symbol_native": "$",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "JMD",
            "name_plural": "Jamaican dollars"
        },
        "JOD": {
            "symbol": "JD",
            "nombre": "Dinar jordano",
            "name": "Jordanian Dinar",
            "symbol_native": "د.أ.‏",
            "decimal_digits": 3,
            "rounding": 0,
            "code": "JOD",
            "name_plural": "Jordanian dinars"
        },
        "JPY": {
            "symbol": "¥",
            "nombre": "Yen",
            "name": "Japanese Yen",
            "symbol_native": "￥",
            "decimal_digits": 0,
            "rounding": 0,
            "code": "JPY",
            "name_plural": "Japanese yen"
        },
        "KES": {
            "symbol": "Ksh",
            "nombre": "Chelín keniano",
            "name": "Kenyan Shilling",
            "symbol_native": "Ksh",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "KES",
            "name_plural": "Kenyan shillings"
        },
        "KHR": {
            "symbol": "KHR",
            "nombre": "Riel camboyano",
            "name": "Cambodian Riel",
            "symbol_native": "៛",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "KHR",
            "name_plural": "Cambodian riels"
        },
        "KMF": {
            "symbol": "CF",
            "nombre": "Franco comorano",
            "name": "Comorian Franc",
            "symbol_native": "FC",
            "decimal_digits": 0,
            "rounding": 0,
            "code": "KMF",
            "name_plural": "Comorian francs"
        },
        "KRW": {
            "symbol": "₩",
            "nombre": "Won surcoreano",
            "name": "South Korean Won",
            "symbol_native": "₩",
            "decimal_digits": 0,
            "rounding": 0,
            "code": "KRW",
            "name_plural": "South Korean won"
        },
        "KWD": {
            "symbol": "KD",
            "nombre": "Dinar kuwaití",
            "name": "Kuwaiti Dinar",
            "symbol_native": "د.ك.‏",
            "decimal_digits": 3,
            "rounding": 0,
            "code": "KWD",
            "name_plural": "Kuwaiti dinars"
        },
        "KZT": {
            "symbol": "KZT",
            "nombre": "Tenge kazajo",
            "name": "Kazakhstani Tenge",
            "symbol_native": "тңг.",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "KZT",
            "name_plural": "Kazakhstani tenges"
        },
        "LBP": {
            "symbol": "LB£",
            "nombre": "Libra libanesa",
            "name": "Lebanese Pound",
            "symbol_native": "ل.ل.‏",
            "decimal_digits": 0,
            "rounding": 0,
            "code": "LBP",
            "name_plural": "Lebanese pounds"
        },
        "LKR": {
            "symbol": "SLRs",
            "nombre": "Rupia de Sri Lanka",
            "name": "Sri Lankan Rupee",
            "symbol_native": "SL Re",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "LKR",
            "name_plural": "Sri Lankan rupees"
        },
        "LTL": {
            "symbol": "Lt",
            "nombre": "Lithuanian Litas",
            "name": "Lithuanian Litas",
            "symbol_native": "Lt",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "LTL",
            "name_plural": "Lithuanian litai"
        },
        "LVL": {
            "symbol": "Ls",
            "nombre": "Latvian Lats",
            "name": "Latvian Lats",
            "symbol_native": "Ls",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "LVL",
            "name_plural": "Latvian lati"
        },
        "LYD": {
            "symbol": "LD",
            "nombre": "Dinar libio",
            "name": "Libyan Dinar",
            "symbol_native": "د.ل.‏",
            "decimal_digits": 3,
            "rounding": 0,
            "code": "LYD",
            "name_plural": "Libyan dinars"
        },
        "MAD": {
            "symbol": "MAD",
            "nombre": "Dirham marroquí",
            "name": "Moroccan Dirham",
            "symbol_native": "د.م.‏",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "MAD",
            "name_plural": "Moroccan dirhams"
        },
        "MDL": {
            "symbol": "MDL",
            "nombre": "Leu moldavo",
            "name": "Moldovan Leu",
            "symbol_native": "MDL",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "MDL",
            "name_plural": "Moldovan lei"
        },
        "MGA": {
            "symbol": "MGA",
            "nombre": "Ariary malgache",
            "name": "Malagasy Ariary",
            "symbol_native": "MGA",
            "decimal_digits": 0,
            "rounding": 0,
            "code": "MGA",
            "name_plural": "Malagasy Ariaries"
        },
        "MKD": {
            "symbol": "MKD",
            "nombre": "Denar macedonio",
            "name": "Macedonian Denar",
            "symbol_native": "MKD",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "MKD",
            "name_plural": "Macedonian denari"
        },
        "MMK": {
            "symbol": "MMK",
            "nombre": "Kyat birmano",
            "name": "Myanma Kyat",
            "symbol_native": "K",
            "decimal_digits": 0,
            "rounding": 0,
            "code": "MMK",
            "name_plural": "Myanma kyats"
        },
        "MOP": {
            "symbol": "MOP$",
            "nombre": "Macanese Pataca",
            "name": "Macanese Pataca",
            "symbol_native": "MOP$",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "MOP",
            "name_plural": "Macanese patacas"
        },
        "MUR": {
            "symbol": "MURs",
            "nombre": "Rupia de Mauricio",
            "name": "Mauritian Rupee",
            "symbol_native": "MURs",
            "decimal_digits": 0,
            "rounding": 0,
            "code": "MUR",
            "name_plural": "Mauritian rupees"
        },
        "MXN": {
            "symbol": "MX$",
            "nombre": "Peso mexicano",
            "name": "Mexican Peso",
            "symbol_native": "$",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "MXN",
            "name_plural": "Mexican pesos"
        },
        "MYR": {
            "symbol": "RM",
            "nombre": "Ringgit malayo",
            "name": "Malaysian Ringgit",
            "symbol_native": "RM",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "MYR",
            "name_plural": "Malaysian ringgits"
        },
        "MZN": {
            "symbol": "MTn",
            "nombre": "Metical mozambiqueño",
            "name": "Mozambican Metical",
            "symbol_native": "MTn",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "MZN",
            "name_plural": "Mozambican meticals"
        },
        "NAD": {
            "symbol": "N$",
            "nombre": "Dólar namibio",
            "name": "Namibian Dollar",
            "symbol_native": "N$",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "NAD",
            "name_plural": "Namibian dollars"
        },
        "NGN": {
            "symbol": "₦",
            "nombre": "Naira",
            "name": "Nigerian Naira",
            "symbol_native": "₦",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "NGN",
            "name_plural": "Nigerian nairas"
        },
        "NIO": {
            "symbol": "C$",
            "nombre": "Córdoba nicaragüense",
            "name": "Nicaraguan Córdoba",
            "symbol_native": "C$",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "NIO",
            "name_plural": "Nicaraguan córdobas"
        },
        "NOK": {
            "symbol": "Nkr",
            "nombre": "Corona noruega",
            "name": "Norwegian Krone",
            "symbol_native": "kr",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "NOK",
            "name_plural": "Norwegian kroner"
        },
        "NPR": {
            "symbol": "NPRs",
            "nombre": "Rupia nepalí",
            "name": "Nepalese Rupee",
            "symbol_native": "नेरू",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "NPR",
            "name_plural": "Nepalese rupees"
        },
        "NZD": {
            "symbol": "NZ$",
            "nombre": "Dólar neozelandés",
            "name": "New Zealand Dollar",
            "symbol_native": "$",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "NZD",
            "name_plural": "New Zealand dollars"
        },
        "OMR": {
            "symbol": "OMR",
            "nombre": "Rial omaní",
            "name": "Omani Rial",
            "symbol_native": "ر.ع.‏",
            "decimal_digits": 3,
            "rounding": 0,
            "code": "OMR",
            "name_plural": "Omani rials"
        },
        "PAB": {
            "symbol": "B/.",
            "nombre": "Balboa panameño",
            "name": "Panamanian Balboa",
            "symbol_native": "B/.",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "PAB",
            "name_plural": "Panamanian balboas"
        },
        "PEN": {
            "symbol": "S/.",
            "nombre": "Nuevo sol",
            "name": "Peruvian Nuevo Sol",
            "symbol_native": "S/.",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "PEN",
            "name_plural": "Peruvian nuevos soles"
        },
        "PHP": {
            "symbol": "₱",
            "nombre": "Peso filipino",
            "name": "Philippine Peso",
            "symbol_native": "₱",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "PHP",
            "name_plural": "Philippine pesos"
        },
        "PKR": {
            "symbol": "PKRs",
            "nombre": "Rupia pakistaní",
            "name": "Pakistani Rupee",
            "symbol_native": "₨",
            "decimal_digits": 0,
            "rounding": 0,
            "code": "PKR",
            "name_plural": "Pakistani rupees"
        },
        "PLN": {
            "symbol": "zł",
            "nombre": "Zloty",
            "name": "Polish Zloty",
            "symbol_native": "zł",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "PLN",
            "name_plural": "Polish zlotys"
        },
        "PYG": {
            "symbol": "₲",
            "nombre": "Guaraní",
            "name": "Paraguayan Guarani",
            "symbol_native": "₲",
            "decimal_digits": 0,
            "rounding": 0,
            "code": "PYG",
            "name_plural": "Paraguayan guaranis"
        },
        "QAR": {
            "symbol": "QR",
            "nombre": "Riyal qatarí",
            "name": "Qatari Rial",
            "symbol_native": "ر.ق.‏",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "QAR",
            "name_plural": "Qatari rials"
        },
        "RON": {
            "symbol": "RON",
            "nombre": "Leu rumano",
            "name": "Romanian Leu",
            "symbol_native": "RON",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "RON",
            "name_plural": "Romanian lei"
        },
        "RSD": {
            "symbol": "din.",
            "nombre": "Dinar serbio",
            "name": "Serbian Dinar",
            "symbol_native": "дин.",
            "decimal_digits": 0,
            "rounding": 0,
            "code": "RSD",
            "name_plural": "Serbian dinars"
        },
        "RUB": {
            "symbol": "RUB",
            "nombre": "Rublo ruso",
            "name": "Russian Ruble",
            "symbol_native": "руб.",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "RUB",
            "name_plural": "Russian rubles"
        },
        "RWF": {
            "symbol": "RWF",
            "nombre": "Franco ruandés",
            "name": "Rwandan Franc",
            "symbol_native": "FR",
            "decimal_digits": 0,
            "rounding": 0,
            "code": "RWF",
            "name_plural": "Rwandan francs"
        },
        "SAR": {
            "symbol": "SR",
            "nombre": "Riyal saudí",
            "name": "Saudi Riyal",
            "symbol_native": "ر.س.‏",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "SAR",
            "name_plural": "Saudi riyals"
        },
        "SDG": {
            "symbol": "SDG",
            "nombre": "Libra sudanesa",
            "name": "Sudanese Pound",
            "symbol_native": "SDG",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "SDG",
            "name_plural": "Sudanese pounds"
        },
        "SEK": {
            "symbol": "Skr",
            "nombre": "Corona sueca",
            "name": "Swedish Krona",
            "symbol_native": "kr",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "SEK",
            "name_plural": "Swedish kronor"
        },
        "SGD": {
            "symbol": "S$",
            "nombre": "Dólar de Singapur",
            "name": "Singapore Dollar",
            "symbol_native": "$",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "SGD",
            "name_plural": "Singapore dollars"
        },
        "SOS": {
            "symbol": "Ssh",
            "nombre": "Chelín somalí",
            "name": "Somali Shilling",
            "symbol_native": "Ssh",
            "decimal_digits": 0,
            "rounding": 0,
            "code": "SOS",
            "name_plural": "Somali shillings"
        },
        "SYP": {
            "symbol": "SY£",
            "nombre": "Libra siria",
            "name": "Syrian Pound",
            "symbol_native": "ل.س.‏",
            "decimal_digits": 0,
            "rounding": 0,
            "code": "SYP",
            "name_plural": "Syrian pounds"
        },
        "THB": {
            "symbol": "฿",
            "nombre": "Baht tailandés",
            "name": "Thai Baht",
            "symbol_native": "฿",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "THB",
            "name_plural": "Thai baht"
        },
        "TND": {
            "symbol": "DT",
            "nombre": "Dinar tunecino",
            "name": "Tunisian Dinar",
            "symbol_native": "د.ت.‏",
            "decimal_digits": 3,
            "rounding": 0,
            "code": "TND",
            "name_plural": "Tunisian dinars"
        },
        "TOP": {
            "symbol": "T$",
            "nombre": "Pa'anga",
            "name": "Tongan Paʻanga",
            "symbol_native": "T$",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "TOP",
            "name_plural": "Tongan paʻanga"
        },
        "TRY": {
            "symbol": "TL",
            "nombre": "Lira turca",
            "name": "Turkish Lira",
            "symbol_native": "TL",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "TRY",
            "name_plural": "Turkish Lira"
        },
        "TTD": {
            "symbol": "TT$",
            "nombre": "Dólar trinitense",
            "name": "Trinidad and Tobago Dollar",
            "symbol_native": "$",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "TTD",
            "name_plural": "Trinidad and Tobago dollars"
        },
        "TWD": {
            "symbol": "NT$",
            "nombre": "Nuevo dólar taiwanés",
            "name": "New Taiwan Dollar",
            "symbol_native": "NT$",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "TWD",
            "name_plural": "New Taiwan dollars"
        },
        "TZS": {
            "symbol": "TSh",
            "nombre": "Chelín tanzano",
            "name": "Tanzanian Shilling",
            "symbol_native": "TSh",
            "decimal_digits": 0,
            "rounding": 0,
            "code": "TZS",
            "name_plural": "Tanzanian shillings"
        },
        "UAH": {
            "symbol": "₴",
            "nombre": "Grivna",
            "name": "Ukrainian Hryvnia",
            "symbol_native": "₴",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "UAH",
            "name_plural": "Ukrainian hryvnias"
        },
        "UGX": {
            "symbol": "USh",
            "nombre": "Chelín ugandés",
            "name": "Ugandan Shilling",
            "symbol_native": "USh",
            "decimal_digits": 0,
            "rounding": 0,
            "code": "UGX",
            "name_plural": "Ugandan shillings"
        },
        "UYU": {
            "symbol": "$U",
            "nombre": "Peso uruguayo",
            "name": "Uruguayan Peso",
            "symbol_native": "$",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "UYU",
            "name_plural": "Uruguayan pesos"
        },
        "UZS": {
            "symbol": "UZS",
            "nombre": "Som uzbeko",
            "name": "Uzbekistan Som",
            "symbol_native": "UZS",
            "decimal_digits": 0,
            "rounding": 0,
            "code": "UZS",
            "name_plural": "Uzbekistan som"
        },
        "VEF": {
            "symbol": "Bs.F.",
            "nombre": "Bolívar fuerte",
            "name": "Venezuelan Bolívar",
            "symbol_native": "Bs.F.",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "VEF",
            "name_plural": "Venezuelan bolívars"
        },
        "VND": {
            "symbol": "₫",
            "nombre": "Dong vietnamita",
            "name": "Vietnamese Dong",
            "symbol_native": "₫",
            "decimal_digits": 0,
            "rounding": 0,
            "code": "VND",
            "name_plural": "Vietnamese dong"
        },
        "XAF": {
            "symbol": "FCFA",
            "nombre": "Franco CFA de África Central",
            "name": "CFA Franc BEAC",
            "symbol_native": "FCFA",
            "decimal_digits": 0,
            "rounding": 0,
            "code": "XAF",
            "name_plural": "CFA francs BEAC"
        },
        "XOF": {
            "symbol": "CFA",
            "nombre": "Franco CFA de África Occidental",
            "name": "CFA Franc BCEAO",
            "symbol_native": "CFA",
            "decimal_digits": 0,
            "rounding": 0,
            "code": "XOF",
            "name_plural": "CFA francs BCEAO"
        },
        "YER": {
            "symbol": "YR",
            "nombre": "Rial yemení",
            "name": "Yemeni Rial",
            "symbol_native": "ر.ي.‏",
            "decimal_digits": 0,
            "rounding": 0,
            "code": "YER",
            "name_plural": "Yemeni rials"
        },
        "ZAR": {
            "symbol": "R",
            "nombre": "	Rand sudafricano",
            "name": "South African Rand",
            "symbol_native": "R",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "ZAR",
            "name_plural": "South African rand"
        },
        "ZMK": {
            "symbol": "ZK",
            "nombre": "Kwacha zambiano",
            "name": "Zambian Kwacha",
            "symbol_native": "ZK",
            "decimal_digits": 0,
            "rounding": 0,
            "code": "ZMK",
            "name_plural": "Zambian kwachas"
        }
    })

    .value('paisesValue', {
        "BD": "Bangladesh",
        "BE": "Belgium",
        "BF": "Burkina Faso",
        "BG": "Bulgaria",
        "BA": "Bosnia and Herzegovina",
        "BB": "Barbados",
        "WF": "Wallis and Futuna",
        "BL": "Saint Barthelemy",
        "BM": "Bermuda",
        "BN": "Brunei",
        "BO": "Bolivia",
        "BH": "Bahrain",
        "BI": "Burundi",
        "BJ": "Benin",
        "BT": "Bhutan",
        "JM": "Jamaica",
        "BV": "Bouvet Island",
        "BW": "Botswana",
        "WS": "Samoa",
        "BQ": "Bonaire, Saint Eustatius and Saba ",
        "BR": "Brazil",
        "BS": "Bahamas",
        "JE": "Jersey",
        "BY": "Belarus",
        "BZ": "Belize",
        "RU": "Russia",
        "RW": "Rwanda",
        "RS": "Serbia",
        "TL": "East Timor",
        "RE": "Reunion",
        "TM": "Turkmenistan",
        "TJ": "Tajikistan",
        "RO": "Romania",
        "TK": "Tokelau",
        "GW": "Guinea-Bissau",
        "GU": "Guam",
        "GT": "Guatemala",
        "GS": "South Georgia and the South Sandwich Islands",
        "GR": "Greece",
        "GQ": "Equatorial Guinea",
        "GP": "Guadeloupe",
        "JP": "Japan",
        "GY": "Guyana",
        "GG": "Guernsey",
        "GF": "French Guiana",
        "GE": "Georgia",
        "GD": "Grenada",
        "GB": "United Kingdom",
        "GA": "Gabon",
        "SV": "El Salvador",
        "GN": "Guinea",
        "GM": "Gambia",
        "GL": "Greenland",
        "GI": "Gibraltar",
        "GH": "Ghana",
        "OM": "Oman",
        "TN": "Tunisia",
        "JO": "Jordan",
        "HR": "Croatia",
        "HT": "Haiti",
        "HU": "Hungary",
        "HK": "Hong Kong",
        "HN": "Honduras",
        "HM": "Heard Island and McDonald Islands",
        "VE": "Venezuela",
        "PR": "Puerto Rico",
        "PS": "Palestinian Territory",
        "PW": "Palau",
        "PT": "Portugal",
        "SJ": "Svalbard and Jan Mayen",
        "PY": "Paraguay",
        "IQ": "Iraq",
        "PA": "Panama",
        "PF": "French Polynesia",
        "PG": "Papua New Guinea",
        "PE": "Peru",
        "PK": "Pakistan",
        "PH": "Philippines",
        "PN": "Pitcairn",
        "PL": "Poland",
        "PM": "Saint Pierre and Miquelon",
        "ZM": "Zambia",
        "EH": "Western Sahara",
        "EE": "Estonia",
        "EG": "Egypt",
        "ZA": "South Africa",
        "EC": "Ecuador",
        "IT": "Italy",
        "VN": "Vietnam",
        "SB": "Solomon Islands",
        "ET": "Ethiopia",
        "SO": "Somalia",
        "ZW": "Zimbabwe",
        "SA": "Saudi Arabia",
        "ES": "Spain",
        "ER": "Eritrea",
        "ME": "Montenegro",
        "MD": "Moldova",
        "MG": "Madagascar",
        "MF": "Saint Martin",
        "MA": "Morocco",
        "MC": "Monaco",
        "UZ": "Uzbekistan",
        "MM": "Myanmar",
        "ML": "Mali",
        "MO": "Macao",
        "MN": "Mongolia",
        "MH": "Marshall Islands",
        "MK": "Macedonia",
        "MU": "Mauritius",
        "MT": "Malta",
        "MW": "Malawi",
        "MV": "Maldives",
        "MQ": "Martinique",
        "MP": "Northern Mariana Islands",
        "MS": "Montserrat",
        "MR": "Mauritania",
        "IM": "Isle of Man",
        "UG": "Uganda",
        "TZ": "Tanzania",
        "MY": "Malaysia",
        "MX": "Mexico",
        "IL": "Israel",
        "FR": "France",
        "IO": "British Indian Ocean Territory",
        "SH": "Saint Helena",
        "FI": "Finland",
        "FJ": "Fiji",
        "FK": "Falkland Islands",
        "FM": "Micronesia",
        "FO": "Faroe Islands",
        "NI": "Nicaragua",
        "NL": "Netherlands",
        "NO": "Norway",
        "NA": "Namibia",
        "VU": "Vanuatu",
        "NC": "New Caledonia",
        "NE": "Niger",
        "NF": "Norfolk Island",
        "NG": "Nigeria",
        "NZ": "New Zealand",
        "NP": "Nepal",
        "NR": "Nauru",
        "NU": "Niue",
        "CK": "Cook Islands",
        "XK": "Kosovo",
        "CI": "Ivory Coast",
        "CH": "Switzerland",
        "CO": "Colombia",
        "CN": "China",
        "CM": "Cameroon",
        "CL": "Chile",
        "CC": "Cocos Islands",
        "CA": "Canada",
        "CG": "Republic of the Congo",
        "CF": "Central African Republic",
        "CD": "Democratic Republic of the Congo",
        "CZ": "Czech Republic",
        "CY": "Cyprus",
        "CX": "Christmas Island",
        "CR": "Costa Rica",
        "CW": "Curacao",
        "CV": "Cape Verde",
        "CU": "Cuba",
        "SZ": "Swaziland",
        "SY": "Syria",
        "SX": "Sint Maarten",
        "KG": "Kyrgyzstan",
        "KE": "Kenya",
        "SS": "South Sudan",
        "SR": "Suriname",
        "KI": "Kiribati",
        "KH": "Cambodia",
        "KN": "Saint Kitts and Nevis",
        "KM": "Comoros",
        "ST": "Sao Tome and Principe",
        "SK": "Slovakia",
        "KR": "South Korea",
        "SI": "Slovenia",
        "KP": "North Korea",
        "KW": "Kuwait",
        "SN": "Senegal",
        "SM": "San Marino",
        "SL": "Sierra Leone",
        "SC": "Seychelles",
        "KZ": "Kazakhstan",
        "KY": "Cayman Islands",
        "SG": "Singapore",
        "SE": "Sweden",
        "SD": "Sudan",
        "DO": "Dominican Republic",
        "DM": "Dominica",
        "DJ": "Djibouti",
        "DK": "Denmark",
        "VG": "British Virgin Islands",
        "DE": "Germany",
        "YE": "Yemen",
        "DZ": "Algeria",
        "US": "United States",
        "UY": "Uruguay",
        "YT": "Mayotte",
        "UM": "United States Minor Outlying Islands",
        "LB": "Lebanon",
        "LC": "Saint Lucia",
        "LA": "Laos",
        "TV": "Tuvalu",
        "TW": "Taiwan",
        "TT": "Trinidad and Tobago",
        "TR": "Turkey",
        "LK": "Sri Lanka",
        "LI": "Liechtenstein",
        "LV": "Latvia",
        "TO": "Tonga",
        "LT": "Lithuania",
        "LU": "Luxembourg",
        "LR": "Liberia",
        "LS": "Lesotho",
        "TH": "Thailand",
        "TF": "French Southern Territories",
        "TG": "Togo",
        "TD": "Chad",
        "TC": "Turks and Caicos Islands",
        "LY": "Libya",
        "VA": "Vatican",
        "VC": "Saint Vincent and the Grenadines",
        "AE": "United Arab Emirates",
        "AD": "Andorra",
        "AG": "Antigua and Barbuda",
        "AF": "Afghanistan",
        "AI": "Anguilla",
        "VI": "U.S. Virgin Islands",
        "IS": "Iceland",
        "IR": "Iran",
        "AM": "Armenia",
        "AL": "Albania",
        "AO": "Angola",
        "AQ": "Antarctica",
        "AS": "American Samoa",
        "AR": "Argentina",
        "AU": "Australia",
        "AT": "Austria",
        "AW": "Aruba",
        "IN": "India",
        "AX": "Aland Islands",
        "AZ": "Azerbaijan",
        "IE": "Ireland",
        "ID": "Indonesia",
        "UA": "Ukraine",
        "QA": "Qatar",
        "MZ": "Mozambique"
    });