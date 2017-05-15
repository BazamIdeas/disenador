angular.module("administrador")

/* header */

.controller('headerController', ["$state", "$mdSidenav", "$mdDialog", '$scope', 'Auth', 'SweetAlert', 'loginService', function ($state, $mdSidenav, $mdMenu, $scope, Auth, SweetAlert, loginService) {

    var bz = this;


    this.salir = function () {
        SweetAlert.swal("Has cerrado sesion", "Vuelve pronto!", "success");
        loginService.salir();
        $state.go('login');
    }

    bz.autorizado = Auth.$getAuth();

    Auth.$onAuthStateChanged(function (firebaseUser) {
        bz.autorizado = firebaseUser;
    });

    bz.hmenuMostrar = false;

}])

.controller('sidenavController', ["$state", "$mdSidenav", "$mdDialog", '$scope', 'Auth', function ($state, $mdSidenav, $mdDialog, $scope, Auth) {

    var bz = this;

    bz.autorizado = Auth.$getAuth();

    Auth.$onAuthStateChanged(function (firebaseUser) {
        bz.autorizado = firebaseUser;
    });

    bz.cambiarMenu = function (lugar) {

        return $mdSidenav('left').toggle();
    }

}])

.controller('clienteController', ["$state", "$mdSidenav", "clientesService", '$scope', function ($state, $mdSidenav, clientesService, $scope) {
    var bz = this;

    bz.clientes = [];

    bz.listarC = function () {

        if (!bz.mostrarC) {
            bz.mostrarC = true;
        } else {
            bz.mostrarC = false;
        }

        clientesService.listarClientes.then(function (res) {
            angular.forEach(res.data, function (valor, llave) {
                bz.clientes.push(valor);

            })
            console.log(bz.clientes)
        })
    }

    bz.eliminarC = function (idCliente) {

        clientesService.borrarCliente(idCliente).then(function (res) {
            console.log(res)
        })
    }

}])

.controller('iconosController', ["$state", "$mdSidenav", "$mdDialog", '$scope', function ($state, $mdSidenav, $mdMenu, $scope) {

    var bz = this;



}])


.controller('administrarController', ["$state", "$mdSidenav", "$mdDialog", '$scope', function ($state, $mdSidenav, $mdMenu, $scope) {

    var bz = this;



}])

.controller('pedidosController', ["$state", "$mdSidenav", "$mdDialog", '$scope', 'pedidosService', function ($state, $mdSidenav, $mdMenu, $scope, pedidosService) {

    var bz = this;
    bz.elementos = [];

    bz.mostrarP = false;

    bz.listaP = function (id) {
        if (!bz.mostrarP) {
            bz.mostrarP = true;
        } else {
            bz.mostrarP = false;
        }


        pedidosService.listarPedidos.then(function (res) {
            angular.forEach(res.data, function (valor, llave) {
                bz.elementos.push(valor);

            })
            console.log(bz.elementos)
        })
    }

}])

.controller('fuentesController', ["$state", "$mdSidenav", "$mdDialog", '$scope', function ($state, $mdSidenav, $mdMenu, $scope) {

    var bz = this;



}])

.controller('loginController', ['$scope', '$http', '$rootScope', '$state', "$stateParams", "loginService", "SweetAlert", function ($scope, $http, $rootScope, $state, $stateParams, loginService, SweetAlert) {

    var bz = this;

    this.datos = {

        registrar: {},
        login: {}

    };

    bz.loaderCargando = false;
    this.registrar = function (datos) {

        /*  Auth.$createUserWithEmailAndPassword(datos.correo, datos.pass)
              .then(function (firebaseUser) {

                  console.error(firebaseUser);

              }).catch(function (error) {
                  console.error(error);
              });
              */


        bz.loaderCargando = true;
        loginService.registrar(datos).then(function (res) {
            console.log(res + 'funciono')
        })

        .catch(function (res) {

            SweetAlert.swal("Error al registrar", "Revisa tu conexion a internet!", "error");

        })

    }


    this.login = function (metodo, datos, valido) {
        if (valido) {
            bz.loaderCargando = true;
            loginService.login(metodo, datos).then(function (res) {


                if ($stateParams.destino) {

                    if ($stateParams.origen == "editor" && $stateParams.destino == "metodo") {

                        $state.go($stateParams.destino, $stateParams.parametrosDestino);

                    } else {

                        $state.go($stateParams.destino);
                    }

                } else {
                    SweetAlert.swal({
                            title: "Te has logueado con Exito", //Bold text
                            type: "success", //type -- adds appropiriate icon
                            showCancelButton: false, // displays cancel btton
                            confirmButtonColor: "#283593",
                            confirmButtonText: "Aceptar",
                            closeOnConfirm: true
                        },
                        function (isConfirm) { //Function that triggers on user action.
                            if (isConfirm) {
                                $state.go('cliente')
                            }
                        })
                }

            }).catch(function (res) {
                SweetAlert.swal("Error al ingresar", "Revisa tu conexion a internet!", "error");
                console.error("Authentication failed:", res);

            })
        }

    }

    this.mostrarForm = 1;



}])

.controller('usuariosController', ["$state", "$mdSidenav", "$mdDialog", '$scope', function ($state, $mdSidenav, $mdMenu, $scope) {

    var bz = this;



}])