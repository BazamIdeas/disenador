<div flex layout="column" class="scroll" ng-cloak>
    <div layout layout-align="center space-between" id="popupContainer">
        <h3 flex="70" class="titulo_opciones" md-truncate>ELIJA SU LOGO</h3>
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
            <div class="md-whiteframe-2dp" layout-padding>
                <div class="cambio">
                    <div><img src="http://lorempixel.com/190/190/"></div>
                    <div class="text-center" layout-padding>Empresa</div>
                </div>
                <div flex layout layout-align="space-around" class="cont_iconos_logo_opciones">
                    <md-icon ui-sref="editor">create</md-icon>
                    <md-icon ui-sref="paquetes">shopping_cart</md-icon>
                </div>
            </div>
            <div class="md-whiteframe-2dp margen_izquierdo margen_derecho" layout-padding>
                <div class="cambio">
                    <div><img src="http://lorempixel.com/190/190/"></div>
                    <div class="text-center" layout-padding>Empresa</div>
                </div>
                <div flex layout layout-align="space-around" class="cont_iconos_logo_opciones">
                    <md-icon ui-sref="editor">create</md-icon>
                    <md-icon ui-sref="paquetes">shopping_cart</md-icon>
                </div>
            </div>
            <div class="md-whiteframe-2dp" layout-padding>
                <div class="cambio">
                    <div><img src="http://lorempixel.com/190/190/"></div>
                    <div class="text-center" layout-padding>Empresa</div>
                </div>
                <div flex layout layout-align="space-around" class="cont_iconos_logo_opciones">
                    <md-icon ui-sref="editor">create</md-icon>
                    <md-icon ui-sref="paquetes">shopping_cart</md-icon>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
