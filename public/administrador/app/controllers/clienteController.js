angular.module("administrador")

    .controller("clienteController", ["clientesServiceAdmin", "$scope", "pedidosService", "notificacionService", "$base64", function (clientesServiceAdmin, $scope, pedidosService, notificacionService, $base64) {
        var bz = this;
        bz.filtrosActivos;
        bz.peticion = true;

        /* LISTAR TODOS LOS CLIENTES */

        clientesServiceAdmin.listarClientes().then(function (res) {
            if (res != undefined) bz.clientes = res.data;
        }).catch(function (res) {
            notificacionService.mensaje(res);
        }).finally(function () {
            bz.peticion = false;
        });


        /* TODOS LOS PEDIDOS DE UN CLIENTE */

        bz.pedidosCliente = function (id) {

            bz.peticion = true;

            pedidosService.pedidosCliente(id).then(function (res) {
                
                bz.pedidosC = res.data;
                bz.mostrarPedido = true;
            }).catch(function () {
                bz.mostrarPedido = false;
                notificacionService.mensaje("No existen pedidos de este cliente.");
            }).finally(function () {
                bz.peticion = false;
            });
        };

        /* CAMBIAR ESTADO PEDIDO */

        bz.estadoPedidos = ['EN PROCESO', 'EN ESPERA', 'CANCELADO', 'COMPLETADO'];

        bz.cambiarEstado = function (id, estado, index) {
            bz.peticion = true;
            pedidosService.cambiarEstado(id, estado).then(function () {
                notificacionService.mensaje("Estado Cambiado!");
                bz.pedidosC[index].estado = estado;
                bz.modInit = !bz.modInit;
            }).catch(function (res) {
                notificacionService.mensaje(res);
            }).finally(function () {
                bz.peticion = false;
            });
        };

        /* ELIMINAR CLIENTE 

        bz.eliminarC = function (idCliente, index) {
            bz.peticion = true;
            clientesServiceAdmin.borrarCliente(idCliente).then(function (res) {
                bz.clientes.splice(index, 1);
            }).catch(function (res) {
                notificacionService.mensaje(res);
            }).finally(function () {
                bz.peticion = false;
            });
        };

        */

        bz.base64 = function (icono) {

            return $base64.decode(icono);

        };

    }]);