<div flex layout="column">
    <div layout="row" layout-align="space-around" class="margen_superior">
        <div flex="45" class="contenedor_logos md-whiteframe-2dp">
            <h3 layout-padding class="text-center h_seccion_dashboard">Tus Logos</h3>
        </div>
        <div flex="45" class="contenedor_logos md-whiteframe-2dp">
            <h3 layout-padding class="text-center h_seccion_dashboard">Favoritos</h3>
        </div>
    </div>
    <div layout="row" layout-align="space-around" class="contenedor-de-logos margen_inferior">
        <div layout="row" flex="45" class="md-whiteframe-2dp scroll ">
            <div flex="100" layout="row" layout-align="space-around" layout-wrap layout-padding class="text-center">
                <div flex="30" ng-repeat="icono in cliente.respuesta.iconos" ng-mouseenter="cliente.efectoHover($index, icono, 'iconos')" ng-mouseleave="cliente.efectoHover($index, icono, 'iconos')" class="contenedor_logos_proceso proceso-content">
                    <div layput="column" layout-align="center">
                        <div class="cambio">
                            <md-icon class="logo_icon" md-svg-src="{{icono.url}}"></md-icon>
                            <div class="text-center" layout-padding>Empresa</div>
                        </div>
                        <md-icon ui-sref="editor" class="iconos-procesos siguiente" ng-show="cliente.datos.iconos[$index].estado">create</md-icon>
                        <md-icon ui-sref="descarga" class="iconos-procesos siguiente" ng-show="cliente.datos.iconos[$index].estado">file_download</md-icon>
                    </div>
                </div>
            </div>
        </div>
        <div layout="row" flex="45" class="md-whiteframe-2dp scroll ">
            <div flex="100" layout="row" layout-align="space-around" layout-wrap layout-padding class="text-center">
                <div flex="30" ng-repeat="icono in cliente.respuesta.iconos" ng-mouseenter="cliente.efectoHover($index, icono, 'iconos')" ng-mouseleave="cliente.efectoHover($index, icono, 'iconos')" class="contenedor_logos_proceso proceso-content">
                    <div layput="column" layout-align="center">
                        <div class="cambio">
                            <md-icon class="logo_icon" md-svg-src="{{icono.url}}"></md-icon>
                            <div class="text-center" layout-padding>Empresa</div>
                        </div>
                        <md-icon ui-sref="editor" class="iconos-procesos siguiente" ng-show="cliente.datos.iconos[$index].estado">create</md-icon>
                        <md-icon ui-sref="paquetes" class="iconos-procesos siguiente" ng-show="cliente.datos.iconos[$index].estado">shopping_cart</md-icon>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div layout="row" class="margen_superior" layout-align="space-between">
        <div flex layout="row" flex layout-align="start center">
            <md-button class="md-raised md-primary" ui-sref="editor">Atras</md-button>
        </div>
    </div>
</div>
