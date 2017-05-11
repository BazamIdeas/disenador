<div flex layout="row"  layout-margin>
    <div flex="40" class="paneles md-whiteframe-2dp listar">
        <div layout-padding ng-click="cliente.listarC()">
            <h3>Listar Clientes</h3>
        </div>
        <div layout="column" class="content-scroll" ng-show="cliente.mostrarC">
            <div ng-repeat="elemento in cliente.clientes" class="elemento">
                <div>Nombre: {{elemento.nombreCliente}}</div>
                <div>
                    <div>Correo: {{elemento.correo}}</div>
                    <div>Contraseña: {{elemento.pass}}</div>
                    <div>Telefono: {{elemento.telefono}}</div>
                </div>
               <!-- <md-button class="md-primary md-raised" ng-click="cliente.eliminarCliente(elemento.idCliente)">Eliminar</md-button> -->
            </div>
        </div>
    </div>
</div>
