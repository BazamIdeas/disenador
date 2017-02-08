<div flex layout="column">
    <div layout="row" layout-align="center space-between" id="popupContainer">
        <h3 flex="70">ELIJA LOS DISEÑOS Y LAS FUENTES QUE DESEA USAR</h3>
        <md-fab-speed-dial flex="20" md-open="false" md-direction="left" ng-class="opciones.modoSeleccionado" ng-click="opciones.estado=true">
            <md-fab-trigger>
                <md-button aria-label="menu" class="md-fab md-warn">
                    <md-icon>build</md-icon>
                </md-button>
            </md-fab-trigger>
            <md-fab-actions>
                <md-button aria-label="Face" class="md-fab md-raised md-mini" ng-click="opciones.Categorias($event)">
                    <md-icon>face</md-icon>
                </md-button>
                <md-button aria-label="Label" class="md-fab md-raised md-mini" ng-click="opciones.Etiquetas($event)">
                    <md-icon>label</md-icon>
                </md-button>
                <md-button aria-label="Algo" class="md-fab md-raised md-mini" ng-click="opciones.Caracteristicas($event)">
                    <md-icon>lightbulb_outline</md-icon>
                </md-button>
            </md-fab-actions>
        </md-fab-speed-dial>
    </div>
</div>
