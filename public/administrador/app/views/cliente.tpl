<div flex layout="row" layout-margin layout-align="none start">
    <div flex="50" class="paneles principal md-whiteframe-2dp listar">
        <div layout-padding ng-click="cliente.listarC()">
            <h3>Listar Clientes</h3>
        </div>
        <div class="tabla" ng-show="cliente.mostrarC">
            <div>Nombre:</div>
            <div>Correo:</div>
            <div>Telefono:</div>
            <div>Acciones:</div>
        </div>
        <div layout="column" class="content-scroll" ng-show="cliente.mostrarC">
            <div layout layout-align="center" ng-show="cliente.loaderMostrar" class="margen_superior">
                <md-progress-circular md-mode="indeterminate" md-diameter="40"></md-progress-circular>
            </div>
            <div ng-repeat="elemento in cliente.clientes" class="elemento">
                <div class="tabla-campo">
                    <div class="nombre">{{elemento.nombreCliente}}</div>
                    <div>{{elemento.correo}}</div>
                    <div>{{elemento.telefono}}</div>
                    <div>
                        <md-button class="md-primary md-raised" ng-click="cliente.pedidosCliente(elemento.idCliente, $index)">Pedidos</md-button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div flex="40" class="paneles md-whiteframe-2dp listar" ng-show="cliente.mostrarPedido">
        <div layout-padding ng-click="">
            <h3>Pedidos del Cliente</h3>
        </div>
        <div layout="column" class="content-scroll">
            <div ng-repeat="pedido in cliente.pedidosC" class="elemento">
                <div layout layout-align="space-arund" layout-wrap class="datos-elemento">
                    <div flex="45"><b>Cliente:</b> {{pedido.nombreCliente}}</div>
                    <div flex="45"><b>Telefono:</b> {{pedido.telefono}}</div>
                    <div flex="45"><b>Estado:</b> {{pedido.estado}}</div>
                    <div flex="45"><b>Plan:</b> {{pedido.plan}}</div>
                    <div flex="45"><b>Precio:</b> {{pedido.precio}}</div>
                    <div flex="45"><b>Pais:</b> {{pedido.pais}}</div>
                    <div flex="45"><b>Moneda:</b> {{pedido.moneda}}</div>
                    <div flex="45"><b>Fecha:</b> {{ pedido.fecha | date : shortDate}}</div>
                </div>
                <div layout>
                    <md-input-container class="md-block" flex="50">
                        <label>CAMBIAR ESTADO</label>
                        <md-select ng-model="pedido.estado" aria-label="estado">
                            <md-option ng-click="cliente.cambiarEstado(pedido.idPedido, 'COMPLETADO')" value="COMPLETADO">
                                COMPLETADO
                            </md-option>

                            <md-option ng-click="cliente.cambiarEstado(pedido.idPedido, 'EN ESPERA')" value="EN ESPERA">
                                EN ESPERA
                            </md-option>
                        </md-select>
                    </md-input-container>
                </div>
            </div>

            <div ng-show="cliente.validarP" class="mensaje-resultado pequeno">
                <h3>NO SE ENCONTRARON PEDIDOS</h3>
            </div>
        </div>
    </div>
</div>
