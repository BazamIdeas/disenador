<div flex layout="row" layout-margin layout-align="none start">
    <div flex="50" class="paneles principal md-whiteframe-2dp listar">
        <div layout layout-align="space-between center" layout-padding>
            <h3 flex ng-click="cliente.listarC()">LISTAR CLIENTES</h3>
            <md-button ng-click="cliente.mostrarC = false" style="margin:0;">
                <md-icon>keyboard_arrow_left</md-icon>
            </md-button>
        </div>
        <div ng-show="cliente.mostrarC">
            <div layout class="elemento">
                <md-input-container flex style="margin-bottom: 0;height: 35px;">
                    <input type="text" ng-model="cliente.buscar" class="md-block" aria-label="filtro" placeholder="Buscar:">
                </md-input-container>
            </div>
            <div class="tabla">
                <div>Nombre:</div>
                <div>Correo:</div>
                <div>Telefono:</div>
                <div>Acciones:</div>
            </div>
            <div layout="column" class="content-scroll">
                <div layout layout-align="center" ng-show="cliente.loaderMostrar" class="margen_superior">
                    <md-progress-circular md-mode="indeterminate" md-diameter="40"></md-progress-circular>
                </div>
                <div ng-repeat="elemento in cliente.clientes | filter:cliente.buscar" class="elemento">
                    <div class="tabla-campo">
                        <div class="nombre">{{elemento.nombreCliente}}</div>
                        <div>{{elemento.correo}}</div>
                        <div>{{elemento.telefono}}</div>
                        <div>
                            <md-button class="md-primary md-raised" ng-click="cliente.pedidosCliente(elemento.idCliente)">Pedidos</md-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div flex="40" class="paneles md-whiteframe-2dp listar" ng-show="cliente.mostrarPedido">
        <div layout layout-align="space-between center" layout-padding>
            <h3>PEDIDOS CLIENTE</h3>
            <md-button ng-click="cliente.mostrarPedido = false" style="margin:0;">
                <md-icon>keyboard_arrow_left</md-icon>
            </md-button>
        </div>
        <div layout="column" class="content-scroll">
            <div ng-repeat="pedido in cliente.pedidosC" class="elemento nopadding">
                <div class="estado-pedido {{pedido.estado}}"></div>
                <div layout layout-align="space-arund" layout-wrap class="datos-elemento" layout-padding>
                    <div flex="45"><b>Cliente:</b> {{pedido.nombreCliente}}</div>
                    <div flex="45"><b>Telefono:</b> {{pedido.telefono}}</div>
                    <div flex="45"><b>Estado:</b> {{pedido.estado}}</div>
                    <div flex="45"><b>Plan:</b> {{pedido.plan}}</div>
                    <div flex="45"><b>Precio:</b> {{pedido.precio}}</div>
                    <div flex="45"><b>Pais:</b> {{pedido.pais}}</div>
                    <div flex="45"><b>Moneda:</b> {{pedido.moneda}}</div>
                    <div flex="45"><b>Fecha:</b> {{ pedido.fecha | date : shortDate}}</div>
                </div>
                <div layout layout-padding>
                    <md-input-container class="md-block" flex="50">
                        <label>CAMBIAR ESTADO</label>
                        <md-select ng-model="cliente.estado" aria-label="estado">
                            <md-option ng-click="cliente.cambiarEstado(pedido.idPedido, 'COMPLETADO')" value="COMPLETADO">
                                COMPLETADO
                            </md-option>

                            <md-option ng-click="cliente.cambiarEstado(pedido.idPedido, 'EN ESPERA')" value="EN ESPERA">
                                EN ESPERA
                            </md-option>
                            <md-option ng-click="cliente.cambiarEstado(pedido.idPedido, 'CANCELADO')" value="CANCELADO">
                                CANCELADO
                            </md-option>

                            <md-option ng-click="cliente.cambiarEstado(pedido.idPedido, 'EN PROCESO')" value="EN PROCESO">
                                EN PROCESO
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
