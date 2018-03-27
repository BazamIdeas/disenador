angular.module("administrador")

    .controller('pedidosController', ["$state", "$mdSidenav", "$mdDialog", '$scope', 'pedidosService', 'SweetAlert', 'notificacionService', '$base64', function ($state, $mdSidenav, $mdMenu, $scope, pedidosService, SweetAlert, notificacionService, $base64) {

        var bz = this;

        /* FILTROS PARA LOS PEDIDOS */

        bz.filtros = {
            estados: [{
                nombre: 'COMPLETADO'
            }, {
                nombre: 'EN ESPERA'
            }, {
                nombre: 'EN PROCESO'
            }, {
                nombre: 'CANCELADO'
            }],
            paises: [],
            planes: [],
            monedas: []
        };

        bz.filtrosActivos;

        /* LISTA DE TODOS LOS PEDIDOS */

        bz.listaP = function () {

            bz.peticion = true;
            bz.elementos = [];
            bz.mostrarP = !bz.mostrarP;
            bz.mostrarD = false;

            pedidosService.listarPedidos().then(function (res) {
                angular.forEach(res.data, function (valor, llave) {
                    bz.elementos.push(valor);
                    bz.elementos[llave].estadoE = false;
                    bz.filtros.planes.push(valor.plan);
                    bz.filtros.monedas.push(valor.moneda);
                    bz.filtros.paises.push(valor.pais);
                })
            }).catch(function () {
                notificacionService.mensaje('No existen pedidos.');
            }).finally(function () {
                bz.peticion = false;
            })
        }

        bz.listaP();



        /* DETALLES DE UN PEDIDO  */

        bz.pedidoDetalles = function (id, index) {
            bz.peticion = true;
            bz.pedidoActivoIndex = index;
            bz.pedidoDetalle = {};

            pedidosService.datosPedido(id).then(function (res) {
                bz.mostrarD = true;
                bz.pedidoDetalle = res.data[0];
            }).catch(function () {
                notificacionService.mensaje('No existen pedidos para este cliente.');
            }).finally(function () {
                bz.peticion = false;
            })
        }


        /* CAMBIAR ESTADO PEDIDO */

        bz.estadoPedidos = ['EN PROCESO', 'EN ESPERA', 'CANCELADO', 'COMPLETADO'];

        bz.cambiarEstado = function (id, estado) {
            bz.peticion = true;
            pedidosService.cambiarEstado(id, estado).then(function () {
                notificacionService.mensaje("Estado Cambiado!");
                bz.elementos[bz.pedidoActivoIndex].estado = estado;
                bz.modInit = !bz.modInit;
            }).catch(function (res) {
                notificacionService.mensaje(res);
            }).finally(function () {
                bz.peticion = false;
            });
        };


        bz.base64 = $base64;

    }])