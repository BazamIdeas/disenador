angular.module("administrador")

    .controller('pedidosController', ["$state", "$mdSidenav", "$mdDialog", '$scope', 'pedidosService', 'SweetAlert', 'notificacionService', '$base64', function ($state, $mdSidenav, $mdMenu, $scope, pedidosService, SweetAlert, notificacionService, $base64) {

        var bz = this;
        bz.elementos = [];

        bz.base64 = function (icono) {

            return $base64.decode(icono);

        }

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
            bz.mostrarD = false

            pedidosService.listarPedidos().then(function (res) {
                angular.forEach(res.data, function (valor, llave) {
                    bz.elementos.push(valor);
                    bz.elementos[llave].estadoE = false;
                    bz.filtros.planes.push(valor.plan);
                    bz.filtros.monedas.push(valor.moneda);
                    bz.filtros.paises.push(valor.pais);
                })
            }).catch(function () {
                bz.valPedidos = true;
                notificacionService.mensaje('No existen pedidos.');
            }).finally(function () {
                bz.peticion = false;
            })
        }

        bz.listaP();



        /* DETALLES DE UN PEDIDO  */

        bz.pedidoDetalles = function (id, index) {
            bz.peticion = true;
            bz.ac = id;
            bz.pedidoActivoIndex = index;
            bz.pedidoDetalle = {};
            bz.mostrarD = true;

            pedidosService.datosPedido(id).then(function (res) {
                bz.pedidoDetalle = res.data[0];
            }).catch(function () {
                notificacionService.mensaje('No existen pedidos para este cliente.');
            }).finally(function () {
                bz.peticion = false;
            })
        }

        /* CAMBIAR ESTADO PEDIDO */

        bz.cambiarEstado = function (id, estado) {
            bz.peticion = true;
            pedidosService.cambiarEstado(id, estado).then(function () {
                bz.modInit = !bz.modInit;
                notificacionService.mensaje('Estado Cambiado');
                bz.pedidoDetalle.estado = estado;
                bz.elementos[bz.pedidoActivoIndex].estado = estado;

            }).finally(function () {
                bz.peticion = false;
            })
        }

    }])