<div flex layout="column" class="scroll">
    <div layout layout-align="center space-between" id="popupContainer">
        <h3 flex="70" class="titulo_opciones" md-truncate>ELIJA LOS DISEÑOS Y LAS FUENTES QUE DESEA USAR</h3>
        <md-fab-speed-dial flex="20" md-open="false" md-direction="left" ng-class="proceso.modoSeleccionado" ng-click="proceso.estado=true">
            <md-fab-trigger>
                <md-button aria-label="menu" class="md-fab md-warn">
                    <md-icon>build</md-icon>
                </md-button>
            </md-fab-trigger>
            <md-fab-actions>
                <md-button aria-label="Face" class="md-fab md-raised md-mini">
                    <md-icon>format_align_center</md-icon>
                </md-button>
                <md-button aria-label="Label" class="md-fab md-raised md-mini">
                    <md-icon>format_align_left</md-icon>
                </md-button>
                <md-button aria-label="Algo" class="md-fab md-raised md-mini">
                    <md-icon>format_align_right</md-icon>
                </md-button>
            </md-fab-actions>
        </md-fab-speed-dial>
    </div>

    <div flex layout="column">
        <div flex layout layout-align="center center">
            <md-content class="md-whiteframe-2dp" layout-padding>
                <div class="cambio">
                    <div><img src="http://lorempixel.com/190/190/"></div>
                    <div class="text-center" layout-padding>Empresa</div>
                </div>
                <div flex layout layout-align="space-around" class="cont_iconos_logo_opciones">
                    <md-icon>create</md-icon>
                    <md-icon>shopping_cart</md-icon>
                </div>
            </md-content>

            <md-content class="md-whiteframe-2dp" layout-padding>
                <div class="cambio">
                    <div><img src="http://lorempixel.com/190/190/"></div>
                    <div class="text-center" layout-padding>Empresa</div>
                </div>
                <div flex layout layout-align="space-around" class="cont_iconos_logo_opciones">
                    <md-icon>create</md-icon>
                    <md-icon>shopping_cart</md-icon>
                </div>
            </md-content>

            <md-content class="md-whiteframe-2dp" layout-padding>
                <div class="cambio">
                    <div><img src="http://lorempixel.com/190/190/"></div>
                    <div class="text-center" layout-padding>Empresa</div>
                </div>
                <div flex layout layout-align="space-around" class="cont_iconos_logo_opciones">
                    <md-icon>create</md-icon>
                    <md-icon>shopping_cart</md-icon>
                </div>
            </md-content>


        </div>
    </div>
</div>
</div>
