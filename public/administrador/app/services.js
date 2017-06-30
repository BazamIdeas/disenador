angular.module("administrador")

/* SERVICIO DE LOGIN */

.service('clientesService', ['$http', '$q', '$window', '$rootScope', function ($http, $q, $window, $rootScope) {


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

                $window.localStorage.setItem('bzToken', JSON.stringify(res.data));
                $rootScope.objectoCliente = res.data;

                defered.resolve();

            })
            .catch(function (res) {
                $window.localStorage.removeItem('bzToken');
                defered.reject()
            })


        return promise;

    }

    this.autorizado = function () {

        if ($rootScope.objectoCliente) {

            return $rootScope.objectoCliente;

        } else {

            if ($window.localStorage.getItem('bzToken')) {

                $rootScope.objectoCliente = JSON.parse($window.localStorage.getItem('bzToken'));

                return $rootScope.objectoCliente;

            } else {

                return false;

            }

        }

    }

    this.salir = function () {

        $rootScope.objectoCliente = false;
        $window.localStorage.removeItem('bzToken');

    }

    this.modificarU = function (datos) {

        var defered = $q.defer();

        var promise = defered.promise;

        datos.idUsuario = 1;

        $http.post("/app/usuario/modificar", datos).then(function (res) {

                defered.resolve(res);

            })
            .catch(function (res) {

                defered.reject(res);
            })

        return promise;


    }


}])

/* SERVICIO PARA PROCESO DE CLIENTES */

.service('clientesServiceAdmin', ['$http', '$q', function ($http, $q) {

    /* MODULO DE CLIENTES */
    this.listarClientes = $http.get('/app/clientes');

    this.borrarCliente = function (id) {

        var defered = $q.defer();

        var promise = defered.promise;

        $http.post('/app/cliente/borrar/' + id).then(function (res) {

            defered.resolve(res);

        }).catch(function (res) {

            defered.reject(res);

        })

        return promise;
    }

    /* MODULO DE USUARIOS */

    this.listarUsuarios = $http.get('/app/usuarios');

}])


/* SERVICIO PARA PROCESO DE ICONOS */

.service('iconosService', ['$http', function ($http) {


}])

/* SERVICIO PARA PROCESO DE PEDIDOS */


.service('pedidosService', ['$http', function ($http, $q) {

    this.listarPedidos = $http.get('/app/pedidos');

    this.datosPedido = function (id) {

        return $http.get('/app/pedido/' + id);
    }

    this.pedidosCliente = function (id) {
        return $http.get('/app/pedidos/cliente/' + id)
    }

    this.cambiarEstado = function (id, estadoP) {

        var datos = {
            idPedido: id,
            estado: estadoP,
        }

        return $http.post('/app/pedido/cambiar/', datos);
    }


}])

/* SERVICIO PARA PROCESO DE CATEGORIAS */


.service('categoriasService', ['$http', function ($http, $q) {
    
    /* CATEGORIAS */

    this.listarCategorias = $http.get("/app/categorias");

    this.modificarCategoria = function (datos) {
        return $http.post('app/categoria/modificar/', datos);
    }

    this.nuevaCategoria = function (datos) {
        return $http.post('app/categoria', datos);
    }
    
    /* PREFERENCIAS */

    this.listarPreferencias = $http.get("/app/preferencias");

    this.modificarPreferencia = function (datos) {
        return $http.post('app/preferencia/modificar/', datos);
    }

    this.nuevaPreferencia = function (datos) {
        return $http.post('app/preferencia', datos);
    }

}])


.factory('AuthInterceptor', function ($window, $q, $rootScope) {
    function salir() {
        $rootScope.objectoCliente = false;
        $window.localStorage.removeItem('bzToken');
    }

    function autorizado() {
        if ($rootScope.objectoCliente) {
            return $rootScope.objectoCliente;
        } else {
            if ($window.localStorage.getItem('bzToken')) {
                $rootScope.objectoCliente = JSON.parse($window.localStorage.getItem('bzToken'));
                return $rootScope.objectoCliente;
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
            if (response.status === 401 || response.status === 403) {
                salir();
            }
            return response || $q.when(response);
        }
    };
});
