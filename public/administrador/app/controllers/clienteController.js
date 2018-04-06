angular.module("administrador")

    .controller("clienteController", ["$state", "$mdSidenav", "clientesServiceAdmin", "$scope", "pedidosService", "SweetAlert", "$window", "notificacionService", "$base64", function ($state, $mdSidenav, clientesServiceAdmin, $scope, pedidosService, SweetAlert, $window, notificacionService, $base64) {
        var bz = this;
        bz.clientes = [];
        bz.mostrarPedido = false;
        bz.pedidosC = [];
        bz.filtrosActivos;


        /* LISTAR TODOS LOS CLIENTES */

        bz.listarC = function () {
            bz.peticion = true;
            bz.clientes = [];
            bz.mostrarC = !bz.mostrarC;
            bz.mostrarPedido = false;

            clientesServiceAdmin.listarClientes().then(function (res) {
                    if (res != undefined) {
                        angular.forEach(res.data, function (valor, llave) {
                            bz.clientes.push(valor);
                            bz.clientes[llave].estadoE = false;
                        });
                    }
                })
                .catch(function (res) {
                    notificacionService.mensaje(res);
                }).finally(function () {
                    bz.peticion = false;
                });
        };

        bz.listarC();

        /* ELIMINAR CLIENTE */

        bz.eliminarC = function (idCliente, index) {
            bz.peticion = true;
            clientesServiceAdmin.borrarCliente(idCliente).then(function (res) {
                SweetAlert.swal("Bloqueado", "", "success");
                bz.clientes.splice(index, 1);
            }).catch(function (res) {
                notificacionService.mensaje(res);
            }).finally(function () {
                bz.peticion = false;
            });
        };

        /* TODOS LOS PEDIDOS DE UN CLIENTE */

        bz.pedidosCliente = function (id) {
            bz.peticion = true;
            bz.pedidosC = [];
            bz.mostrarPedido = true;

            pedidosService.pedidosCliente(id).then(function (res) {
                bz.pedidosC = res.data;
            }).catch(function (res) {
                bz.mostrarPedido = false;
                notificacionService.mensaje("No existen pedidos de este cliente.");
            }).finally(function () {
                bz.peticion = false;
            });
        };

        /* CAMBIAR ESTADO PEDIDO */

        bz.cambiarEstado = function (id, estado, index) {
            bz.peticion = true;
            pedidosService.cambiarEstado(id, estado).then(function (res) {
                notificacionService.mensaje("Estado Cambiado!");
                bz.pedidosC[index].estado = estado;
                bz.modInit = !bz.modInit;
            }).catch(function (res) {
                notificacionService.mensaje(res);
            }).finally(function () {
                bz.peticion = false;
            });
        };

        bz.modFun = function (i) {
            bz.modfire = i;
            bz.modInit = !bz.modInit;
        };

        bz.base64 = function (icono) {

            return $base64.decode(icono);

        };

    }]);