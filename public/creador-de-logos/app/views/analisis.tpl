<div layout="column" flex class="loader-cont" layout-align="center center">
    <div layout layout-align="center" class="loader-textos" ng-switch="analisis.animacionTexto">
        <h2 ng-switch-when="1" class="md-whiteframe-2dp layout-padding texto-animacion-entrada pasos">Analizando sus preferencias</h2>
        <h2 ng-switch-when="2" class="md-whiteframe-2dp layout-padding texto-animacion-entrada pasos">Evaluando las posibilidades</h2>
        <h2 ng-switch-when="3" class="md-whiteframe-2dp layout-padding texto-animacion-entrada pasos">Codificando los logos</h2>
    </div>
    <div layout layout-align="center" class="margen_superior">
        <div id="preloader6">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
    
    <div layout layout-align="center" class="margen_superior">
        <a ng-click="analisis.animacionTexto= 1">Primer</a>
        <a ng-click="analisis.animacionTexto= 2">Segundo</a>
        <a ng-click="analisis.animacionTexto= 3">Tercero</a>
    </div>
</div>
