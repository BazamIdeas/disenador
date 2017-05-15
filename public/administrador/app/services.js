angular.module("administrador")

/* SERVICIO DE AUTENTIFICACION  */
.factory("Auth", ["$firebaseAuth",
                      function ($firebaseAuth) {
        return $firebaseAuth();
                      }])

/* SERVICIO DE LOGIN */
.service('loginService', ['$http', 'Auth', '$q', function ($http, Auth, $q) {

    this.registrar = function (datos) {

        var defered = $q.defer();

        var promise = defered.promise;

        Auth.$createUserWithEmailAndPassword(datos.correo, datos.pass)
            .then(function (firebaseUser) {

                datos.uid = firebaseUser.uid;

                $http.post("/app/cliente", datos).then(function (res) {

                        defered.resolve(res);

                    })
                    .catch(function (res) {

                        defered.reject(res);
                    })


            }).catch(function (res) {
                defered.reject(res)
            });

        return promise;


    }

    this.login = function (metodo, datos = false) {

        var defered = $q.defer();

        var promise = defered.promise;


        Auth.$signInWithEmailAndPassword(datos.correo, datos.pass).then(function (firebaseUser) {

            defered.resolve(firebaseUser);

        })

        .catch(function (res) {

            defered.reject(res);

        })

        return promise;

    }


    this.salir = function () {

        Auth.$signOut()

    }

}])

/* SERVICIO PARA PROCESO DE CLIENTES */

.service('clientesService', ['$http', function ($http) {

    this.listarClientes = $http.get('/app/clientes');

    this.borrarCliente = function (id) {

        return $http.get('/app/cliente/borrar/' + id)

        .then(function (res) {

                console.log(res);

            })
            .catch(function (res) {
                console.log(res);
            });

    }

}])


/* SERVICIO PARA PROCESO DE ICONOS */

.service('iconosService', ['$http', function ($http) {
    

}])

/* SERVICIO PARA PROCESO DE PEDIDOS */


.service('pedidosService', ['$http', function ($http) {

    this.listarPedidos = $http.get('/app/pedidos/');

    this.pedidoEspecifico = function (id) {

        return $http.get('/app/pedido/' + id)

        .then(function (res) {

                console.log(res);

            })
            .catch(function (res) {
                console.log(res);
            });

    }

    this.pedidosCliente = function (id) {

        return $http.get('/app/pedidosCliente/' + id)

        .then(function (res) {

                console.log(res);

            })
            .catch(function (res) {
                console.log(res);
            });

    }



}])


/*-------------------------- Services --------------------------*/
