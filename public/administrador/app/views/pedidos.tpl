<div flex layout="row" layout-margin>
    <div flex="40" class="paneles md-whiteframe-2dp listar">
        <div layout-padding ng-click="pedidos.listaP()">
            <h3>Listar Pedidos</h3>
        </div>
        <div layout="column" class="content-scroll" ng-show="pedidos.mostrarP">
            <div layout class="elemento">
                <div flex="30" style="margin: auto;">Filtrar por: </div>
                <md-input-container flex  style="margin:0;">
                    <md-select ng-model="pedidos.filtroPedido" name="filtro" class="md-block" >
                        <md-option ng-value="filtro.nombre" ng-repeat="filtro in pedidos.filtros">{{filtro.nombre}}</md-option>
                    </md-select>
                </md-input-container>
            </div>
            <div ng-repeat="elemento in pedidos.elementos" class="elemento">
                <div>{{elemento}}</div>
                <md-button class="md-primary md-raised" ng-click="cliente.eliminarCliente(elemento.idCliente)">Eliminar</md-button>
            </div>
        </div>
    </div>
</div>
