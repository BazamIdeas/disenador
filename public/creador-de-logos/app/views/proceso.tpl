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
        <span flex></span>
    </div>
    <div layout layout-align="center">
        <div layout="row" flex="60" class="scroll">
            <div class="contenedor-logo-proceso">
                <div ng-repeat="logo in proceso.logos" ng-mouseenter="proceso.efectoHover($index, logo)" ng-mouseleave="proceso.efectoHover($index, logo)" class="md-whiteframe-2dp margen_inferior svg-proceso contenedor_logos_proceso proceso-content">
                    <div class="svg">
                        <bazam-svg-text bazam-svg-text-pos data-icono="{{proceso.base64(logo.icono.svg)}}" data-fuente="{{logo.fuente.nombre}}" data-texto-x="{{proceso.posicion.coordenadas.x}}" data-texto-y="{{proceso.posicion.coordenadas.y}}" data-texto="{{proceso.datosEstadoAnterior.nombre}}"></bazam-svg-text>
                    </div>
                    <md-icon ui-sref="editor({logo:logo, posicion: proceso.posicion, texto: proceso.datosEstadoAnterior.nombre})" class="iconos-procesos siguiente" ng-show="logo.estado">create</md-icon>
                    <md-icon ui-sref="paquetes" class="iconos-procesos siguiente icono-p-p" ng-show="logo.estado">shopping_cart</md-icon>
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
