<div flex layout="column" ng-cloak>
    <div layout="row" layout-align="center space-between" id="popupContainer" class="margen_inferior">
        <h3 flex="70" class="titulo_opciones" md-truncate>ELIJA LOS DISEÑOS Y LAS FUENTES QUE DESEA USAR</h3>
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
    <div layout="row" layout-align="space-between">
        <div class="scroll" flex="45" class="contenedor_logos md-whiteframe-2dp">
            <div layout="row" layout-padding layout-align="space-around center ">
                <div class="md-whiteframe-2dp" layout-padding>
                    <div><img src="http://lorempixel.com/120/120/"></div>
                </div>
                <div class="md-whiteframe-2dp" layout-padding>
                    <div><img src="http://lorempixel.com/120/120/"></div>
                </div>
                <div class="md-whiteframe-2dp" layout-padding>
                    <div><img src="http://lorempixel.com/120/120/"></div>
                </div>
            </div>
            <div layout="row" layout-padding layout-align="space-around center ">
                <div class="md-whiteframe-2dp" layout-padding>
                    <div><img src="http://lorempixel.com/120/120/"></div>
                </div>
                <div class="md-whiteframe-2dp" layout-padding>
                    <div><img src="http://lorempixel.com/120/120/"></div>
                </div>
                <div class="md-whiteframe-2dp" layout-padding>
                    <div><img src="http://lorempixel.com/120/120/"></div>
                </div>
            </div>
            <div layout="row" layout-padding layout-align="space-around center ">
                <div class="md-whiteframe-2dp" layout-padding>
                    <div><img src="http://lorempixel.com/120/120/"></div>
                </div>
                <div class="md-whiteframe-2dp" layout-padding>
                    <div><img src="http://lorempixel.com/120/120/"></div>
                </div>
                <div class="md-whiteframe-2dp" layout-padding>
                    <div><img src="http://lorempixel.com/120/120/"></div>
                </div>
            </div>
            <div layout="row" layout-padding layout-align="space-around center">
                <div class="md-whiteframe-2dp" layout-padding>
                    <div><img src="http://lorempixel.com/120/120/"></div>
                </div>
                <div class="md-whiteframe-2dp" layout-padding>
                    <div><img src="http://lorempixel.com/120/120/"></div>
                </div>
                <div class="md-whiteframe-2dp" layout-padding>
                    <div><img src="http://lorempixel.com/120/120/"></div>
                </div>
            </div>
        </div>
        <div layout="row" flex="45" class="md-whiteframe-2dp margen_izquierdo scroll ">
            <div flex="100" layout="row" layout-align="baseline space-around" layout-wrap layout-padding class="contenedor_fuentes text-center">
                <div flex="33" layout-padding ng-click="opciones.activo=seleccionado">
                    <p class="Arial" ng-class="opciones.activo">Empresa</p>
                </div>
                <div flex="33" layout-padding>
                    <p class="Helvetica">Empresa</p>
                </div>
                <div flex="33" layout-padding>
                    <p class="Verdana">Empresa</p>
                </div>
                <div flex="33" layout-padding>
                    <p class="Trebuchet">Empresa</p>
                </div>
                <div flex="33" layout-padding>
                    <p class="GillSans">Empresa</p>
                </div>
                <div flex="33" layout-padding>
                    <p class="DejaVu_Sans">Empresa</p>
                </div>
                <div flex="33" layout-padding>
                    <p class="Geneva">Empresa</p>
                </div>
                <div flex="33" layout-padding>
                    <p class="HelveticaNeue-Roman">Empresa</p>
                </div>
                <div flex="33" layout-padding>
                    <p class="Cambria">Empresa</p>
                </div>
                <div flex="33" layout-padding>
                    <p class="Palatino">Empresa</p>
                </div>
                <div flex="33" layout-padding>
                    <p class="Cambria">Empresa</p>
                </div>
                <div flex="33" layout-padding>
                    <p class="Palatino">Empresa</p>
                </div>
            </div>
        </div>
    </div>
    <div layout="row" class="margen_superior">
        <div layout="row" flex layout-align="end center">
            <md-button class="md-raised md-primary" ui-sref="proceso">Siguiente</md-button>
        </div>
    </div>
</div>
