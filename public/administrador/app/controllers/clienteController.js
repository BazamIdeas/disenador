angular.module("administrador")

    .controller('clienteController', ["$state", "$mdSidenav", "clientesServiceAdmin", '$scope', 'pedidosService', 'SweetAlert', '$window', 'notificacionService', "$base64", function ($state, $mdSidenav, clientesServiceAdmin, $scope, pedidosService, SweetAlert, $window, notificacionService, $base64) {
        var bz = this;
        bz.clientes = [];
        bz.mostrarPedido = false;
        bz.pedidosC = [];
        bz.filtrosActivos;


        /* LISTAR TODOS LOS CLIENTES */

        bz.listarC = function () {
            var elementosLista = document.querySelectorAll('.lista .elemento.true');
            for (i = 0; i < elementosLista.length; i++) {
                elementosLista[i].classList.remove('true');
            }

            bz.clientes = [];
            bz.mostrarC = !bz.mostrarC;
            bz.mostrarPedido = false;

            clientesServiceAdmin.listarClientes().then(function (res) {
                    if (res != undefined) {
                        angular.forEach(res.data, function (valor, llave) {
                            bz.clientes.push(valor);
                            bz.clientes[llave].estadoE = false;
                        })
                    }
                })
                .catch(function (res) {
                    notificacionService.mensaje(res);
                })
        }

        bz.listarC()

        /* ELIMINAR CLIENTE */

        bz.eliminarC = function (idCliente, index) {
            clientesServiceAdmin.borrarCliente(idCliente).then(function (res) {
                SweetAlert.swal("Bloqueado", "", "success");
                bz.clientes.splice(index, 1);
            }).catch(function (res) {
                notificacionService.mensaje(res);
            })
        }

        /* TODOS LOS PEDIDOS DE UN CLIENTE */

        bz.pedidosCliente = function (id, index) {
            bz.pedidosC = [];
            bz.mostrarPedido = true;

            pedidosService.pedidosCliente(id).then(function (res) {
                angular.forEach(res.data, function (valor) {
                    bz.pedidosC.push(valor);
                })
                
                bz.validarP = false;
            }).catch(function (res) {
                bz.validarP = true;
                notificacionService.mensaje('No existen pedidos de este cliente.');
            })
        }

        /* CAMBIAR ESTADO PEDIDO */

        bz.cambiarEstado = function (id, estado, index) {
            pedidosService.cambiarEstado(id, estado).then(function (res) {
                notificacionService.mensaje('Estado Cambiado!');
                bz.pedidosC[index].estado = estado;
                bz.modInit = !bz.modInit;
            }).catch(function (res) {
                notificacionService.mensaje(res);
            })
        }

        bz.activar = function (event) {
            var elementosLista = document.querySelectorAll('.lista .elemento.true');
            var elementoActual = event.currentTarget;

            for (i = 0; i < elementosLista.length; i++) {
                elementosLista[i].classList.remove('true');
            }

            elementoActual.classList.add('true');
        }

        bz.modFun = function (i) {
            bz.modfire = i;
            bz.modInit = !bz.modInit;
        }

        bz.base64 = function (icono) {

            return $base64.decode(icono);

        }


    }])