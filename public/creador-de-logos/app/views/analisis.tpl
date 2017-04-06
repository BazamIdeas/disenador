<div layout="column" flex layout-align="center center">
    <div layout layout-align="center" class="loader-textos" ng-switch="analisis.animacionTexto">
        
        <h2 ng-switch-when="1" class=" texto-animacion-entrada pasos">Verificando los datos</h2>
        <h2 ng-switch-when="2" class=" texto-animacion-entrada pasos">Analizando sus preferencias</h2>
        <h2 ng-switch-when="3" class=" texto-animacion-entrada pasos">Evaluando las posibilidades</h2>
        <h2 ng-switch-when="4" class=" texto-animacion-entrada pasos">Construyendo las mejores opciones</h2>
    </div>
    <div layout layout-align="center" class="margen_superior">
        <div id="preloader6">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
</div>
