<div flex layout="column">
    <div layout="row" layout-align="center space-between" id="popupContainer" class="margen_inferior">
        <h3 flex="70" class="titulo_opciones" md-truncate>ELIJA LOS DISEÑOS Y LAS FUENTES QUE DESEA USAR</h3>
        <md-fab-speed-dial flex="20" md-open="false" md-direction="left" ng-class="proceso.modoSeleccionado" ng-click="proceso.estado=true">
            <md-fab-trigger>
                <md-button aria-label="menu" class="md-fab md-warn">
                    <md-icon>build</md-icon>
                </md-button>
            </md-fab-trigger>
            <md-fab-actions>
                <md-button aria-label="Face" class="md-fab md-raised md-mini" ng-click="opciones.Categorias($event)">
                    <md-icon>format_align_center</md-icon>
                </md-button>
                <md-button aria-label="Label" class="md-fab md-raised md-mini" ng-click="opciones.Etiquetas($event)">
                    <md-icon>format_align_left</md-icon>
                </md-button>
                <md-button aria-label="Algo" class="md-fab md-raised md-mini" ng-click="opciones.Caracteristicas($event)">
                    <md-icon>format_align_right</md-icon>
                </md-button>
            </md-fab-actions>
        </md-fab-speed-dial>
    </div>
    <div layout="row" layout-align="space-between center" flex-wrap>
        <div class="scroll" flex="90" class="contenedor_logos md-whiteframe-2dp">
            <div layout="row" layout-padding layout-align="space-around center ">
                <md-content class="md-whiteframe-2dp" layout-padding>
                    <div><img src="http://lorempixel.com/120/120/"></div>
                    <div flex layout layout-align="space-around" class="cont_iconos_logo_opciones">
                        <md-icon>create</md-icon>
                        <md-icon>shopping_cart</md-icon>
                    </div>
                </md-content>
                <md-content class="md-whiteframe-2dp" layout-padding>
                    <div><img src="http://lorempixel.com/120/120/"></div>
                    <div flex layout layout-align="space-around" class="cont_iconos_logo_opciones">
                        <md-icon>create</md-icon>
                        <md-icon>shopping_cart</md-icon>
                    </div>
                </md-content>
                <md-content class="md-whiteframe-2dp" layout-padding>
                    <div><img src="http://lorempixel.com/120/120/"></div>
                    <div flex layout layout-align="space-around" class="cont_iconos_logo_opciones">
                        <md-icon>create</md-icon>
                        <md-icon>shopping_cart</md-icon>
                    </div>
                </md-content>
                
                <md-content class="md-whiteframe-2dp" layout-padding>
                    <div><img src="http://lorempixel.com/120/120/"></div>
                    <div flex layout layout-align="space-around" class="cont_iconos_logo_opciones">
                        <md-icon>create</md-icon>
                        <md-icon>shopping_cart</md-icon>
                    </div>
                </md-content>
                <md-content class="md-whiteframe-2dp" layout-padding>
                    <div><img src="http://lorempixel.com/120/120/"></div>
                    <div flex layout layout-align="space-around" class="cont_iconos_logo_opciones">
                        <md-icon>create</md-icon>
                        <md-icon>shopping_cart</md-icon>
                    </div>
                </md-content>
                <md-content class="md-whiteframe-2dp" layout-padding>
                    <div><img src="http://lorempixel.com/120/120/"></div>
                    <div flex layout layout-align="space-around" class="cont_iconos_logo_opciones">
                        <md-icon>create</md-icon>
                        <md-icon>shopping_cart</md-icon>
                    </div>
                </md-content>
            </div>
        </div>
    </div>
</div>
