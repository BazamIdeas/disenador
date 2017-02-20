<style ng-repeat="fuente in proceso.datosEstadoAnterior.elementos.fuentes">
    @font-face {
        font-family: {{fuente.nombre}};
        src: url('{{fuente.url}}');
    }

</style>

<div flex layout="column" ng-cloak layout-align="space-between">
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
        <div flex="70" layout="row" layout-align="baseline space-around" layout-wrap class="text-center">
            

                <div flex="30" ng-repeat="logo in proceso.logos" ng-mouseenter="proceso.efectoHover($index, logo)" ng-mouseleave="proceso.efectoHover($index, logo)" class="md-whiteframe-2dp margen_derecho margen_inferior contenedor_logos_proceso proceso-content">
                    <div layput="column" layout-padding layout-align="space-around center">

                        <div class="cambio">
                            <md-icon class="logo_icon" md-svg-src="{{logo.icono.url}}" bazam-svg-text></md-icon>
                            <div class="text-center" ng-style="{'font-family' : logo.fuente.nombre}" layout-padding>{{proceso.datosEstadoAnterior.nombre}}</div>
                        </div>

                        <md-icon ui-sref="editor" class="iconos-procesos siguiente" ng-show="logo.estado">create</md-icon>
                        <md-icon ui-sref="paquetes" class="iconos-procesos siguiente" ng-show="logo.estado">shopping_cart</md-icon>

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
