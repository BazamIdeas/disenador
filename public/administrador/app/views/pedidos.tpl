<div flex layout="row" layout-margin>
    <div flex="40" class="paneles md-whiteframe-2dp listar">
        <div layout-padding ng-click="pedidos.listaP()">
            <h3>Listar Pedidos</h3>
        </div>
        <div layout="column" class="content-scroll" ng-show="pedidos.mostrarP"> 
            <div ng-repeat="elemento in pedidos.elementos" class="elemento">
                <div>Nombre: {{elemento}}</div>
                <!-- <md-button class="md-primary md-raised" ng-click="cliente.eliminarCliente(elemento.idCliente)">Eliminar</md-button> -->
            </div>
        </div>
    </div>
</div>
