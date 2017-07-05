<div flex layout layout-margin layout-align="none start">

    <!-- LISTAR PEDIDOS -->

    <div flex="60" class="paneles md-whiteframe-2dp listar">
        <div layout-padding ng-click="pedidos.listaP()">
            <h3>Listar Pedidos</h3>
        </div>
        <div ng-show="pedidos.mostrarP">
            <div layout class="elemento">
                <md-input-container flex style="margin-bottom: 0;height: 35px;">
                    <input type="text" ng-model="pedidos.filtrosActivos.$" class="md-block" aria-label="filtro" placeholder="Buscar:">
                </md-input-container>
            </div>
            <div layout class="elemento">
                <div flex="20" style="margin: auto;">Filtrar por: </div>
                <md-input-container flex style="margin:0;">
                    <md-select ng-model="pedidos.filtrosActivos.estado" class="md-block" aria-label="filtro">
                        <md-option ng-value="TODOS" selected>TODOS</md-option>
                        <md-option ng-value="estado.nombre" ng-repeat="estado in pedidos.filtros.estados">{{estado.nombre}}</md-option>
                    </md-select>
                </md-input-container>
                <md-input-container flex style="margin:0;">
                    <md-select ng-model="pedidos.filtrosActivos.pais" class="md-block" aria-label="filtro">
                        <md-option ng-value="TODOS" selected>TODOS</md-option>
                        <md-option ng-value="pais.nombre" ng-repeat="pais in pedidos.filtros.paises">{{pais.nombre}}</md-option>
                    </md-select>
                </md-input-container>
                <md-input-container flex style="margin:0;">
                    <md-select ng-model="pedidos.filtrosActivos.plan" class="md-block" aria-label="filtro">
                        <md-option ng-value="TODOS" selected>TODOS</md-option>
                        <md-option ng-value="plan.nombre" ng-repeat="plan in pedidos.filtros.planes">{{plan.nombre}}</md-option>
                    </md-select>
                </md-input-container>
            </div>
            <div class="tabla">
                <div>Cliente:</div>
                <div>Plan:</div>
                <div>Estado:</div>
                <div>Pais:</div>
                <div>Acciones:</div>
            </div>
            <div layout="column" class="content-scroll">
                <div ng-repeat="elemento in pedidos.elementos | filter:pedidos.filtrosActivos" class="elemento nopadding">
                    <div class="estado-pedido pequeno {{elemento.estado}}"></div>
                    <div class="tabla-campo" layout-padding>
                        <div>{{elemento.nombreCliente}}</div>
                        <div>{{elemento.plan}}</div>
                        <div>{{elemento.estado}}</div>
                        <div>{{elemento.pais}}</div>
                        <div>
                            <md-button class="md-primary md-raised" ng-click="pedidos.pedidoDetalles(elemento.idPedido)">DETALLES</md-button>
                        </div>
                    </div>
                </div>
                <div ng-if="pedidos.elementos.lenght == 0" class="mensaje-resultado">
                    <h3>NO SE ENCONTRARON PEDIDOS</h3>
                </div>
            </div>
        </div>
    </div>

    <!-- DETALLES PEDIDOS -->

    <div flex="35" class="paneles md-whiteframe-2dp listar" ng-show="pedidos.mostrarD">
        <div layout-padding>
            <h3>DETALLES</h3>
        </div>
        <div layout="column" class="content-scroll">
            <div ng-repeat="pedido in pedidos.pedidoDetalle" class="elemento nopadding">
                <div class="estado-pedido {{pedido.estado}}"></div>
                <div layout layout-align="space-arund" layout-wrap class="datos-elemento" layout-padding>
                    <div flex="45"><b>Cliente:</b> {{pedido.nombreCliente}}</div>
                    <div flex="45"><b>Fecha:</b> {{pedido.fecha | date : shortDate }}</div>
                    <div flex="45"><b>Correo:</b> {{pedido.correo}}</div>
                    <div flex="45"><b>Telefono:</b> {{pedido.telefono}}</div>
                    <div flex="45"><b>Estado:</b> {{pedido.estado}}</div>
                    <div flex="45"><b>Plan:</b> {{pedido.plan}}</div>
                    <div flex="45"><b>Precio:</b> {{pedido.precio}}</div>
                    <div flex="45"><b>Pais:</b> {{pedido.pais}}</div>
                    <div flex="45"><b>Moneda:</b> {{pedido.moneda}}</div>
                    <div flex="45"><b>Categoria:</b> {{pedido.nombreCategoria}}</div>
                </div>
                <div layout layout-padding>
                    <md-input-container class="md-block" flex="50">
                        <label>CAMBIAR ESTADO</label>
                        <md-select ng-model="pedido.estado" aria-label="estado">
                            <md-option ng-click="pedidos.cambiarEstado(pedido.idPedido, 'COMPLETADO')" value="COMPLETADO">
                                COMPLETADO
                            </md-option>

                            <md-option ng-click="pedidos.cambiarEstado(pedido.idPedido, 'EN ESPERA')" value="EN ESPERA">
                                EN ESPERA
                            </md-option>
                            <md-option ng-click="pedidos.cambiarEstado(pedido.idPedido, 'CANCELADO')" value="CANCELADO">
                                CANCELADO
                            </md-option>
                            
                            <md-option ng-click="pedidos.cambiarEstado(pedido.idPedido, 'EN PROCESO')" value="EN PROCESO">
                                EN PROCESO
                            </md-option>
                        </md-select>
                    </md-input-container>
                </div>
            </div>
        </div>
    </div>
</div>
