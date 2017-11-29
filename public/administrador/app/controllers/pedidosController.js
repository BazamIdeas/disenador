angular.module("administrador")

    .controller('pedidosController', ["$state", "$mdSidenav", "$mdDialog", '$scope', 'pedidosService', 'SweetAlert', 'notificacionService', function ($state, $mdSidenav, $mdMenu, $scope, pedidosService, SweetAlert, notificacionService) {

        var bz = this;
        bz.elementos = [];
        bz.pedidoDetalle = [];

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
            paises: [{
                nombre: 'Venezuela'
            }, {
                nombre: 'Chile'
            }, {
                nombre: 'Ecuador'
            }],
            planes: [{
                nombre: 'Plan Basico'
            }, {
                nombre: 'Plan Premium'
            }, {
                nombre: 'Plan Comodo'
            }]
        };

        bz.filtrosActivos;

        /* LISTA DE TODOS LOS PEDIDOS */

        bz.listaP = function () {
            var elementosLista = document.querySelectorAll('.lista .elemento.true');
            for (i = 0; i < elementosLista.length; i++) {
                elementosLista[i].classList.remove('true');
            }

            bz.elementos = [];
            bz.mostrarP = !bz.mostrarP;
            bz.mostrarD = false

            pedidosService.listarPedidos().then(function (res) {
                angular.forEach(res.data, function (valor, llave) {
                    bz.elementos.push(valor);
                    bz.elementos[llave].estadoE = false;
                })

            }).catch(function () {
                bz.valPedidos = true;
                notificacionService.mensaje('No existen pedidos.');
            })
        }

        bz.listaP();



        /* DETALLES DE UN PEDIDO  */

        bz.pedidoDetalles = function (id, index) {

            bz.pedidoActivoIndex = index;

            bz.mostrarD = true;
            bz.pedidoDetalle = [];
            pedidosService.datosPedido(id).then(function (res) {
                angular.forEach(res.data, function (valor, llave) {
                    bz.pedidoDetalle.push(valor);
                })
            }).catch(function (res) {
                notificacionService.mensaje('No existen pedidos para este cliente.');
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


        /* CAMBIAR ESTADO PEDIDO */

        bz.cambiarEstado = function (id, estado, index) {
            pedidosService.cambiarEstado(id, estado).then(function (res) {
                notificacionService.mensaje('Estado Cambiado');
                bz.pedidoDetalle[index].estado = estado;
                bz.elementos[bz.pedidoActivoIndex].estado = estado;
            })
        }

    }])