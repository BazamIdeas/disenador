<style ng-repeat="fuente in editor.fuentes">
    @font-face {
        font-family: '{{fuente.nombre}}';
        src: url('{{fuente.url}}');
    }

</style>

<div flex layout="column" ng-cloak>
    <div layout>
        <div class="titulo administrar-t">DESCARGA TU LOGO</div>
    </div>
    <div layout layout-align="center">
        <div flex="80" layout class="administrar-logo md-whiteframe-2dp layout-padding" layout-align="space-around">
            <div flex="40">
                
                <div class="h_seccion_dashboard md-whiteframe-2dp text-center" layout-padding>DATOS GENERALES</div>
                <div class="logo-datos md-whiteframe-2dp">
                    <bazam-visualizar data-svg="administrar.base64(administrar.info.logo)">
                    </bazam-visualizar>
                </div>

                <div class="datos-generales md-whiteframe-2dp">
                    <div class="colores">
                        <div layout-padding>
                            <div class="color">
                                <b layout-padding>Color 1</b>
                                <div class="barra">.</div>
                                <div class="parte-gris">#435435</div>
                            </div>
                            <div layout layout-align="space-between" class="fuente-adm">
                                <b layout-padding>Fuente</b>
                                <b flex class="parte-gris">Roboto</b>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div flex="50" class="scroll ">
                <div class="h_seccion_dashboard md-whiteframe-2dp text-center" layout-padding>MEDIDAS</div>
                <div flex layout="row" layout-align="space-around" layout-wrap class="md-whiteframe-2dp text-center layout-padding" style="    min-height: 65%;" >
                    <div flex="30" ng-repeat="elemento in administrar.medidas" class="logo-descargar" ng-mouseenter="administrar.efectoHover($index, elemento)" ng-mouseleave="administrar.efectoHover($index, elemento)">

                        <bazam-visualizar data-svg="administrar.base64(administrar.info.logo)">
                        </bazam-visualizar>

                        <md-button class="iconos-administrar" ng-click="administrar.descargarL($index,administrar.info.id, elemento.ancho)">{{elemento.ancho}}PX</md-button>
                        <div id="logoD{{$index}}" class="desca" ng-show="elemento.estado"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
