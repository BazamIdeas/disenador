<style ng-repeat="fuente in opciones.datosEstadoAnterior.respuesta.fuentes">
    @font-face {
        font-family: '{{fuente.nombre}}';
        src: url('{{fuente.url}}');
    }

</style>
<div layout="column" ng-cloak layout-align="space-between">
    <div layout layout-align="space-between" id="popupContainer" class="margen_inferior">
        <div flex="40">
            <h3 class="titulo_opciones md-whiteframe-2dp" md-truncate>ELIJA LOS DISEÑOS Y LAS FUENTES QUE DESEA USAR</h3>
        </div>
        <div flex layout layout-align="end center ">
            <div ng-repeat="configuracion in opciones.configuraciones" ng-click="opciones.mostrarDialogos($event, configuracion.nombre, $index)" id-dialogo="configuracion.id" class="categorias md-whiteframe-2dp">
                {{configuracion.nombre}}
            </div>
        </div>
    </div>
    <div layout layout-align="space-around" class="contenedor-de-logos">
        <div layout-lg="row" flex="45" class="md-whiteframe-2dp scroll ">
            <div flex layout="row" layout-align="baseline space-around" layout-wrap layout-padding class="contenedor_logos text-center">
                <div flex="33" layout-padding ng-repeat="icono in opciones.datosEstadoAnterior.respuesta.iconos" ng-click="opciones.agregarElemento($index, icono, 'iconos')">
                    <md-icon class="logo_icon icono" ng-class="opciones.datos.iconos[$index].estado" md-svg-src="data:image/svg+xml;base64,{{icono.svg}}"></md-icon>
                </div>
            </div>
        </div>
        <div layout="row" flex="45" class="md-whiteframe-2dp scroll ">
            <div flex layout="row" layout-align="baseline space-around" layout-wrap layout-padding class="contenedor_fuentes text-center">
                <div flex="33" layout-padding ng-click="opciones.agregarElemento($index, fuente, 'fuentes')" ng-repeat="fuente in opciones.datosEstadoAnterior.respuesta.fuentes">
                    <p class="fuente" ng-style="{'font-family' : fuente.nombre}" ng-class="opciones.datos.fuentes[$index].estado">{{opciones.datosEstadoAnterior.nombre}}</p>
                </div>
            </div>
        </div>
    </div>
    <div layout="row" layout-align="space-between">
        <md-button class="md-raised md-primary" ui-sref="comenzar">Atrás</md-button>
        <md-button class="md-raised md-primary siguiente" ng-show="opciones.seleccionado(opciones.datos.fuentes, opciones.datos.iconos)" ui-sref="proceso({datos: {nombre: opciones.datosEstadoAnterior.nombre  , elementos: opciones.datos}})">Siguiente</md-button>
    </div>
</div>
