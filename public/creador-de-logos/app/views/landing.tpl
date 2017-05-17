<div layout="column" flex>
    <div flex layout layout-align="center">
        <div layout flex="90" layout-align="space-around" class="seccion-landing layout-padding margen_inferior">
            <div flex>Contenido Seccion 1</div>
            <div flex="30">Contenido Seccion 2</div>
        </div>
    </div>
    <div flex layout layout-align="center">
        <div layout flex="90" layout-align="space-around" class="seccion-landing layout-padding" ng-switch="landing.pasos">
            <div flex ng-switch-default>Contenido Seccion 1</div>
            <div flex ng-switch-when="2">Contenido Seccion 2</div>
            <div flex ng-switch-when="3">Contenido Seccion 3</div>
        </div>
    </div>
    <div flex layout layout-align="center">
        <div layout flex="90" layout-align="space-around" class="seccion-landing layout-padding">
            <img src="http://lorempixel.com/g/320/240/nightlife">
            <img src="http://lorempixel.com/g/320/240/nightlife">
            <img src="http://lorempixel.com/g/320/240/nightlife">
        </div>
    </div>
</div>
