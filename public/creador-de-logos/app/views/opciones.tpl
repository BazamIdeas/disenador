<style ng-repeat="fuente in opciones.respuesta.fuentes">
    @font-face {
        font-family: {
            {
                fuente.nombre
            }
        }
        ;
        src: url('{{fuente.url}}');
    }

</style>
<div flex layout="column" ng-cloak>
    <div layout="row" layout-align="space-between center" id="popupContainer">
        <h3 flex="40" class="titulo_opciones md-whiteframe-2dp" md-truncate>ELIJA LOS DISEÑOS Y LAS FUENTES QUE DESEA USAR</h3>
        <div flex layout layout-align="end">
            <md-fab-speed-dial ng-hide="opciones.hidden" md-direction="left" md-open="opciones.isOpen" class="md-scale md-fab-top-right" ng-class="{ 'md-hover-full': opciones.hover }" ng-mouseenter="opciones.isOpen=true" ng-mouseleave="opciones.isOpen=false">
                <md-fab-trigger>
                    <md-button aria-label="menu" class="md-fab md-warn">
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
    <div layout="row" layout-align="space-around" class="margen_superior">
        <div layout="row" flex="45" class="md-whiteframe-2dp scroll ">
            <div flex="100" layout="row" layout-align="baseline space-around" layout-wrap layout-padding class="contenedor_logos text-center">
                <div flex="33" layout-padding ng-repeat="icono in opciones.respuesta.iconos" ng-click="opciones.agregarElemento($index, icono, 'iconos')">
                    <md-icon class="logo_icon icono" ng-class="opciones.datos.iconos[$index].estado" md-svg-src="{{icono.url}}"></md-icon>
                </div>
            </div>
        </div>
        <div layout="row" flex="45" class="md-whiteframe-2dp scroll ">
            <div flex="100" layout="row" layout-align="baseline space-around" layout-wrap layout-padding class="contenedor_fuentes text-center">
                <div flex="33" layout-padding ng-click="opciones.agregarElemento($index, fuente, 'fuentes')" ng-repeat="fuente in opciones.respuesta.fuentes">
                    <p class="fuente" ng-style="{'font-family' : fuente.nombre}" ng-class="opciones.datos.fuentes[$index].estado">{{opciones.datosEstadoAnterior.nombre}}</p>
                </div>
            </div>
        </div>
    </div>
    <div layout="row" class="margen_superior">
        <div layout="row" flex layout-align="space-between center">
            <md-button class="md-raised md-primary" ui-sref="comenzar">Atrás</md-button>
            <md-button class="md-raised md-primary siguiente" ng-show="opciones.seleccionado(opciones.datos.fuentes, opciones.datos.iconos)" ui-sref="proceso({datos: {nombre: opciones.datosEstadoAnterior.nombre  , elementos: opciones.datos}})">Siguiente</md-button>
        </div>
    </div>
</div>
