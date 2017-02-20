<style ng-repeat="fuente in proceso.datosEstadoAnterior.elementos.fuentes">
    @font-face {
        font-family: {{fuente.nombre}};
        src: url('{{fuente.url}}');
    }

</style>

<div flex layout="column" ng-cloak layout-align="space-between">
<div layout="row" layout-align="center" id="popupContainer" class="margen_superior">
    <div flex="20">
    <h3 class="titulo_opciones titulo_opciones-p  md-whiteframe-2dp" md-truncate>ELIJE TU LOGO</h3>
    </div>
    <div flex="80">
    <md-fab-toolbar  md-open="estadoProcesoBarra.isOpen" count="estadoProcesoBarra.count" md-direction="left">
        <md-fab-trigger class="align-with-text">
            <md-button aria-label="menu" class="md-fab md-primary">
                <md-icon>build</md-icon>
            </md-button>
        </md-fab-trigger>

        <md-toolbar>
            <md-fab-actions class="md-toolbar-tools">
                <md-button aria-label="comment" class="md-icon-button">
                    <md-icon>book</md-icon>
                </md-button>
                <md-button aria-label="label" class="md-icon-button">
                    <md-icon>label</md-icon>
                </md-button>
                <md-button aria-label="photo" class="md-icon-button">
                    <md-icon>photo</md-icon>
                </md-button>
            </md-fab-actions>
        </md-toolbar>
    </md-fab-toolbar>
    </div>
</div>
    <div layout layout-align="center" class="margen_superior">
        <div layout="row" flex="70" class="scroll">
            <div flex layout="row" layout-align="space-around" layout-wrap layout-padding class="text-center">
                <div flex="30" ng-repeat="logo in proceso.logos" ng-mouseenter="proceso.efectoHover($index, logo)" ng-mouseleave="proceso.efectoHover($index, logo)" class="md-whiteframe-2dp margen_inferior contenedor_logos_proceso proceso-content">
                    <div layput="column" layout-padding layout-align="space-around center">

                        <div class="cambio">
                            <md-icon class="logo_icon" md-svg-src="{{logo.icono.url}}"></md-icon>
                            <div class="text-center" ng-style="{'font-family' : logo.fuente.nombre}" layout-padding>{{proceso.datosEstadoAnterior.nombre}}</div>
                        </div>

                        <md-icon ui-sref="editor" class="iconos-procesos siguiente" ng-show="logo.estado">create</md-icon>
                        <md-icon ui-sref="paquetes" class="iconos-procesos siguiente" ng-show="logo.estado">shopping_cart</md-icon>

                    </div>
                </div>
            </div>
        </div>
    </div>


    <div layout="row" class="margen_superior">
        <div layout="row" flex layout-align="start center">
            <md-button class="md-raised md-primary" ui-sref="proceso">Atras</md-button>
        </div>
    </div>
</div>
