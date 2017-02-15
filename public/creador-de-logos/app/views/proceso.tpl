<div flex layout="column"  ng-cloak  layout-align="space-between">
    <div layout layout-align="space-between center" id="popupContainer">
        <h3 flex="30" class="titulo_opciones md-whiteframe-2dp" md-truncate>ELIJA SU LOGO</h3>
        <div flex layout layout-align="end">
            <md-fab-speed-dial md-open="false" md-direction="left" ng-class="proceso.modoSeleccionado" ng-click="proceso.estado=true">
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
    </div>

    <div layout="row" layout-align="center">
        <div flex="80" layout="row" layout-align="space-around center" layout-wrap layout-padding class="contenedor_fuentes text-center margen_derecho">
            <div flex="20" layout-padding ng-repeat="icono in proceso.respuesta.iconos" class="md-whiteframe-2dp">
                <div class="cambio">
                    <md-icon class="logo_icon" md-svg-src="{{icono.url}}"></md-icon>
                    <div class="text-center" layout-padding>Empresa</div>
                </div>
                <div flex layout layout-align="space-around" class="cont_iconos_logo_opciones margen_superior">
                    <md-icon ui-sref="editor">create</md-icon>
                    <md-icon ui-sref="paquetes">shopping_cart</md-icon>
                </div>
            </div>
        </div>
    </div>
    
    <div layout="row" class="margen_superior">
        <div layout="row" flex layout-align="start center">
            <md-button class="md-raised md-primary" ui-sref="opciones">Atras</md-button>
        </div>
    </div>
</div>

