<div flex layout="column" ng-cloak>
    <div layout="row" layout-align="space-between center" id="popupContainer">
        <h3 flex="40" class="titulo_opciones md-whiteframe-2dp" md-truncate>ELIJA LOS DISEÑOS Y LAS FUENTES QUE DESEA USAR</h3>
        <div flex layout layout-align="end">
            <md-fab-speed-dial md-open="false" md-direction="left" ng-class="opciones.modoSeleccionado" ng-click="opciones.estado=true">
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
    <div layout="row" layout-align="space-around" class="margen_superior">
        
        <div layout="row" flex="45" class="md-whiteframe-2dp scroll ">
            <div flex="100" layout="row" layout-align="baseline space-around" layout-wrap layout-padding class="contenedor_logos text-center">

                <div flex="33" layout-padding ng-repeat="icono in opciones.respuesta.iconos" ng-click="opciones.agregarIcono($index, icono, 'iconos')">
                    <md-icon class="logo_icon"  ng-class="opciones.datos.iconos[$index].estado" md-svg-src="{{icono.url}}"></md-icon>
                </div>

            </div>
        </div>

        <div layout="row" flex="45" class="md-whiteframe-2dp scroll ">
            <div flex="100" layout="row" layout-align="baseline space-around" layout-wrap layout-padding class="contenedor_fuentes text-center">


                <div flex="33" layout-padding ng-click="opciones.agregarFuente($index, fuente, 'fuentes')" ng-repeat="fuente in opciones.respuesta.fuentes">
                    <p ng-class="opciones.datos.fuentes[$index].estado">{{opciones.datosComenzar.nombre}}</p>
                </div>


            </div>
        </div>
    </div>
    <div layout="row" class="margen_superior">
        <div layout="row" flex layout-align="space-between center">
            <md-button class="md-raised md-primary" ui-sref="comenzar({datos: opciones.datosComenzar})">Atrás</md-button>
            <md-button class="md-raised md-primary siguiente" ng-show="opciones.seleccionado(opciones.datos.fuentes)" ui-sref="proceso({datos: opciones.datos})">Siguiente</md-button>
        </div>
    </div>
</div>
