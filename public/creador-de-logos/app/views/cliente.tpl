<div flex layout="column">
    <div layout="row" layout-align="space-around" class="margen_superior">
        <div flex="45" class="contenedor_logos md-whiteframe-2dp">
            <h3 layout-padding class="text-center h_seccion_dashboard">MIS LOGOS</h3>
        </div>
        <div flex="45" class="contenedor_logos md-whiteframe-2dp">
            <h3 layout-padding class="text-center h_seccion_dashboard">GUARDADOS</h3>
        </div>
    </div>
    <div layout="row" layout-align="space-around" class="contenedor-de-logos margen_inferior">


        <div layout="row" flex="45" class="md-whiteframe-2dp scroll ">
            <div flex layout="row" layout-align="space-around" layout-wrap layout-padding class="text-center">
                <div flex="30" ng-repeat="elemento in cliente.lComprados" class="svg-proceso contenedor_logos_proceso proceso-content" ng-mouseenter="cliente.efectoHoverC($index, elemento)" ng-mouseleave="cliente.efectoHoverC($index, elemento)">
                    <div>
                        <bazam-visualizar class="logo_icon" data-svg="cliente.base64(elemento.logo)">
                        </bazam-visualizar>
                    </div>
                    <md-icon class="iconos-cliente" ng-show="elemento.mostrar" 
                    ui-sref="administrar({datos:{id:elemento.idLogo,logo: elemento.logo}})">vertical_align_bottom</md-icon>
                    
                </div>
                <div layout="column" layout-align="center center" ng-hide="cliente.lComprados">
                    <div ng-hide="cliente.notifyC">
                        <div>
                            <md-progress-circular md-mode="indeterminate" md-diameter="70"></md-progress-circular>
                        </div>
                        <p class="titulo">Cargando</p>
                    </div>
                    <div ng-show="cliente.notifyC">
                        <p class="titulo">No has comprado ningun logo </p>
                    </div>
                </div>
            </div>
        </div>

        <div layout="row" flex="45" class="md-whiteframe-2dp scroll ">
            <div flex layout="row" layout-align="space-around" layout-wrap layout-padding class="text-center">
                <div flex="30" ng-repeat="logo in cliente.lGuardados" class="svg-proceso contenedor_logos_proceso proceso-content" ng-mouseenter="cliente.efectoHoverG($index, logo)" ng-mouseleave="cliente.efectoHoverG($index, logo)">
                    <div>
                        <bazam-visualizar class="logo_icon" data-svg="cliente.base64(logo.logo)">
                        </bazam-visualizar>
                    </div>
                    <md-icon class="iconos-cliente" ng-show="logo.mostrar" ui-sref="editor({logo:logo.logo})">create</md-icon>
                </div>

                <div layout="column" layout-align="center center" ng-hide="cliente.lGuardados">
                    <div ng-hide="cliente.notifyG">
                        <div>
                            <md-progress-circular md-mode="indeterminate" md-diameter="70"></md-progress-circular>
                        </div>
                        <p class="titulo">Cargando</p>
                    </div>
                    <div ng-show="cliente.notifyG">
                        <p class="titulo">No has guardado ningun logo </p>
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
