<style ng-repeat="fuente in opciones.respuesta.fuentes">
    @font-face {
        font-family: {{fuente.nombre}};
        src: url('{{fuente.url}}');
    }

</style>
<div layout="column" ng-cloak layout-align="space-between">
    <div layout layout-align="space-between" id="popupContainer" class="margen_inferior">
        <div flex="40" >
        <h3 class="titulo_opciones md-whiteframe-2dp" md-truncate>ELIJA LOS DISEÑOS Y LAS FUENTES QUE DESEA USAR</h3>
        </div>
        <div flex="60">
            <md-fab-speed-dial ng-hide="opciones.hidden" md-direction="left" md-open="opciones.isOpen" class="md-scale md-fab-top-right" ng-class="{ 'md-hover-full': opciones.hover }" ng-mouseenter="opciones.isOpen=true" ng-mouseleave="opciones.isOpen=false">
                <md-fab-trigger>
                    <md-button aria-label="menu" class="md-fab md-primary">
                        <md-tooltip md-direction="top" md-visible="tooltipVisible">Menu</md-tooltip>
                        <md-icon>build</md-icon>
                    </md-button>
                </md-fab-trigger>

                <md-fab-actions>
                    <div ng-repeat="elementoDialog in opciones.elementosDialog">
                        <md-button aria-label="{{elementoDialog.name}}" class="md-fab md-raised md-mini" ng-click="opciones.abrirDialogo($event, elementoDialog)">
                            <md-tooltip md-direction="{{elementoDialog.direction}}" md-visible="tooltipVisible" md-autohide="false">
                                {{elementoDialog.name}}
                            </md-tooltip>

                            <md-icon aria-label="{{elementoDialog.name}}">{{elementoDialog.icon}}</md-icon>
                        </md-button>
                    </div>
                </md-fab-actions>
            </md-fab-speed-dial>
        </div>
    </div>
    <div layout layout-align="space-around" class="margen_inferior contenedor-de-logos">
        <div layout-lg="row" flex="45" class="md-whiteframe-2dp scroll ">
            <div flex layout="row" layout-align="baseline space-around" layout-wrap layout-padding class="contenedor_logos text-center">
                <div flex="33" layout-padding ng-repeat="icono in opciones.respuesta.iconos" ng-click="opciones.agregarElemento($index, icono, 'iconos')">
                    <md-icon class="logo_icon icono" ng-class="opciones.datos.iconos[$index].estado"  md-svg-src="data:image/svg+xml,  {{icono.elemento}}"></md-icon>
                </div>
            </div>
        </div>
        <div layout="row" flex="45" class="md-whiteframe-2dp scroll ">
            <div flex layout="row" layout-align="baseline space-around" layout-wrap layout-padding class="contenedor_fuentes text-center">
                <div flex="33" layout-padding ng-click="opciones.agregarElemento($index, fuente, 'fuentes')" ng-repeat="fuente in opciones.respuesta.fuentes">
                    <p class="fuente" ng-style="{'font-family' : fuente.nombre}" ng-class="opciones.datos.fuentes[$index].estado">{{opciones.datosEstadoAnterior.nombre}}</p>
                </div>
            </div>
        </div>
    </div>
    <div layout="row">
        <div layout="row" flex layout-align="space-between center">
            <md-button class="md-raised md-primary" ui-sref="comenzar">Atrás</md-button>
            <md-button class="md-raised md-primary siguiente" ng-show="opciones.seleccionado(opciones.datos.fuentes, opciones.datos.iconos)" ui-sref="proceso({datos: {nombre: opciones.datosEstadoAnterior.nombre  , elementos: opciones.datos}})">Siguiente</md-button>
        </div>
    </div>
</div>

