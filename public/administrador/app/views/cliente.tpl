<div flex layout="row" layout-margin layout-align="space-around start">
    <div flex="40" class="paneles md-whiteframe-2dp listar">
        <div layout-padding ng-click="cliente.listarC()">
            <h3>Listar Clientes</h3>
        </div>
        <div layout="column" class="content-scroll" ng-show="cliente.mostrarC">
            
            <div layout layout-align="center" ng-show="cliente.loaderMostrar" class="margen_superior">
                <md-progress-circular md-mode="indeterminate" md-diameter="40"></md-progress-circular>
            </div>
            
            <div ng-repeat="elemento in cliente.clientes" class="elemento">
                <div>Nombre: {{elemento.nombreCliente}}</div>
                <div>
                    <div>Correo: {{elemento.correo}}</div>
                    <div>Contraseña: {{elemento.pass}}</div>
                    <div>Telefono: {{elemento.telefono}}</div>
                </div>
                <div layout-padding>
                    <div flex="60" layout layout-align="space-around">
                        <md-button class="md-primary md-raised" ng-click="(elemento.idCliente)">Eliminar</md-button>
                        <md-button class="md-primary md-raised" ng-click="cliente.pedidoCliente(elemento.idCliente)">Pedidos</md-button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div flex="40" class="paneles md-whiteframe-2dp listar" ng-show="cliente.mostrarPedido">
        <div layout-padding ng-click="">
            <h3>Pedido Cliente</h3>
        </div>
        <div layout="column" class="content-scroll">
            PEDIDOS DEL CLIENTE
        </div>
    </div>
</div>
